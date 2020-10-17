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
    marginBottom: "30px",
  },
  backButton: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
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
    <div data-testid="menu-area">
      {menu.map((category, index) => (
        <Container
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
        </Container>
      ))}
    </div>
  );
}
