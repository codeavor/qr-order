import React from "react";

import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { combinedPriceId } from "../utils/extra/extraUtils";
import { CheckBox } from "@material-ui/icons";

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
  controlComponent: PropTypes.element,
};

Extra.defaultProps = {
  extra: {
    id: 1,
    name: "Coffee",
    price: "0.4",
  },
  controlComponent: <CheckBox />,
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
      data-testid="extra"
    >
      <Box className={classes.formControlLabel}>
        <FormControlLabel
          className={classes.formControlLabel}
          value={combinedPriceId(extra.price, extra.id)}
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
