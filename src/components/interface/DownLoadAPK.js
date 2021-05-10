import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { lightBlue } from "@material-ui/core/colors";
import ApkFile from "../../assets/ellipse.apk";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";

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
          href="https://drive.google.com/uc?id=1HWeAZmaf_AjdVAZmhzJTuGNyo0l8LwoK&export=download"
          // download="EllipseV1.apk"
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
