import React from "react";
import { Link, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "../interface/TittleNav";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import WhatshotIcon from "@material-ui/icons/Whatshot";
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
      {/* <Typography component="p" variant="h4">
        $3,024.00
      </Typography> */}
      <Grid container direction="row" alignItems="center">
        <FavoriteIcon /> Сердечный ритм : 94
      </Grid>

      <Grid container direction="row" alignItems="center">
        <DirectionsRunIcon /> Пройденные шаги : 7452
      </Grid>

      <Grid container direction="row" alignItems="center">
        <WhatshotIcon /> Сожженые колориии : 234
      </Grid>

      {/* <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography> */}
    </React.Fragment>
  );
}
