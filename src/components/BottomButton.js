import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles((theme) => ({
  backButton: {
    position: "fixed",
    bottom: theme.spacing(2),
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: "1",
    textTransform: "capitalize",
  },
}));

export default function BottomButton({ icon, text, price }) {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        boxShadow={3}
        color="primary"
        className={classes.backButton}
        startIcon={icon ? <ShoppingCartIcon /> : null}
      >
        {text} {price}€
      </Button>
    </div>
  );
}
