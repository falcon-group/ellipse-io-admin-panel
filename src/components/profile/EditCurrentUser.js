import React, { useState, useEffect } from "react";
import clsx from "clsx";
import axios from "axios";
import { useHistory } from "react-router-dom";
import MuiPhoneNumber from "material-ui-phone-number";
//Auth Kit
import { useAuthUser, useSignOut } from "react-auth-kit";
//Core MaterialUi
import {
  makeStyles,
  CssBaseline,
  Switch,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Grid,
  Paper,
  Link,
  TextField,
  Button,
} from "@material-ui/core";
//Icons
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
//Colors
import {
  orange,
  deepPurple,
  deepOrange,
  lightBlue,
} from "@material-ui/core/colors";
//Components
import { mainListItems } from "../interface/NavList";
import Cookies from "js-cookie";

// For Switch Theming
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/falcon-group">
        falcon-group
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  // fixedHeight: {
  //   height: 240
  // }
}));

const EditCurentUser = props => {
  const history = useHistory();
  const [open, setOpen] = useState(true);
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const signOut = useSignOut();
  const authUser = useAuthUser();
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[800];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });
  const classes = useStyles();
  const [formData, setFormData] = React.useState({
    customId: "",
    phone: "",
    password: "qwerty221",
  });

  const [users, setUsers] = React.useState([]);
  const authToken = Cookies.get("_auth_t");
  axios.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${authToken}`;
    return config;
  });
  const id = props.match.params.id;
  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios
      .get(`https://elepsio.herokuapp.com/api/admin/users/${id}`)
      .then(result => setFormData(result.data));
    console.log(users);
  }, []);

  const loginHandler = e => {
    e.preventDefault();
    formData.phone = formData.phone.replace(/[^0-9]/g, "");
    // Assuming that, all network Request is successfull, and the user is authenticated
    axios
      .patch(`https://elepsio.herokuapp.com/api/admin/users/${id}`, formData)
      .then(res => {
        if (res.status === 200) {
          alert("Обновлено");
          history.push("/users");
        } else {
          alert("Error Occoured. Try Again");
        }
      });
    console.log(formData);
  };

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onChangeHandler = nameField => e => {
    let temp = Object.assign({}, formData);
    temp[nameField] = e.target.value;
    setFormData(temp);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Редактировать данные пользвателя
            </Typography>

            <Switch checked={darkState} onChange={handleThemeChange} />

            <Typography component="h" variant="h8">
              {`${authUser().name}`}
            </Typography>
            <IconButton color="inherit" onClick={() => signOut()}>
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
        </Drawer>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Paper className={fixedHeightPaper}>
                  <form className={classes.form} onSubmit={loginHandler}>
                    <Typography component="h1" variant="h6">
                      Изменить данные пациента
                    </Typography>
                    {console.log(users)}
                    <TextField
                      value={formData.customId}
                      onChange={onChangeHandler("customId")}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="customId"
                      label="Индентификатор пользователя"
                      type="text"
                      id="customId"
                      autoComplete="current-customId"
                    />

                    {/* <MuiPhoneNumber
                      value={formData.phone}
                      onChange={onChangeHandler("phone")}
                      defaultCountry={"ua"}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="phone"
                      label="Имя"
                      name="phone"
                      autoComplete="phone"
                      autoFocus
                    /> */}

                    <TextField
                      value={formData.phone}
                      onChange={onChangeHandler("phone")}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Номер телефона "
                      type="text"
                      id="password"
                      autoComplete="current-password"
                      inputProps={{ maxLength: 12 }}
                    />

                    <TextField
                      onChange={onChangeHandler("password")}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Пароль"
                      type="text"
                      id="password"
                      autoComplete="current-password"
                      inputProps={{ maxLength: 12 }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Внести изменения
                    </Button>
                  </form>
                </Paper>
              </Grid>
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default EditCurentUser;
