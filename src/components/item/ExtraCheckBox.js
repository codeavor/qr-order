import React from "react";

import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

import Extras from "./Extras";
import { combinedPriceId } from "../../utils/extra/extraUtils";

ExtraCheckBox.propTypes = {
  extra_category: PropTypes.object,
  disabled: PropTypes.bool,
};

ExtraCheckBox.defaultProps = {
  extra_category: { extras: [] },
  disabled: false,
};

export default function ExtraCheckBox({ extra_category, disabled }) {
  const { values, setFieldValue } = useFormikContext();
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
              disableRipple={true}
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
}
