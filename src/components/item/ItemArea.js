import React, { useRef, useEffect } from "react";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";

import ExtraCategory from "./ExtraCategory";
import ItemBottomButtons from "./ItemBottomButtons";
import BottomBox from "../common/BottomBox";
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

let renderCount = 0;

export default function ItemArea({ item, initialValues, addItemToCart }) {
  renderCount++;
  const methods = useForm({
    defaultValues: initialValues,
  });
  const { reset, watch, setValue } = methods;
  const notesRef = useRef();
  const classes = useStyles();

  useEffect(() => {
    if (Object.keys(initialValues).length !== 0) {
      reset(initialValues);
    }
  }, [reset, initialValues]);

  return (
    <FormProvider {...methods}>
      <span className="counter">Render Count: {renderCount}</span>
      <form>
        <Box mt={5} pt={5}>
          <Container className={classes.section} data-testid="item-area">
            {item.extra_categories.map((extra_category) => (
              <ExtraCategory
                extra_category={extra_category}
                disabled={
                  checkIfSketos(extra_category.name, watch()) &&
                  disableSugars(watch(), setValue)
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
              rows={3}
              fullWidth={true}
              inputRef={notesRef}
            />
          </Container>
        </Box>
        <BottomBox>
          <ItemBottomButtons
            text={"Add To Cart"}
            price={item.price}
            route={C.MENU_PATH}
            addItemToCart={addItemToCart}
            itemId={item.id}
            notes={notesRef}
          />
        </BottomBox>
      </form>
    </FormProvider>
  );
}
