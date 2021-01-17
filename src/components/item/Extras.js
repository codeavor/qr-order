import React, { memo } from "react";

import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import CheckBox from "@material-ui/icons/CheckBox";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

import { combinedPriceId } from "../../utils/extra/extraUtils";

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

function Extra({ extra, controlComponent }) {
  let price = extra.price === null ? 0 : extra.price;
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
          value={combinedPriceId(price, extra.id)}
          control={controlComponent}
          label={extra.name}
        />
      </Box>
      <Box>
        <Typography>
          {parseFloat(price).toFixed(2).replace(".", ",")}€
        </Typography>
      </Box>
    </Box>
  );
}

const extrasAreEqual = (prevProps, nextProps) => {
  const isCheckboxAndCheckedAreEqual = (prevComponent, nextComponent) => {
    if (prevComponent.props.checked !== undefined)
      return prevComponent.props.checked === nextComponent.props.checked;
    else return true;
  };

  return (
    prevProps.extra.id === nextProps.extra.id &&
    isCheckboxAndCheckedAreEqual(
      prevProps.controlComponent,
      nextProps.controlComponent
    )
  );
};

export default memo(Extra, extrasAreEqual);
