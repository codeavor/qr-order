import React from "react";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backButton: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: "1",
  },
}));

function BackToTopButton({ handleBackToTop }) {
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Zoom in={trigger}>
      <div
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

BackToTopButton.propTypes = {
  handleBackToTop: PropTypes.func,
};

export default BackToTopButton;
