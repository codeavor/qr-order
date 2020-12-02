import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { getItem } from "../actions/itemActions";
import { addItemToCart } from "../actions/cartActions";
import Error from "../components/Error";
import ItemArea from "../components/ItemArea";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import C from "../constants";

export function ItemContainer({ itemData, getItem, addItemToCart }) {
  const { id } = useParams();

  useEffect(() => {
    getItem(id);
  }, [getItem, id]);

  return itemData.loading ? (
    <Loading />
  ) : itemData.error ? (
    <Error error={itemData.error} />
  ) : (
    <div>
      <NavBar back={true} text={itemData.item.name} search={false} />
      <ItemArea
        initialValues={itemData.extraValues}
        item={itemData.item}
        orderId={window.localStorage.getItem(C.ORDER_ID)}
        addItemToCart={addItemToCart}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    itemData: state.item,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getItem: (id) => dispatch(getItem(id)),
    addItemToCart: (orderId, itemId, quantity, extrasId) =>
      dispatch(addItemToCart(orderId, itemId, quantity, extrasId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);
