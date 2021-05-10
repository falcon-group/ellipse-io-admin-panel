import React, { useState, useRef } from "react";
import clsx from "clsx";
import axios from "axios";
//Auth Kit
import { useAuthUser, useSignOut } from "react-auth-kit";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import Cookies from "js-cookie";
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
  Button,
} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
//Icons
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import { Redirect, useHistory } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import Title from "../interface/TittleNav";
//Colors
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange,
} from "@material-ui/core/colors";
//Components
import { mainListItems } from "../interface/NavList";
// For Switch Theming
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Chart from "./ChartHealth";
import BarHealth from "./BarHealth";
import TableHealth from "./TableHealth";
import { Link as RouteLink } from "react-router-dom";
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
  fixedHeight: {
    height: 300,
    overflow: "hidden",
  },
}));

const ExportHealthParams = props => {
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
  let history = useHistory();
  const customId = props.match.params.customId;

  const [fromDate, setFromDate] = useState({ fromdate: "2021-01-10T10:30" });
  const [toDate, setToDate] = useState({ todate: "2021-01-10T10:30" });

  const logoutSession = () => {
    Cookies.remove("_auth_t", { path: "/" });
    Cookies.remove("_auth_t_type", { path: "/" });
    Cookies.remove("_auth_state", { path: "/" });
    Cookies.remove("_auth_time", { path: "/" });
    signOut();
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

  const authToken = Cookies.get("_auth_t");
  axios.interceptors.request.use(config => {
    config.headers.authorization = ` ${authToken}`;
    return config;
  });
  const exportCSV = () => {
    axios({
      url: `https://elepsio.herokuapp.com/api/admin/users/${customId}/health_params?fromDate=${fromDate.fromdate}:00.000Z&toDate=${toDate.todate}:00.000Z&GMT=2`, //your url
      method: "GET",
      responseType: "blob", // important
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${customId}(From${fromDate.fromdate}) (To ${toDate.todate}).xlsx`
      ); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
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
              Экспортировать данных пользователя : {customId}
            </Typography>

            <Switch checked={darkState} onChange={handleThemeChange} />
            <IconButton color="inherit">
              <PersonIcon />
            </IconButton>
            <Typography component="h" variant="subtitle2">
              {`${authUser().name}`}
            </Typography>
            <IconButton color="inherit" onClick={() => logoutSession()}>
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
            <IconButton onClick={history.goBack} aria-label="delete">
              <KeyboardBackspaceIcon />
            </IconButton>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Title>Введите значения</Title>

                <form className={classes.container} noValidate>
                  <TextField
                    onChange={e =>
                      setFromDate({ ...fromDate, fromdate: e.target.value })
                    }
                    id="datetime-local"
                    label="От"
                    type="datetime-local"
                    defaultValue="2021-01-10T10:30"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>

                <form className={classes.container} noValidate>
                  <TextField
                    onChange={e =>
                      setToDate({ ...toDate, todate: e.target.value })
                    }
                    id="datetime-local"
                    label="До"
                    type="datetime-local"
                    defaultValue="2021-01-10T10:30"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>

                <ButtonGroup>
                  <Box mr={2}>
                    <Button
                      onClick={exportCSV}
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                      style={{ marginBottom: "20px" }}
                    >
                      Экспорт
                    </Button>
                  </Box>
                </ButtonGroup>
              </Paper>
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
export default ExportHealthParams;
