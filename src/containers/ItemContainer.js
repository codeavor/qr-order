import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { getItem } from "../actions/itemActions";
import Error from "../components/Error";
import ItemArea from "../components/ItemArea";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import BottomBox from "../components/BottomBox";

export function ItemContainer({ itemData, getItem }) {
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
      <ItemArea item={itemData.item} />
      <BottomBox text={"Add To Cart"} quantity={true} />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);
