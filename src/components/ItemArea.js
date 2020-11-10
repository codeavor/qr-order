import React from "react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import ExtraCategory from "./ExtraCategory";

const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: "60px",
  },
  backButton: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

ItemArea.propTypes = {
  item: PropTypes.object,
};

ItemArea.defaultProps = {
  item: [],
};

export default function ItemArea({ item }) {
  const classes = useStyles();

  return (
    <div data-testid="item-area">
      <Container
        className={classes.section}
        id={`item-${item.id}`}
        key={item.id}
      >
        {item.extra_categories.map((extra_category) => (
          <ExtraCategory
            extra_category={extra_category}
            key={extra_category.id}
          />
        ))}
      </Container>
    </div>
  );
}
