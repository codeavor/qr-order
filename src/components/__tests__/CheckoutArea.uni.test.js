import React from "react";
import { createShallow } from "@material-ui/core/test-utils";
import CheckoutArea from "../CheckoutArea";
import CheckoutItem from "../CheckoutItem";

describe("CheckoutArea", () => {
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
  };

  let shallow;

  beforeEach(() => {
    shallow = createShallow({ untilSelector: CheckoutItem });
  });

  it("renders a <CheckoutArea/> component with expected props", () => {
    const wrapper = shallow(<CheckoutArea {...props} />);

    const CheckoutItems = wrapper.find(CheckoutItem);
    expect(CheckoutItems).toHaveLength(fixedCart.length);
  });

  it("renders a <CheckoutArea/> component without props", () => {
    const wrapper = shallow(<CheckoutArea />);

    const CheckoutItems = wrapper.find(CheckoutItem);
    expect(CheckoutItems).toHaveLength(0);
  });
});
