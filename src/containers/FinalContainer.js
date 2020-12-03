import React from "react";
import NavBar from "../components/NavBar";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  finalBox: {
    margin: "25% auto",
    width: "75%",
    border: "2px solid rgb(117, 117, 117)",
    borderRadius: 8,
    height: "30em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export function FinalContainer() {
  const classes = useStyles();
  return (
    <div>
      <NavBar back={true} text="Transaction Completed!" />
      <Box className={classes.finalBox}>Thank you for your purchase</Box>
    </div>
  );
}

export default FinalContainer;
