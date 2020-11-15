import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { getItem } from "../actions/itemActions";
import { addItemToCart } from "../actions/cartActions";
import Error from "../components/Error";
import ItemArea from "../components/ItemArea";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";

export function ItemContainer({ itemData, getItem, userData, addItemToCart }) {
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
        orderId={userData.orderId}
        addItemToCart={addItemToCart}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    itemData: state.item,
    userData: state.user,
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
