import React, { useState, useEffect } from "react";

import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

import BottomButton from "../common/BottomButton";
import QuantityButton from "./QuantityButton";
import {
  fixExtras,
  getExtrasId,
  getExtrasPrice,
} from "../../utils/extra/extraUtils";
import C from "../../constants";

ItemBottomBox.propTypes = {
  text: PropTypes.string,
  price: PropTypes.string,
  route: PropTypes.string,
  addItemToCart: PropTypes.func,
  itemId: PropTypes.number,
  values: PropTypes.object,
  notes: PropTypes.any,
};

ItemBottomBox.defaultProps = {
  price: "0",
  route: "/",
  values: {},
};

const useStyles = makeStyles((theme) => ({
  quantityCounter: {
    position: "fixed",
    bottom: theme.spacing(0),
    zIndex: "1",
    width: "100%",
    height: 60,
  },
}));

export default function ItemBottomBox({
  text,
  price,
  route,
  addItemToCart,
  itemId,
  values,
  notes,
}) {
  const classes = useStyles();
  const orderId = window.localStorage.getItem(C.ORDER_ID);
  const [quantityNum, setQuantityNum] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);
  const [extrasId, setExtrasId] = useState([]);

  useEffect(() => {
    let tempExtras = fixExtras(values);
    setExtrasId(getExtrasId(tempExtras));
    setTotalPrice(getExtrasPrice(tempExtras, price, quantityNum));
  }, [values, price, quantityNum]);

  return (
    <Box
      className={classes.quantityCounter}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="background.paper"
      boxShadow={3}
      data-testid="bottom-box"
    >
      <React.Fragment>
        <Box pr={2}>
          <QuantityButton
            setQuantityNum={setQuantityNum}
            quantityNum={quantityNum}
          />
        </Box>
        <Box pl={2}>
          <BottomButton
            text={text}
            price={parseFloat(totalPrice)}
            route={route}
            onClick={() =>
              addItemToCart(
                orderId,
                itemId,
                quantityNum,
                extrasId,
                notes !== null ? notes.current.value : ""
              )
            }
          />
        </Box>
      </React.Fragment>
    </Box>
  );
}
