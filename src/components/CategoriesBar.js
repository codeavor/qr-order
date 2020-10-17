import React from "react";

import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import { Link } from "react-scroll";
import * as Scroll from "react-scroll";

import BackToTopButton from "./BackToTopButton";

const useStyles = makeStyles((theme) => ({
  tabText: {
    textTransform: "capitalize",
    textDecoration: "none",
  },
  appBar: {
    position: "sticky",
    willChange: "transform",
  },
}));

CategoriesBar.propTypes = {
  menu: PropTypes.array,
};

CategoriesBar.defaultProps = {
  menu: [],
};

export default function CategoriesBar({ menu }) {
  const classes = useStyles();
  let scroll = Scroll.animateScroll;
  const [value, setValue] = React.useState(0);

  const handleBackToTop = () => {
    scroll.scrollToTop();
    setValue(0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="sticky" color="default" className={classes.appBar}>
        <Tabs
          data-testid="categories-bar"
          position="sticky"
          selectionFollowsFocus={true}
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          aria-label="category-tabs"
        >
          {menu.map((category, index) => (
            <Tab
              data-testid={`tab-${index}`}
              className={classes.tabText}
              label={category.name}
              key={category.id}
              component={Link}
              to={`menu-${category.id}`}
              smooth={true}
              offset={-50}
              id={`tab-${index}`}
            />
          ))}
        </Tabs>
      </AppBar>
      <BackToTopButton handleBackToTop={handleBackToTop} />
    </>
  );
}
