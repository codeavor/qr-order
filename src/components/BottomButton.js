import React from "react";

import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
  route: PropTypes.string,
  disable: PropTypes.bool,
};

BottomButton.defaultProps = {
  price: 0,
  route: "/",
};

export default function BottomButton({
  icon,
  text,
  price,
  route,
  disable,
  ...props
}) {
  const classes = useStyles();

  return (
    <Button
      data-testid="bottom-button"
      variant="contained"
      color="primary"
      className={classes.backButton}
      startIcon={icon ? <ShoppingCartIcon data-testid="cart-icon" /> : null}
      component={Link}
      to={route}
      disabled={disable}
      {...props}
    >
      {text} {price.toFixed(2)}€
    </Button>
  );
}
