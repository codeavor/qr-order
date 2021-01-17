import React, { memo } from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import PropTypes from "prop-types";

import Extras from "./Extras";

ExtraRadioGroup.propTypes = {
  extra_category: PropTypes.object,
};

ExtraRadioGroup.defaultProps = {
  extra_category: { extras: [] },
};

function ExtraRadioGroup({ extra_category, radioGroupValue, handleChange }) {
  return (
    <RadioGroup name={extra_category.name} value={radioGroupValue}>
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

const extraRadioGroupsAreEqual = (prevProps, nextProps) => {
  return (
    prevProps.radioGroupValue === nextProps.radioGroupValue &&
    prevProps.handleChange === nextProps.handleChange &&
    prevProps.extra_category.id === nextProps.extra_category.id
  );
};

export default memo(ExtraRadioGroup, extraRadioGroupsAreEqual);
