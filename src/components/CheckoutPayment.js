import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Box } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const defaultProps = {
  border: 2,
  borderColor: "grey.600",
  marginTop: "3%",
  justifyContent: "center",
  display: "flex",
  flexWrap: "nowrap",
  style: { width: "80%", height: "70%" },
};

export default function CheckoutPayment() {
  return (
    <Box
      data-testid="payment-options"
      justifyContent="center"
      alignItems="center"
      display="flex"
      flexWrap="nowrap"
    >
      <Box borderRadius={8} {...defaultProps}>
        <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
          <RadioGroup aria-label="gender" name="gender1">
            <FormControlLabel
              value="Cash"
              control={<Radio />}
              label="Pay with Cash"
            />
            <Divider display="flex" wrap="nowrap" />
            <FormControlLabel
              value="Card"
              control={<Radio />}
              label="Pay with Card"
            />
            <Divider display="flex" wrap="nowrap" />
            <FormControlLabel
              value="disabled"
              disabled
              control={<Radio />}
              label="Paypal"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
}
