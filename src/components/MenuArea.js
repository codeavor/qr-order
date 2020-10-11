import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import MenuItem from "./MenuItem";
import { makeStyles } from "@material-ui/core/styles";

MenuArea.propTypes = {
  menu: PropTypes.array,
};

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

export default function MenuArea({ menu }) {
  const classes = useStyles();

  return (
    <div>
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
