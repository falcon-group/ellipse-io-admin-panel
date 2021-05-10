import React, { useState, useEffect, useRef, PureComponent } from "react";
import { useTheme } from "@material-ui/core/styles";
import io from "socket.io-client";
import Cookies from "js-cookie";
import { useParams } from "react-router";
import { Link, Grid } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
  Treemap,
} from "recharts";
import Title from "../interface/TittleNav";
import { lightBlue } from "@material-ui/core/colors";

class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, stroke, value, COLORS, barData } = this.props;

    return (
      <text
        x={x}
        y={y}
        dy={-4}
        // fill={barData[barData.length - 1].isUrgent ? "#c40000" : "#0088FE"}
        fill={stroke}
        fontSize={10}
        textAnchor="middle"
      >
        {value}
      </text>
    );
  }
}
export default function Chart() {
  const theme = useTheme();
  const [checkUndefined, setSatusCheck] = React.useState(false);

  const [barData, setBarData] = useState([]);
  const authToken = Cookies.get("_auth_t");
  const { customId } = useParams();
  useEffect(() => {
    const adminSocket = io("https://elepsio.herokuapp.com/admin", {
      query: {
        userId: `${customId}`,
      },
      auth: {
        token: `${authToken}`,
      },
      reconnectionDelayMax: 2000,
      path: "/socket",
      reconnect: true,
    });

    adminSocket.on("params", msg => {
      let temp = [...barData, msg];
      if (temp.length > 40) temp = temp.slice(1);
      setBarData(temp);
      setSatusCheck(true);
    });

    return () => {
      adminSocket.disconnect();
    };
  }, [barData]);

  return (
    <React.Fragment>
      <ResponsiveContainer width="95%" height={100}>
        <Grid container direction="row" alignItems="center">
          <Title>График</Title>

          {checkUndefined ? (
            <Grid alignItems="center" direction="line" container>
              <FavoriteIcon
                style={{ color: lightBlue[700] }}
                fontSize="large"
              />
              {barData[barData.length - 1].heartRate}
            </Grid>
          ) : null}
        </Grid>
      </ResponsiveContainer>

      <ResponsiveContainer>
        <LineChart
          isAnimationActive="false"
          data={barData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="createDate"
            tickFormatter={value => new Date(value).toLocaleTimeString()}
            stroke={theme.palette.text.secondary}
          />

          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Пульс
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="heartRate"
            stroke={theme.palette.primary.main}
            dot={false}
            label={<CustomizedLabel />}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
