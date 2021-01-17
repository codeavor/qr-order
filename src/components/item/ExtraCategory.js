import React, { memo } from "react";

import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

import ExtraCheckBox from "./ExtraCheckBox";
import ExtraRadioGroup from "./ExtraRadioGroup";
import { useFormikContext } from "formik";

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

function ExtraCategory({ extra_category, disabled }) {
  const { values, handleChange, setFieldValue } = useFormikContext();
  const classes = useStyles();

  const controlType = (extra_category) => {
    if (extra_category.type === "checkBox") {
      return (
        <ExtraCheckBox
          extra_category={extra_category}
          values={values}
          setFieldValue={setFieldValue}
        />
      );
    } else if (extra_category.type === "radioButton") {
      // Radio buttons are represented as: Radio Group Name: "price*100 id"
      const radioGroupValue =
        values[extra_category.name] === undefined
          ? ""
          : values[extra_category.name];
      return (
        <ExtraRadioGroup
          extra_category={extra_category}
          radioGroupValue={radioGroupValue}
          handleChange={handleChange}
        />
      );
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
      {controlType(extra_category)}
    </FormControl>
  );
}

export default memo(ExtraCategory);
