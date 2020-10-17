import React from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

Error.propTypes = {
  error: PropTypes.string,
};

Error.defaultProps = {
  error: "",
};

export default function Error({ error }) {
  return (
    <div style={{ width: "100%" }}>
      <Box
        data-testid="error"
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Typography variant="h5">{error}</Typography>
      </Box>
    </div>
  );
}
