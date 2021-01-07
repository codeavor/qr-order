import React from "react";

import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

import BottomButton from "./BottomButton";

BottomBox.propTypes = {
  text: PropTypes.string,
  price: PropTypes.string,
  route: PropTypes.string,
  completeOrder: PropTypes.func,
};

BottomBox.defaultProps = {
  price: "0",
  route: "/",
  values: {},
};

const useStyles = makeStyles((theme) => ({
  quantityCounter: {
    position: "fixed",
    bottom: theme.spacing(0),
    zIndex: "1",
    width: "100%",
    height: 60,
  },
}));

export default function BottomBox({ text, price, route, ...props }) {
  const classes = useStyles();

  return (
    <Box
      className={classes.quantityCounter}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="background.paper"
      boxShadow={3}
      data-testid="bottom-box"
    >
      <Box pl={0}>
        <BottomButton
          text={text}
          price={parseFloat(price)}
          route={route}
          {...props}
        />
      </Box>
    </Box>
  );
}
