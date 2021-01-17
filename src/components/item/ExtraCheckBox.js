import React from "react";

import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
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

export default function ExtraCheckBox({
  extra_category,
  values,
  setFieldValue,
}) {
  return (
    <FormGroup aria-label={extra_category.name}>
      {extra_category.extras.map((extra) => {
        const valuesKey = combinedPriceId(extra.price, extra.id);
        const newValue = !values[valuesKey];
        const isChecked = values[valuesKey] !== undefined && values[valuesKey];
        return (
          <Extras
            extra={extra}
            controlComponent={
              <Checkbox
                checked={isChecked}
                disableRipple={true}
                onChange={() => {
                  setFieldValue(valuesKey, newValue);
                }}
                id={extra.name}
              />
            }
            key={extra.id}
          />
        );
      })}
    </FormGroup>
  );
}
