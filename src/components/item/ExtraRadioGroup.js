import React from "react";

import { useFormContext } from "react-hook-form";
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
  const { register, watch, setValue } = useFormContext();

  const handleChange = (event) => {
    setValue(event.target.name, event.target.value);
  };

  return (
    <RadioGroup
      name={extra_category.name}
      // Radio buttons are represented as: Radio Group Name: "price*100 id"
      value={
        watch(extra_category.name) === undefined
          ? ""
          : watch(extra_category.name)
      }
      onChange={handleChange}
    >
      {extra_category.extras.map((extra) => (
        <Extras
          extra={extra}
          controlComponent={<Radio disableRipple={true} inputRef={register} />}
          key={extra.id}
        />
      ))}
    </RadioGroup>
  );
}
