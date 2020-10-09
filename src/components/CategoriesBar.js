import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import { useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import MenuItem from "./MenuItem";

import TabPanel from "./TabPanel";

CategoriesBar.propTypes = {
  menu: PropTypes.object,
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
  },
}));

export default function CategoriesBar({ menu }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <AppBar position="sticky" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="on"
          aria-label="category-tabs"
        >
          {menu.map((category, index) => (
            <Tab
              className={classes.tabText}
              label={category.name}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {menu.map((category, index) => (
          <TabPanel value={value} index={index} dir={theme.direction}>
            {category.items.map((item) => (
              <MenuItem item={item} />
            ))}
          </TabPanel>
        ))}
      </SwipeableViews>
    </div>
  );
}
