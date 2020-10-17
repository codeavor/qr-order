import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

export default function Loading() {
  return (
    <div style={{ width: "100%" }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <CircularProgress data-testid="loading" />
      </Box>
    </div>
  );
}
