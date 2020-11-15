import React from "react";
import Box from "@material-ui/core/Box";
import QuantityButton from "../components/QuantityButton";
import BottomButton from "../components/BottomButton";
import { makeStyles } from "@material-ui/core/styles";
import {
  fixExtras,
  getExtrasId,
  getExtrasPrice,
} from "../utils/extra/extraUtils";

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
  values,
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
    >
      {quantity ? (
        <>
          <Box pr={2}>
            <QuantityButton
              setQuantityNum={setQuantityNum}
              quantityNum={quantityNum}
            />
          </Box>
          <Box pl={2}>
            <BottomButton
              onClick={() =>
                addItemToCart(orderId, itemId, quantityNum, extrasId)
              }
              text={text}
              price={parseFloat(totalPrice)}
              route={route}
            />
          </Box>
        </>
      ) : (
        <Box pl={0}>
          <BottomButton text={text} price={price} route={route} />
        </Box>
      )}
    </Box>
  );
}
