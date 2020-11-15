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

export default function ExtraCategory({
  extra_category,
  handleChange,
  values,
  setFieldValue,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl} component="fieldset">
        <FormLabel>
          <Typography className={classes.categoryName}>
            {extra_category.name}
          </Typography>
        </FormLabel>
        {extra_category.type === "checkBox" ? (
          <FormGroup aria-label={extra_category.name}>
            {extra_category.extras.map((extra) => (
              <Extras
                extra={extra}
                controlComponent={
                  <Checkbox
                    checked={
                      values[extra.price * 100 + " " + extra.id] === undefined
                        ? false
                        : values[extra.price * 100 + " " + extra.id]
                    }
                    onChange={() =>
                      setFieldValue(
                        extra.price * 100 + " " + extra.id,
                        !values[extra.price * 100 + " " + extra.id]
                      )
                    }
                    id={extra_category.name}
                  />
                }
                key={extra.id}
              />
            ))}
          </FormGroup>
        ) : extra_category.type === "radioButton" ? (
          <RadioGroup
            name={extra_category.name}
            value={
              values[extra_category.name] === undefined
                ? ""
                : values[extra_category.name]
            }
          >
            {extra_category.extras.map((extra) => (
              <Extras
                extra={extra}
                controlComponent={<Radio onChange={handleChange} />}
                key={extra.id}
              />
            ))}
          </RadioGroup>
        ) : null}
      </FormControl>
    </div>
  );
}
