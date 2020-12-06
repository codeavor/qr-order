import React from "react";

import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Extras from "./Extras";
import { combinedPriceId } from "../utils/extra/extraUtils";

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

const CustomCheckbox = ({
  extra_category,
  values,
  disabled,
  setFieldValue,
}) => {
  const isChecked = (extra) => {
    let valuesKey = combinedPriceId(extra.price, extra.id);

    if (values[valuesKey] === undefined) return false;

    // disabled is true only if sketos is checked
    if (disabled) return false;

    // Checkboxes are represented as: "price*100 id": boolean
    return values[valuesKey];
  };

  return (
    <FormGroup aria-label={extra_category.name}>
      {extra_category.extras.map((extra) => (
        <Extras
          extra={extra}
          controlComponent={
            <Checkbox
              checked={isChecked(extra)}
              onChange={() => {
                setFieldValue(
                  combinedPriceId(extra.price, extra.id),
                  !values[combinedPriceId(extra.price, extra.id)]
                );
              }}
              id={extra_category.name}
            />
          }
          key={extra.id}
        />
      ))}
    </FormGroup>
  );
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
        <CustomCheckbox
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
