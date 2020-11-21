import React from "react";
import { Link, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "../interface/TittleNav";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import WhatshotIcon from "@material-ui/icons/Whatshot";

import { lightBlue } from "@material-ui/core/colors";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function BarHealth() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Текущие данные</Title>

      <Grid container direction="row" alignItems="center">
        <FavoriteIcon style={{ color: lightBlue[700] }} fontSize="large" />{" "}
        Сердечный ритм : 94
      </Grid>

      <Grid container direction="row" alignItems="center">
        <DirectionsRunIcon style={{ color: lightBlue[700] }} fontSize="large" />{" "}
        Пройденные шаги : 7452
      </Grid>

      <Grid container direction="row" alignItems="center">
        <WhatshotIcon style={{ color: lightBlue[700] }} fontSize="large" />{" "}
        Сожженые колориии : 234
      </Grid>
    </React.Fragment>
  );
}
