import React from "react";

import NavBar from "../components/NavBar";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    margin: "25% auto",
    width: "75%",
    height: "30em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
export default function ScanQRCodeContainer() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <NavBar text="Scan QR Code!" />
      <Box className={classes.box}>
        <img
          src="https://chart.googleapis.com/chart?cht=qr&chl=http%3A%2F%2F192.168.2.7%3A3000%2Fauthentication%2F1&chs=180x180&choe=UTF-8&chld=L|2"
          rel="nofollow"
          alt="qr code"
        />
      </Box>
    </React.Fragment>
  );
}
