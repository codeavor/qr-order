import React from "react";

import { Link } from "react-router-dom";

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

MenuItem.propTypes = {
  item: PropTypes.object,
};

MenuItem.defaultProps = {
  item: {
    id: 1,
    name: "Coffee",
    price: 1,
  },
};

export default function MenuItem({ item }) {
  const classes = useStyles();
  const itemUrl = `item/${item.id}`;

  return (
    <div className={classes.root}>
      <ListItem button component={Link} to={itemUrl} data-testid="menu-item">
        <ListItemText
          primary={item.name}
          secondary={parseFloat(item.price).toFixed(2).replace(".", ",") + " €"}
        />
      </ListItem>
      <Divider />
    </div>
  );
}
