import React from "react";
import Box from "@material-ui/core/Box";
import QuantityButton from "../components/QuantityButton";
import PropTypes from "prop-types";
import BottomButton from "../components/BottomButton";
import { makeStyles } from "@material-ui/core/styles";
import {
  fixExtras,
  getExtrasId,
  getExtrasPrice,
} from "../utils/extra/extraUtils";

BottomBox.propTypes = {
  text: PropTypes.string,
  quantity: PropTypes.bool,
  price: PropTypes.string,
  route: PropTypes.string,
  addItemToCart: PropTypes.func,
  orderId: PropTypes.string,
  itemId: PropTypes.number,
  values: PropTypes.object,
  notes: PropTypes.string,
};

BottomBox.defaultProps = {
  quantity: false,
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

export default function BottomBox({
  text,
  quantity,
  price,
  route,
  addItemToCart,
  orderId,
  itemId,
  disable,
  values,
  completeOrder,
  notes,
}) {
  const classes = useStyles();
  const [quantityNum, setQuantityNum] = React.useState(1);
  const [totalPrice, setTotalPrice] = React.useState(price);
  const [extrasId, setExtrasId] = React.useState([]);

  React.useEffect(() => {
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
      {quantity ? (
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
                addItemToCart(orderId, itemId, quantityNum, extrasId, notes)
              }
            />
          </Box>
        </React.Fragment>
      ) : (
        <Box pl={0}>
          <BottomButton
            text={text}
            price={parseFloat(price)}
            route={route}
            disable={disable}
            onClick={() =>
              completeOrder !== undefined ? completeOrder(orderId) : null
            }
          />
        </Box>
      )}
    </Box>
  );
}
