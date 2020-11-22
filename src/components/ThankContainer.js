import React from 'react';
import { Box } from '@material-ui/core';

const defaultProps = {
  border : 2,
  borderColor:'grey.600',
  marginTop:"25%",
  justifyContent:"center",
  display:"flex",
  flexWrap:"nowrap"
};

export default function RadioButtonsGroup() {
  
  return (
    <Box
    justifyContent="center"
    alignItems="center"
    display="flex"
    flexWrap="nowrap"
    width="100%"
    height="500px">
      <Box
      justifyContent="center"
      alignItems="center"
      display="flex"
      flexWrap="nowrap"
      width="70%"
      height="100%" borderRadius={8} {...defaultProps}>
        Thank you for your purchase
      </Box>
    </Box>
  );
}
