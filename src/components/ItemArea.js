import React from "react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import ExtraCategory from "./ExtraCategory";
import { Formik, Form } from "formik";
import BottomBox from "./BottomBox";

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
        const { values, handleChange, setFieldValue } = props;
        return (
          <Form>
            <div data-testid="item-area">
              <Container
                className={classes.section}
                id={`item-${item.id}`}
                key={item.id}
              >
                {item.extra_categories.map((extra_category) =>
                  extra_category.name === "Επιλέξτε είδος ζάχαρης" &&
                  values["Επιλέξτε ζάχαρη"] === "0 1" ? null : (
                    <ExtraCategory
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      extra_category={extra_category}
                      key={extra_category.id}
                      values={values}
                    />
                  )
                )}
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
