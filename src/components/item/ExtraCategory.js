import React from "react";

import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

import ExtraCheckBox from "./ExtraCheckBox";
import ExtraRadioGroup from "./ExtraRadioGroup";

const useStyles = makeStyles(() => ({
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

  const controlType = (extra_category, disabled) => {
    if (extra_category.type === "checkBox") {
      return (
        <ExtraCheckBox extra_category={extra_category} disabled={disabled} />
      );
    } else if (extra_category.type === "radioButton") {
      return <ExtraRadioGroup extra_category={extra_category} />;
    }
  };

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
      {controlType(extra_category, disabled)}
    </FormControl>
  );
}
