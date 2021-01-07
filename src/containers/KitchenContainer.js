import React, { useEffect } from "react";

import { connect } from "react-redux";

import { changeStatus, createOrder, getOrders } from "../actions/ordersActions";
import Loading from "../components/common/Loading";
import KitchenNavBar from "../components/orders/KitchenNavBar";
import OrderArea from "../components/orders/OrderArea";

export function KitchenContainer({
  ordersData,
  getOrders,
  createOrder,
  changeStatus,
}) {
  const [statusFilter, setStatusFilter] = React.useState("sent");

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return ordersData.loading ? (
    <Loading />
  ) : (
    <React.Fragment>
      <KitchenNavBar
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        text="Kitchen"
        createOrder={createOrder}
      />
      <OrderArea
        statusFilter={statusFilter}
        orders={ordersData.orders}
        changeStatus={changeStatus}
      />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    ordersData: state.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: () => dispatch(getOrders()),
    createOrder: (userId) => dispatch(createOrder(userId)),
    changeStatus: (orderId, status) => dispatch(changeStatus(orderId, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KitchenContainer);
