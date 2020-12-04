import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  box: {
    margin: "2% auto 10% auto",
    width: "80%",
    border: "0.8px solid rgb(188,188,188)",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Option = ({ value, label, disabled = false }) => {
  return (
    <React.Fragment>
      <FormControlLabel
        control={<Radio />}
        value={value}
        label={label}
        disabled={disabled}
      />
      <Divider />
    </React.Fragment>
  );
};

export default function CheckoutPayment() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box mt={3}>
        <Typography>Payment Methods</Typography>
      </Box>
      <Box px={2} className={classes.box} data-testid="checkout-payment">
        <FormControl fullWidth component="fieldset">
          <RadioGroup aria-label="payment-options" name="options">
            <Option value="Cash" label="Pay with Cash" />
            <Option value="Card" label="Pay with Card" />
            <Option value="Paypal" label="Paypal" disabled={true} />
          </RadioGroup>
        </FormControl>
      </Box>
    </React.Fragment>
  );
}
