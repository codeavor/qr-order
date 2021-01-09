import React from "react";

import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import PropTypes from "prop-types";
import * as Scroll from "react-scroll";
let scroll = Scroll.animateScroll;

const useStyles = makeStyles((theme) => ({
  backButton: {
    position: "fixed",
    bottom: theme.spacing(1.5),
    right: theme.spacing(2),
    zIndex: "2",
  },
}));

BackToTopButton.propTypes = {
  handleBackToTop: PropTypes.func,
};

BackToTopButton.defaultProps = {
  handleBackToTop: () => scroll.scrollToTop(),
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
        <Fab
          color="primary"
          size="small"
          aria-label="scroll-back-to-top"
          disableFocusRipple={true}
          disableRipple={true}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </Zoom>
  );
}
