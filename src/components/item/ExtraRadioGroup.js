import React from "react";

import { useFormikContext } from "formik";
import PropTypes from "prop-types";

import Extras from "./Extras";
import { Radio, RadioGroup } from "@material-ui/core";

ExtraRadioGroup.propTypes = {
  extra_category: PropTypes.object,
};

ExtraRadioGroup.defaultProps = {
  extra_category: { extras: [] },
};

export default function ExtraRadioGroup({ extra_category }) {
  const { values, handleChange } = useFormikContext();

  return (
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
          controlComponent={
            <Radio disableRipple={true} onChange={handleChange} />
          }
          key={extra.id}
        />
      ))}
    </RadioGroup>
  );
}
