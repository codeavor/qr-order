import React from "react";
import { createShallow } from "@material-ui/core/test-utils";
import CartArea from "../CartArea";
import CartItem from "../CartItem";

describe("CartArea", () => {
  const mockDeleteOrderItem = jest.fn();
  const mockChangeQuantity = jest.fn();
  const fixedCart = [
    {
      order_item_id: 57,
      quantity: 2,
      extras: ["Γλυκός", "Καστανή Ζάχαρη"],
      extra_price: [1.0, 0],
      name: "Espresso",
      price: "1",
    },
    {
      order_item_id: 58,
      quantity: 3,
      extras: ["Καστανή Ζάχαρη"],
      extra_price: [0],
      name: "Espresso",
      price: "1.80",
    },
  ];

  const props = {
    cart: fixedCart,
    deleteOrderItem: mockDeleteOrderItem,
    changeQuantity: mockChangeQuantity,
  };

  let shallow;

  beforeEach(() => {
    shallow = createShallow({ untilSelector: CartItem });
  });

  it("renders a <CartArea/> component with expected props", () => {
    const wrapper = shallow(<CartArea {...props} />);

    const CartItems = wrapper.find(CartItem);
    expect(CartItems).toHaveLength(fixedCart.length);
  });

  it("renders a <CartArea/> component without props", () => {
    const wrapper = shallow(<CartArea />);

    const CartItems = wrapper.find(CartItem);
    expect(CartItems).toHaveLength(0);
  });
});
