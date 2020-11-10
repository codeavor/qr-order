import React from "react";

import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Extras from "./Extras";

const useStyles = makeStyles((theme) => ({
  categoryName: {
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: 16,
  },
  formControl: {
    width: "100%",
    marginTop: 10,
  },
}));

ExtraCategory.propTypes = {
  extra_category: PropTypes.object,
};

ExtraCategory.defaultProps = {
  extra_category: {
    id: 1,
    name: "Επιλέξτε μέγεθος",
    type: "radioButton",
  },
};

export default function ExtraCategory({ extra_category }) {
  const classes = useStyles();

  const ExtraItem = ({ extra_category, controlComponent }) => {
    return (
      <>
        {extra_category.extras.map((extra) => (
          <Extras
            extra={extra}
            controlComponent={controlComponent}
            key={extra.id}
          />
        ))}
      </>
    );
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl} component="fieldset">
        <FormLabel>
          <Typography className={classes.categoryName}>
            {extra_category.name}
          </Typography>
        </FormLabel>
        {extra_category.type === "checkBox" ? (
          <FormGroup
            aria-label={extra_category.name}
            name={extra_category.name}
          >
            <ExtraItem
              extra_category={extra_category}
              controlComponent={<Checkbox />}
            />
          </FormGroup>
        ) : extra_category.type === "radioButton" ? (
          <RadioGroup
            aria-label={extra_category.name}
            name={extra_category.name}
          >
            <ExtraItem
              extra_category={extra_category}
              controlComponent={<Radio />}
            />
          </RadioGroup>
        ) : null}
      </FormControl>
    </div>
  );
}
