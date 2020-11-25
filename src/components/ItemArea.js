import React from "react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import ExtraCategory from "./ExtraCategory";
import { Formik, Form } from "formik";
import BottomBox from "./BottomBox";
import C from "../constants";

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
  orderId: PropTypes.number,
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

  const checkIfSketos = (categoryName, values) => {
    if (Object.keys(values).length === 0 || values === undefined) return false;
    return (
      categoryName === C.EPILEKSTE_EIDOS_ZAXARHS &&
      values[C.EPILEKSTE_ZAXARH].split(" ")[1] === C.SKETOS_ID
    );
  };

  return (
    <Formik enableReinitialize={true} initialValues={initialValues}>
      {(props) => {
        const { values, handleChange, setFieldValue, setValues } = props;
        return (
          <Form>
            <div data-testid="item-area">
              <Container
                className={classes.section}
                id={`item-${item.id}`}
                key={item.id}
              >
                {item.extra_categories.map((extra_category) => (
                  <ExtraCategory
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    setValues={setValues}
                    extra_category={extra_category}
                    key={extra_category.id}
                    values={values}
                    disabled={checkIfSketos(extra_category.name, values)}
                  />
                ))}
              </Container>
            </div>
            <BottomBox
              text={"Add To Cart"}
              price={item.price}
              route={"/umbrella"}
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
