import React, { Children } from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

BottomBox.propTypes = {
  children: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  bottomBox: {
    position: "fixed",
    bottom: theme.spacing(0),
    zIndex: "1",
    width: "100%",
    padding: "1em 0 1em 0",
  },
}));

export default function BottomBox({ children }) {
  const classes = useStyles();

  return (
    <Box
      className={classes.bottomBox}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="background.paper"
      boxShadow={3}
      data-testid="bottom-box"
    >
      <Grid container justify="center" alignItems="center" spacing={2}>
        {Children.map(children, (child) => (
          <Grid item>{child}</Grid>
        ))}
      </Grid>
    </Box>
  );
}
