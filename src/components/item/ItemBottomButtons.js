import React, { useState, useEffect } from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import BottomButton from "../common/BottomButton";
import QuantityButton from "./QuantityButton";
import {
  fixExtras,
  getExtrasId,
  getExtrasPrice,
} from "../../utils/extra/extraUtils";
import C from "../../constants";

ItemBottomButtons.propTypes = {
  text: PropTypes.string,
  price: PropTypes.string,
  route: PropTypes.string,
  addItemToCart: PropTypes.func,
  itemId: PropTypes.number,
  values: PropTypes.object,
  notes: PropTypes.any,
};

ItemBottomButtons.defaultProps = {
  price: "0",
  route: "/",
  values: {},
  addItemToCart: () => {},
  notes: null,
};

export default function ItemBottomButtons({
  text,
  price,
  route,
  addItemToCart,
  itemId,
  values,
  notes,
}) {
  const [quantityNum, setQuantityNum] = useState(1);

  return (
    <React.Fragment>
      <QuantityButton
        setQuantityNum={setQuantityNum}
        quantityNum={quantityNum}
      />
      <BottomButton
        text={text}
        price={parseFloat(getExtrasPrice(values, price, quantityNum))}
        route={route}
        onClick={() =>
          addItemToCart(
            itemId,
            quantityNum,
            values,
            notes !== null ? notes.current.value : ""
          )
        }
      />
    </React.Fragment>
  );
}
