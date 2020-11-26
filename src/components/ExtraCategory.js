import React, { useState } from "react";

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
import C from "../constants";

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
  setValues,
}) {
  const classes = useStyles();
  const [flag, setFlag] = useState(true);

  React.useEffect(() => {
    if (disabled && flag) {
      let tempValues = { ...values };
      for (let i = 0; i < C.SUGAR_IDS.length; i++) {
        if (tempValues[C.SUGAR_IDS[i]] === true) {
          tempValues[C.SUGAR_IDS[i]] = false;
        }
      }
      setFlag(false);
      setValues(tempValues);
    } else if (!disabled) {
      setFlag(true);
    }
  }, [values, disabled, setValues, flag]);

  const CheckBox = () => {
    return (
      <FormGroup aria-label={extra_category.name}>
        {extra_category.extras.map((extra) => (
          <Extras
            extra={extra}
            controlComponent={
              <Checkbox
                checked={
                  values[combinedPriceId(extra.price, extra.id)] ===
                    undefined || disabled
                    ? false
                    : values[combinedPriceId(extra.price, extra.id)]
                }
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

  return (
    <div data-testid="extra-category" className={classes.root}>
      <FormControl
        disabled={disabled}
        className={classes.formControl}
        component="fieldset"
      >
        <FormLabel>
          <Typography className={classes.categoryName}>
            {extra_category.name}
          </Typography>
        </FormLabel>
        {extra_category.type === "checkBox" ? (
          <CheckBox />
        ) : extra_category.type === "radioButton" ? (
          <RadioGroup
            name={extra_category.name}
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
    </div>
  );
}
