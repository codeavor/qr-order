import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  finalBox: {
    margin: "auto",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Loading() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box className={classes.finalBox}>
        <CircularProgress data-testid="loading" />
      </Box>
    </React.Fragment>
  );
}
