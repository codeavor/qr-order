import React from 'react';
import { Box } from '@material-ui/core';

const defaultProps = {
  border : 2,
  borderColor:'grey.600',
  marginTop:"25%",
  justifyContent:"center",
  display:"flex",
  flexWrap:"nowrap",
  style: { width: '80%', height: '70%' }
};

export default function RadioButtonsGroup() {
  
  return (
    <Box
    justifyContent="center"
    alignItems="center"
    display="flex"
    flexWrap="nowrap">
      <Box borderRadius={8} {...defaultProps}>
       kalispera thelo na kano ena test genikotera
      </Box>
    </Box>
  );
}
