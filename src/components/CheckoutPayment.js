import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Box, Grid } from '@material-ui/core';

const defaultProps = {
  border : 3,
  borderColor:'grey.500',
  marginTop:"3%",
  justifyContent:"center",
  display:"flex",
  flexWrap:"nowrap",
  style: { width: '45%', height: '45%' }
};

export default function RadioButtonsGroup() {
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box
    justifyContent="center"
    alignItems="center"
    display="flex"
    flexWrap="nowrap">
      <Box borderRadius={20} {...defaultProps}>
        <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
            <RadioGroup  aria-label="gender" name="gender1" value={value} onChange={handleChange}>
              <FormControlLabel value="Cash" control={<Radio />} label="Pay with Cash" />
              <FormControlLabel value="Card" control={<Radio />} label="Pay with Card" />
              <FormControlLabel value="disabled" disabled control={<Radio />} label="Paypal" />
            </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
}
