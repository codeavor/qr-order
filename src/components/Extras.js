import React from "react";

import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    height: 20,
  },
  formControlLabel: {
    width: "100%",
  },
}));

Extra.propTypes = {
  extra: PropTypes.object,
};

Extra.defaultProps = {
  extra: {
    id: 1,
    name: "Coffee",
    price: 1,
  },
};

export default function Extra({ extra, controlComponent }) {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      bgcolor="background.paper"
      alignItems="center"
      boxShadow={3}
      mb={1.5}
      p={2}
      className={classes.root}
    >
      <Box className={classes.formControlLabel}>
        <FormControlLabel
          className={classes.formControlLabel}
          value={extra.price * 100 + " " + extra.id}
          control={controlComponent}
          label={extra.name}
        />
      </Box>
      <Box>
        {extra.price > 0 ? extra.price.replace(".", ",") + "0€" : "0,00€"}
      </Box>
    </Box>
  );
}
