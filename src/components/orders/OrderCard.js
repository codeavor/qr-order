import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

import CheckoutItem from "../checkout/CheckoutItem";
import { totalCartPrice } from "../../utils/cart/cartUtils";
import C from "../../constants";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "100%",
    marginTop: "5em",
  },
  scrollableList: {
    maxHeight: "60vh",
    overflow: "auto",
  },
}));

OrderCard.propTypes = {
  order: PropTypes.object,
  changeStatus: PropTypes.func,
};

OrderCard.defaultProps = {
  order: {
    cart: [{ id: 1, order_id: 1 }],
    order_complete: "sent",
    updated_at: "",
  },
  changeStatus: () => {},
};

export default function OrderCard({ order, changeStatus }) {
  const classes = useStyles();

  const fixTime = (time) => {
    // 2020-12-30T12:18:05.000000Z WRONG TIMEZONE
    if (time === "") return "";
    return time.split("T")[1].split(".")[0];
  };

  return (
    <Card
      data-testid="order-card"
      variant="outlined"
      raised
      className={classes.root}
    >
      <CardHeader
        avatar={<Avatar aria-label="recipe">{order.umbrella_id}</Avatar>}
        title={fixTime(order.updated_at)}
        subheader={
          totalCartPrice(order.cart).toFixed(2).replace(".", ",") + "€"
        }
        action={
          <Button
            data-testid="change-order-status"
            variant="contained"
            onClick={() =>
              changeStatus(
                order.cart[0].order_id,
                C.STATUS[C.STATUS.indexOf(order.order_complete) + 1]
              )
            }
            color="primary"
          >
            {order.order_complete}
          </Button>
        }
      />
      <Divider />
      <CardContent>
        <List className={classes.scrollableList}>
          {order.cart.map((cartItem) => (
            <CheckoutItem
              item_name={cartItem.item_name}
              notes={cartItem.notes}
              extras={cartItem.extras}
              quantity={cartItem.quantity}
              price={cartItem.price}
              key={cartItem.id}
            />
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
