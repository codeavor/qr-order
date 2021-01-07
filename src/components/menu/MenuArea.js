import React from "react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

import MenuItem from "./MenuItem";

const useStyles = makeStyles((theme) => ({
  categoryName: {
    textTransform: "capitalize",
  },
  section: {
    margin: "30px 0px",
  },
}));

MenuArea.propTypes = {
  menu: PropTypes.array,
};

MenuArea.defaultProps = {
  menu: [],
};

export default function MenuArea({ menu }) {
  const classes = useStyles();

  return (
    <Container data-testid="menu-area">
      {menu.map((category, index) => (
        <section
          className={classes.section}
          id={`menu-${category.id}`}
          key={category.id}
        >
          <Typography className={classes.categoryName} variant="h6">
            {category.name}
          </Typography>

          {category.items.map((item) => (
            <MenuItem item={item} key={item.id} />
          ))}
        </section>
      ))}
    </Container>
  );
}
