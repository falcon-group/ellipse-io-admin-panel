import React, { useState } from "react";
import clsx from "clsx";
import axios from "axios";
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
  Button,
  ListItem,
  ListItemText,
} from "@material-ui/core";
//Icons
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
//Colors
import {
  lightBlue,
  deepOrange,
  indigo,
  orange,
} from "@material-ui/core/colors";
//Components
import { mainListItems } from "../interface/NavList";
// For Switch Theming
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useEffect } from "react";
import { Link as RouteLink } from "react-router-dom";
import Cookies from "js-cookie";
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

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const signOut = useSignOut();
  const authUser = useAuthUser();

  const logoutSession = () => {
    Cookies.remove("_auth_t", { path: "/" });
    Cookies.remove("_auth_t_type", { path: "/" });
    Cookies.remove("_auth_state", { path: "/" });
    Cookies.remove("_auth_time", { path: "/" });
    signOut();
  };

  const [users, setUsers] = React.useState([]);

  const authToken = Cookies.get("_auth_t");
  axios.interceptors.request.use(config => {
    config.headers.authorization = ` ${authToken}`;
    return config;
  });

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios
      .get("https://elepsio.herokuapp.com/api/admin/users")
      .then(result => setUsers(result.data));
  }, []);

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[800];
  const mainSecondaryColor = darkState ? deepOrange[900] : indigo[500];
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
              Пациенты
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
            <Button
              size="medium"
              variant="contained"
              color="primary"
              href="/add-user "
              style={{ marginBottom: "20px" }}
              startIcon={<PersonAddIcon />}
            >
              Добавить
            </Button>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>
                  <List>
                    {users?.map(user => {
                      let about = `/user-info/${user.customId}`;
                      let del = `/delete-user/${user._id}`;
                      let edit = `/edit-user/${user._id}`;

                      return (
                        <RouteLink
                          to={about}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <ListItemLink>
                            <ListItemAvatar>
                              <Avatar>
                                <PersonIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              key={user._id}
                              primary={user.customId}
                              secondary={user.phone}
                            />

                            <RouteLink
                              to={edit}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <IconButton
                                aria-label="edit"
                                className={classes.margin}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </RouteLink>

                            <RouteLink
                              to={del}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <IconButton
                                aria-label="delete"
                                className={classes.margin}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </RouteLink>
                          </ListItemLink>
                        </RouteLink>
                      );
                    })}
                  </List>
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
}
