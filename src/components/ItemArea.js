import React from "react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import ExtraCategory from "./ExtraCategory";
import { Formik, Form } from "formik";
import BottomBox from "./BottomBox";
import C from "../constants";
import { checkIfSketos, disableSugars } from "../utils/extra/extraUtils";

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
  initialValues: PropTypes.object,
  addItemToCart: PropTypes.func,
  orderId: PropTypes.string,
};

ItemArea.defaultProps = {
  item: { extra_categories: [] },
  initialValues: {},
};

export default function ItemArea({
  item,
  initialValues,
  addItemToCart,
  orderId,
}) {
  const classes = useStyles();
  return (
    <Formik enableReinitialize={true} initialValues={initialValues}>
      {(props) => {
        const { values, handleChange, setFieldValue, setValues } = props;
        return (
          <Form>
            <Container className={classes.section} data-testid="item-area">
              {item.extra_categories.map((extra_category) => (
                <ExtraCategory
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
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
            </Container>
            <BottomBox
              text={"Add To Cart"}
              price={item.price}
              route={C.MENU_PATH}
              quantity={true}
              addItemToCart={addItemToCart}
              orderId={orderId}
              itemId={item.id}
              values={values}
            />
          </Form>
        );
      }}
    </Formik>
  );
}
