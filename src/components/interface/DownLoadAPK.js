import React from "react";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { Redirect, useHistory } from "react-router-dom";
import MuiPhoneNumber from "material-ui-phone-number";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { lightBlue } from "@material-ui/core/colors";
import ApkFile from "../../assets/ellipse-alpha.apk";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  makeStyles,
  Container,
  IconButton,
  InputAdornment,
  Collapse,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: lightBlue[700],
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#1976d2",
    color: "#ffffffde",
    "&:hover": {
      background: "#1976d2",
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const DownLoadAPK = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FavoriteBorderIcon />
        </Avatar>

        <Typography component="h1" align="center" variant="h4">
          Добро пожаловать!
        </Typography>

        <Typography component="h1" variant="subtitle1">
          для загрузки APK приложения,
        </Typography>
        <Typography component="h1" variant="subtitle1">
          нажмите загрузить
        </Typography>

        <Button
          href={ApkFile}
          download="Ellipse.apk"
          type="submit"
          fullWidth
          variant="contained"
          className={classes.submit}
        >
          Загрузить
        </Button>
      </div>
    </Container>
  );
};

export default DownLoadAPK;
