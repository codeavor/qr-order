import React from "react";
import NavBar from "../components/NavBar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export function FinalContainer() {
  return (
    <React.Fragment>
      <NavBar back={true} text="Transaction Completed!" />
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Typography>Thank you for your purchase!</Typography>
      </Grid>
    </React.Fragment>
  );
}

export default FinalContainer;
