import React, { useState } from "react";
import clsx from "clsx";
import axios from "axios";
//Auth Kit
import { useAuthUser, useSignOut } from "react-auth-kit";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

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
} from "@material-ui/core";
//Icons
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
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
import { useEffect } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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

const NotesUser = props => {
  const [open, setOpen] = useState(true);
  const [darkState, setDarkState] = useState(false);
  const [existNotes, setNotesExist] = React.useState(true);
  const [notes, setNotes] = React.useState([]);
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

  const customId = props.match.params.customId;
  let history = useHistory();

  const logoutSession = () => {
    Cookies.remove("_auth_t", { path: "/" });
    Cookies.remove("_auth_t_type", { path: "/" });
    Cookies.remove("_auth_state", { path: "/" });
    Cookies.remove("_auth_time", { path: "/" });
    signOut();
  };

  const authToken = Cookies.get("_auth_t");
  axios.interceptors.request.use(config => {
    config.headers.authorization = ` ${authToken}`;
    return config;
  });
  useEffect(() => {
    axios
      .get(
        `https://elepsio.herokuapp.com/api/admin/notes?page=1&perPage=4&customUserId=${customId}`
      )
      .then(result => {
        if (result.data.length === 0) {
          setNotesExist(false);
        } else {
          setNotes(result.data);
        }
      });
  }, []);

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
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
              Заметки пациента: {customId}
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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>
                  {!existNotes ? (
                    <Typography component="h1" variant="h6">
                      У данного пациента отсутсвуют заметки
                    </Typography>
                  ) : null}
                  {notes?.map(notes => {
                    return (
                      <Card key={notes._id} style={{ marginBottom: "20px" }}>
                        <CardContent>
                          <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                          >
                            Дата создания:
                            {new Date(notes.createDate).toLocaleString()}
                          </Typography>
                          <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                          >
                            Обновлено:
                            {new Date(notes.updateDate).toLocaleString()}
                          </Typography>

                          <Typography variant="h5" component="h2">
                            {notes.title}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {notes.content}
                          </Typography>
                        </CardContent>
                      </Card>
                    );
                  })}
                  {/* {notes.length === 0 && <h1>Заметок нет</h1>} */}
                  {/* {console.log(notes)} */}
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
export default NotesUser;
