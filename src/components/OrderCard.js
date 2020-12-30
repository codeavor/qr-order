import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import C from "../constants";

import CheckoutItem from "./CheckoutItem";
import { Divider } from "@material-ui/core";
import { totalCartPrice } from "../utils/cart/cartUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginTop: "5em",
  },
  scrollableList: {
    maxHeight: "60vh",
    overflow: "auto",
  },
}));

export default function OrderCard({ order, changeStatus }) {
  const classes = useStyles();

  return (
    <Card variant="outlined" raised className={classes.root}>
      <CardHeader
        avatar={<Avatar aria-label="recipe">10</Avatar>}
        title="12:24:10 AM"
        subheader={
          totalCartPrice(order.cart).toFixed(2).replace(".", ",") + "€"
        }
        action={
          <Button
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
