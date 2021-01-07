import React from "react";
import createShallow from "@material-ui/core/test-utils/createShallow";
import CartArea from "../CartArea";
import CartItem from "../CartItem";

describe("CartArea", () => {
  const mockDeleteOrderItem = jest.fn();
  const mockChangeQuantity = jest.fn();
  const fixedCart = [
    {
      id: 57,
      order_id: 1,
      item_id: 1,
      quantity: 2,
      item_name: "Espresso",
      price: "1",
      description: "random text",
      notes: "extra notes",
      extras: [
        {
          id: 1,
          name: "Γλυκός",
          price: "1.0",
        },
        {
          id: 2,
          name: "Καστανή Ζάχαρη",
          price: "0",
        },
        {
          id: 3,
          name: "Σιρόπι φράουλα",
          price: "0.2",
        },
        {
          id: 4,
          name: "Σαντιγύ",
          price: "0.3",
        },
      ],
    },
    {
      id: 58,
      order_id: 1,
      item_id: 1,
      quantity: 3,
      item_name: "Espresso",
      price: "1.80",
      description: "random text",
      notes: "extra notes",
      extras: [
        {
          id: 2,
          name: "Καστανή Ζάχαρη",
          price: "0",
        },
        {
          id: 4,
          name: "Σαντιγύ",
          price: "0.1",
        },
      ],
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
