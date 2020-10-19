import React from "react";

import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

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

BottomButton.propTypes = {
  icon: PropTypes.bool,
  text: PropTypes.string,
  price: PropTypes.number,
};

export default function BottomButton({ icon, text, price }) {
  const classes = useStyles();

  return (
    <Button
      data-testid="bottom-button"
      variant="contained"
      color="primary"
      className={classes.backButton}
      startIcon={icon ? <ShoppingCartIcon data-testid="cart-icon" /> : null}
    >
      {text} {price}€
    </Button>
  );
}
