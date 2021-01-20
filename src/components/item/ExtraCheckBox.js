import React from "react";

import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

import Extras from "./Extras";
import { combinedPriceId } from "../../utils/extra/extraUtils";

ExtraCheckBox.propTypes = {
  extra_category: PropTypes.object,
};

ExtraCheckBox.defaultProps = {
  extra_category: { extras: [] },
};

export default function ExtraCheckBox({ extra_category }) {
  const { control } = useFormContext();

  return (
    <FormGroup aria-label={extra_category.name}>
      {extra_category.extras.map((extra) => (
        <Extras
          extra={extra}
          controlComponent={
            <Controller
              control={control}
              name={combinedPriceId(extra.price, extra.id)}
              defaultValue={false}
              render={(props) => (
                <Checkbox
                  checked={props.value}
                  disableRipple={true}
                  onChange={(e) => {
                    props.onChange(e.target.checked);
                  }}
                  id={combinedPriceId(extra.price, extra.id)}
                />
              )}
            />
          }
          key={extra.id}
        />
      ))}
    </FormGroup>
  );
}
