import React, { useState, useEffect, useRef, PureComponent } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Title from "./TittleNav";
// import { useForkRef } from "@material-ui/core";
class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, stroke, value } = this.props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  }
}
export default function Chart() {
  const theme = useTheme();
  const ws = useRef(null);

  const [barData, setBarData] = useState({
    data: [
      {
        pulse: 87,
        time: "18:02",
      },
    ],
  });
  useEffect(() => {
    ws.current = new WebSocket("wss://elepsio.herokuapp.com/");
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    return () => {
      ws.current.close();
    };
  }, []);
  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = function (event) {
      setBarData({ data: [...barData.data, JSON.parse(event.data)] });
    };
  }, [barData]);

  console.log(barData);
  return (
    <React.Fragment>
      <Title>График</Title>
      <ResponsiveContainer>
        <LineChart
          isAnimationActive="false"
          data={barData.data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
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
            dataKey="pulse"
            stroke={theme.palette.primary.main}
            dot={false}
            label={<CustomizedLabel />}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
