import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function MenuItem({ item }) {
  const classes = useStyles();
  const itemUrl = "item/" + item.id;

  return (
    <div className={classes.root}>
      <ListItem button component={Link} to={itemUrl}>
        <ListItemText primary={item.name} secondary={item.price + " €"} />
      </ListItem>
      <Divider />
    </div>
  );
}
