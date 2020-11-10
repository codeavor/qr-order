import React from "react";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  quantityDisabledButton: {
    backgroundColor: theme.palette.background.paper + "!important",
    color: "rgba(0, 0, 0, 0.54) !important",
  },
}));

export default function QuantityButtonComponent() {
  const [count, setCount] = React.useState(1);
  const classes = useStyles();

  return (
    <ButtonGroup>
      <Button
        data-testid="minus-quantity-button"
        size="small"
        aria-label="reduce"
        variant="contained"
        color="primary"
        onClick={() => {
          setCount(Math.max(count - 1, 1));
        }}
      >
        <RemoveIcon fontSize="small" />
      </Button>
      <Button
        className={classes.quantityDisabledButton}
        data-testid="quantity-button"
        size="small"
        disabled
      >
        {count}
      </Button>
      <Button
        data-testid="plus-quantity-button"
        size="small"
        aria-label="increase"
        variant="contained"
        color="primary"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        <AddIcon fontSize="small" />
      </Button>
    </ButtonGroup>
  );
}
