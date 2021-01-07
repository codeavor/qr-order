import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { addItemToCart } from "../actions/cartActions";
import { getItem } from "../actions/itemActions";
import Loading from "../components/common/Loading";
import NavBar from "../components/common/NavBar";
import ItemArea from "../components/item/ItemArea";
import C from "../constants";

export function ItemContainer({ itemData, getItem, addItemToCart }) {
  const { id } = useParams();

  useEffect(() => {
    getItem(id);
  }, [getItem, id]);

  return itemData.loading ? (
    <Loading />
  ) : (
    <React.Fragment>
      <NavBar back={true} text={itemData.item.name} />
      <ItemArea
        initialValues={itemData.extraValues}
        item={itemData.item}
        addItemToCart={addItemToCart}
      />
    </React.Fragment>
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
    addItemToCart: (orderId, itemId, quantity, extrasId, notes) =>
      dispatch(addItemToCart(orderId, itemId, quantity, extrasId, notes)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);
