import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import { Link } from "react-scroll";
import * as Scroll from "react-scroll";
import BackToTopButton from "./BackToTopButton";

CategoriesBar.propTypes = {
  menu: PropTypes.array,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

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
          position="sticky"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          aria-label="category-tabs"
        >
          {menu.map((category, index) => (
            <Tab
              className={classes.tabText}
              label={category.name}
              key={category.id}
              component={Link}
              to={`menu-${category.id}`}
              smooth={true}
              offset={-50}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>
      <BackToTopButton handleBackToTop={handleBackToTop} />
    </>
  );
}
