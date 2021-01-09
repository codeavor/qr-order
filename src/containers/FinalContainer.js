import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NavBar from "../components/common/NavBar";

export function FinalContainer() {
  return (
    <React.Fragment>
      <NavBar text="Order Completed!" />
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
