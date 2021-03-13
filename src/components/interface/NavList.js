import React from "react";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import LayersIcon from "@material-ui/icons/Layers";

export const mainListItems = (
  <div>
    <Link to="/users" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>

        <ListItemText primary="Пациенты" />
      </ListItem>
    </Link>

    {/* <Link to="/setting" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Настройки" />
      </ListItem>
    </Link> */}
  </div>
);
