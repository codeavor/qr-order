import React, { useRef } from "react";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";

import ExtraCategory from "./ExtraCategory";
import ItemBottomBox from "./ItemBottomBox";
import C from "../../constants";
import { checkIfSketos, disableSugars } from "../../utils/extra/extraUtils";

const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: "60px",
  },
  backButton: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  textField: {
    margin: "20px 0 20px 0",
  },
}));

ItemArea.propTypes = {
  item: PropTypes.object,
  initialValues: PropTypes.object,
  addItemToCart: PropTypes.func,
};

ItemArea.defaultProps = {
  item: { extra_categories: [] },
  initialValues: {},
  addItemToCart: () => {},
};

export default function ItemArea({ item, initialValues, addItemToCart }) {
  const notesRef = useRef();
  const classes = useStyles();

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {(props) => {
        const { values, setValues } = props;
        return (
          <Form>
            <Box mt={5} pt={5}>
              <Container className={classes.section} data-testid="item-area">
                {item.extra_categories.map((extra_category) => (
                  <ExtraCategory
                    setValues={setValues}
                    extra_category={extra_category}
                    key={extra_category.id}
                    values={values}
                    disabled={
                      checkIfSketos(extra_category.name, values) &&
                      disableSugars(values, setValues)
                    }
                  />
                ))}
                <TextField
                  name={"notes"}
                  className={classes.textField}
                  variant="outlined"
                  multiline
                  placeholder="Ειδικές Οδηγίες:"
                  rows={3}
                  fullWidth={true}
                  inputRef={notesRef}
                />
              </Container>
            </Box>
            <ItemBottomBox
              text={"Add To Cart"}
              price={item.price}
              route={C.MENU_PATH}
              addItemToCart={addItemToCart}
              itemId={item.id}
              values={values}
              notes={notesRef}
            />
          </Form>
        );
      }}
    </Formik>
  );
}
