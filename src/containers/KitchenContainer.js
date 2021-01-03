import React, { useEffect } from "react";

import { connect } from "react-redux";

import {
  changeStatus,
  createOrder,
  getOrders,
} from "../actions/kitchenActions";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import OrderArea from "../components/OrderArea";

export function KitchenContainer({
  kitchenData,
  getOrders,
  createOrder,
  changeStatus,
}) {
  const [statusFilter, setStatusFilter] = React.useState("sent");

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return kitchenData.loading ? (
    <Loading />
  ) : (
    <React.Fragment>
      <NavBar
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        page="kitchen"
        text="Kitchen"
        createOrder={createOrder}
      />
      <OrderArea
        statusFilter={statusFilter}
        orders={kitchenData.orders}
        changeStatus={changeStatus}
      />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    kitchenData: state.kitchen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: () => dispatch(getOrders()),
    createOrder: () => dispatch(createOrder()),
    changeStatus: (orderId, status) => dispatch(changeStatus(orderId, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KitchenContainer);
