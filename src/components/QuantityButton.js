import React from "react";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

QuantityButton.propTypes = {
  setQuantityNum: PropTypes.func,
  quantityNum: PropTypes.number,
};

QuantityButton.defaultProps = {
  quantityNum: 1,
};

const useStyles = makeStyles((theme) => ({
  quantityDisabledButton: {
    backgroundColor: theme.palette.background.paper + "!important",
    color: "rgba(0, 0, 0, 0.54) !important",
  },
}));

export default function QuantityButton({ setQuantityNum, quantityNum }) {
  const classes = useStyles();

  return (
    <ButtonGroup data-testid="quantity-button-group">
      <Button
        data-testid="minus-quantity-button"
        size="small"
        aria-label="reduce"
        variant="contained"
        color="primary"
        onClick={() => {
          setQuantityNum(Math.max(quantityNum - 1, 1));
        }}
      >
        <RemoveIcon fontSize="small" />
      </Button>
      <Button
        className={classes.quantityDisabledButton}
        data-testid="quantity-value-button"
        size="small"
        disabled
      >
        {quantityNum}
      </Button>
      <Button
        data-testid="plus-quantity-button"
        size="small"
        aria-label="increase"
        variant="contained"
        color="primary"
        onClick={() => {
          setQuantityNum(quantityNum + 1);
        }}
      >
        <AddIcon fontSize="small" />
      </Button>
    </ButtonGroup>
  );
}
