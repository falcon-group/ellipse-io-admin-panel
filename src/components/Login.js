import React from 'react'
import axios from 'axios'
import { useIsAuthenticated, useSignIn } from 'react-auth-kit'
import { Redirect, useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MuiPhoneNumber from 'material-ui-phone-number';
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
    /**
     * Login Handle, the callback function onClick from the "Login" button
     * 
     * This function demostrate a dummy authentication, using useSignIn function
     */

    const [formData, setFormData] = React.useState({username: '', password: ''})

    // const [formUserName, setUserName] = React.useState({username: ''})
    // const [formPassword, setPassword] = React.useState({ password: ''})
    
    const loginHandler = (e) => {
        e.preventDefault()
        // Assuming that, all network Request is successfull, and the user is authenticated
        axios.post('https://elepsio.herokuapp.com/auth/login', formData)
        
        .then((res)=>{
            if(res.status === 200)
           {
            
        if (signIn({
            token: res.data.token, //Just a random token
            tokenType: 'Bearer',    // Token type set as Bearer
            authState:{ name: 'Admin' },
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
        // If authenticated user, then redirect to secure dashboard
        return (
            <Redirect to={'/dashboard'} />
        )
    } else {
        // If not authenticated, use the login flow
        // For Demostration, I'm using just a button to login.
        // In reality, there should be a form, validation, nwetowrk request and other things
        return (
            // <form onSubmit={loginHandler}>

            //     <input type={"text"} onChange={(e)=>setFormData({...formData, username: e.target.value})}/>
            //     <input type={"password"} onChange={(e)=>setFormData({...formData, password: e.target.value})}/>
    
            //     <button>Submit</button>
            // </form>


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
