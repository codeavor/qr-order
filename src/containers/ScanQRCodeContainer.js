import React, { useState } from "react";

import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import NavBar from "../components/common/NavBar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export function ScanQRCodeContainer({ errorData }) {
  const [open, setOpen] = useState(errorData.error !== "");

  return (
    <React.Fragment>
      <NavBar text="Scan QR Code!" back={false} />
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <img
          src="https://res.cloudinary.com/jimskretas/image/upload/v1619870641/qr-code.webp"
          rel="nofollow"
          alt="qr code"
        />
      </Grid>
      <Snackbar open={open} data-testid="error" message={errorData.error}>
        <Alert
          severity="error"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              data-testid="close-error-button"
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {errorData.error}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    errorData: state.error,
  };
};

export default connect(mapStateToProps)(ScanQRCodeContainer);
