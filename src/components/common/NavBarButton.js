import React from "react";

import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    margin: theme.spacing(1),
    minWidth: "50px",
  },
}));

NavBarButton.propTypes = {
  edge: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.node,
};

export default function NavBarButton({ edge = "start", name, icon, ...props }) {
  const classes = useStyles();

  return (
    <IconButton
      edge={edge}
      className={classes.menuButton}
      disableFocusRipple={true}
      disableRipple={true}
      aria-label={`${name}-button`}
      data-testid={`${name}-button`}
      {...props}
    >
      {icon}
    </IconButton>
  );
}
