import React from "react";
import NavBar from "../components/NavBar";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  finalBox: {
    margin: "25% auto",
    width: "80%",
    height: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export function FinalContainer() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <NavBar back={true} text="Transaction Completed!" />
      <Box className={classes.finalBox}>
        <Typography>Thank you for your purchase!</Typography>
      </Box>
    </React.Fragment>
  );
}

export default FinalContainer;
