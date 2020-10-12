
import React from 'react'
import axios from 'axios'
import { useIsAuthenticated, useSignIn } from 'react-auth-kit'
import { Redirect, useHistory } from 'react-router-dom'
import MuiPhoneNumber from 'material-ui-phone-number';
import  LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Avatar, Button,CssBaseline,TextField,Typography,makeStyles,Container,} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
const Login = () => {
    
    const isAuthenticated = useIsAuthenticated()
    const signIn = useSignIn()
    const history = useHistory()
    const classes = useStyles();
    

    const [formData, setFormData] = React.useState({username: '', password: ''})

    
    const loginHandler = (e) => {
        e.preventDefault()
        formData.username = formData.username.replace(/[^0-9]/g, '');
        // Assuming that, all network Request is successfull, and the user is authenticated
        axios.post('https://elepsio.herokuapp.com/admin/login', formData)
        
        .then((res)=>{
            if(res.status === 200)
           {
            
        if (signIn({
           
            token: res.data.token, //Just a random token
            tokenType: 'Bearer',    // Token type set as Bearer
            authState:{ name: formData.username },
            expiresIn: 120  // Token Expriration time, in minutes
        })) {
        
        
            // If Login Successfull, then Redirect the user to secure route
            history.push('/dashboard')
        }
        } else 
            {
            // Else, there must be some error. So, throw an error
            alert("res.data") ;
             }
            
                 
            
            }   
           
            ).catch(error => {
                alert('Неверные данные \n' + error);               
            });
   
    }
        
    if (isAuthenticated()) {
        // If authenticated user, then redirect to  dashboard
        return (
            <Redirect to={'/dashboard'} />
        )
    } else {
        return (

                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>

                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                    Войти в систему
                    </Typography>

                    <form className={classes.form} onSubmit={loginHandler}>
                <MuiPhoneNumber
                    defaultCountry={'ua'}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Имя"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange ={(e)=>setFormData({...formData, username: e})}
                />
                   

                    <TextField
                        onChange = {(e)=>setFormData({...formData, password: e.target.value})}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"

                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Войти
                    </Button>

                    </form>
                </div>

                </Container>
        )
    }
    
}

export default Login
