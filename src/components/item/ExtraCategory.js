import React from "react";

import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

import ExtraCheckBox from "./ExtraCheckBox";
import ExtraRadioGroup from "./ExtraRadioGroup";

const useStyles = makeStyles((theme) => ({
  categoryName: {
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: 16,
  },
  formControl: {
    width: "100%",
    marginTop: 10,
  },
}));

ExtraCategory.propTypes = {
  extra_category: PropTypes.object,
  disabled: PropTypes.bool,
};

ExtraCategory.defaultProps = {
  extra_category: {},
  disabled: false,
};

export default function ExtraCategory({ extra_category, disabled }) {
  const classes = useStyles();

  return (
    <FormControl
      disabled={disabled}
      className={classes.formControl}
      component="fieldset"
      data-testid="extra-category"
    >
      <FormLabel>
        <Typography className={classes.categoryName}>
          {extra_category.name}
        </Typography>
      </FormLabel>
      {extra_category.type === "checkBox" ? (
        <ExtraCheckBox extra_category={extra_category} disabled={disabled} />
      ) : extra_category.type === "radioButton" ? (
        <ExtraRadioGroup extra_category={extra_category} />
      ) : null}
    </FormControl>
  );
}
