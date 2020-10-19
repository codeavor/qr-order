import React from "react";

import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { makeStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  backButton: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: "1",
  },
}));

BackToTopButton.propTypes = {
  handleBackToTop: PropTypes.func,
};

BackToTopButton.defaultProps = {
  handleBackToTop: () => {},
};

export default function BackToTopButton({ handleBackToTop }) {
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Zoom in={trigger}>
      <div
        data-testid="back-to-top-button"
        onClick={handleBackToTop}
        role="presentation"
        className={classes.backButton}
      >
        <Fab color="primary" size="small" aria-label="scroll-back-to-top">
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </Zoom>
  );
}
