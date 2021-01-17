import React, { useRef, useState } from "react";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";

import ExtraCategory from "./ExtraCategory";
import QuantityButton from "./QuantityButton";
import BottomBox from "../common/BottomBox";
import BottomButton from "../common/BottomButton";
import C from "../../constants";
import {
  checkIfSketos,
  disableSugars,
  getExtrasPrice,
} from "../../utils/extra/extraUtils";

const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: "120px",
  },
  textField: {
    margin: "20px 0 20px 0",
    maxWidth: 390,
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
  const [quantityNum, setQuantityNum] = useState(1);
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
                    extra_category={extra_category}
                    disabled={
                      checkIfSketos(extra_category.name, values) &&
                      disableSugars(values, setValues)
                    }
                    key={extra_category.id}
                  />
                ))}
                <TextField
                  name={"notes"}
                  className={classes.textField}
                  variant="outlined"
                  multiline
                  placeholder="Ειδικές Οδηγίες:"
                  rows={2}
                  fullWidth={true}
                  inputRef={notesRef}
                />
              </Container>
            </Box>
            <BottomBox>
              <QuantityButton
                setQuantityNum={setQuantityNum}
                quantityNum={quantityNum}
              />
              <BottomButton
                text={"Add To Cart"}
                price={parseFloat(
                  getExtrasPrice(values, item.price, quantityNum)
                )}
                route={C.MENU_PATH}
                onClick={() =>
                  addItemToCart(
                    item.id,
                    quantityNum,
                    values,
                    notesRef !== null ? notesRef.current.value : ""
                  )
                }
              />
            </BottomBox>
          </Form>
        );
      }}
    </Formik>
  );
}
