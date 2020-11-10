import React from "react";
import Box from "@material-ui/core/Box";
import QuantityButton from "../components/QuantityButton";
import BottomButton from "../components/BottomButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  quantityCounter: {
    position: "fixed",
    bottom: theme.spacing(0),
    zIndex: "1",
    width: "100%",
    height: 60,
  },
}));

export default function BottomBox({ text, quantity }) {
  const classes = useStyles();

  return (
    <Box
      className={classes.quantityCounter}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="background.paper"
      boxShadow={3}
    >
      {quantity ? (
        <Box pr={2}>
          <QuantityButton />
        </Box>
      ) : null}

      <Box pl={2}>
        <BottomButton icon={true} text={text} price={2.45} />
      </Box>
    </Box>
  );
}
