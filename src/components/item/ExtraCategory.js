import React from "react";

import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

import Extras from "./Extras";
import ExtraCheckBox from "./ExtraCheckBox";

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
  handleChange: PropTypes.func,
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  disabled: PropTypes.bool,
  setValues: PropTypes.func,
};

ExtraCategory.defaultProps = {
  extra_category: {},
  values: {},
  disabled: false,
};

export default function ExtraCategory({
  extra_category,
  handleChange,
  values,
  setFieldValue,
  disabled,
}) {
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
        <ExtraCheckBox
          extra_category={extra_category}
          values={values}
          disabled={disabled}
          setFieldValue={setFieldValue}
        />
      ) : extra_category.type === "radioButton" ? (
        <RadioGroup
          name={extra_category.name}
          // Radio buttons are represented as: Radio Group Name: "price*100 id"
          value={
            values[extra_category.name] === undefined
              ? ""
              : values[extra_category.name]
          }
        >
          {extra_category.extras.map((extra) => (
            <Extras
              extra={extra}
              controlComponent={<Radio onChange={handleChange} />}
              key={extra.id}
            />
          ))}
        </RadioGroup>
      ) : null}
    </FormControl>
  );
}
