import React from "react";
import NavBar from "../components/NavBar";
import { Box } from "@material-ui/core";

const defaultProps = {
  border: 2,
  borderColor: "grey.600",
  marginTop: "25%",
  justifyContent: "center",
  display: "flex",
  flexWrap: "nowrap",
};

export function FinalContainer() {
  return (
    <div>
      <NavBar back={true} text="Transaction Completed !" />
      <Box
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexWrap="nowrap"
        width="100%"
        height="500px"
      >
        <Box
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexWrap="nowrap"
          width="70%"
          height="100%"
          borderRadius={8}
          {...defaultProps}
        >
          Thank you for your purchase
        </Box>
      </Box>
    </div>
  );
}

export default FinalContainer;
