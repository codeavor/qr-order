import React from "react";
import createShallow from "@material-ui/core/test-utils/createShallow";
import CheckoutArea from "../CheckoutArea";
import CheckoutItem from "../CheckoutItem";

describe("CheckoutArea", () => {
  const cart = [
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
    cart: cart,
  };

  let shallow;

  beforeEach(() => {
    shallow = createShallow({ untilSelector: CheckoutItem });
  });

  it("renders a <CheckoutArea/> component with expected props", () => {
    const wrapper = shallow(<CheckoutArea {...props} />);

    const CheckoutItems = wrapper.find(CheckoutItem);
    expect(CheckoutItems).toHaveLength(cart.length);
  });

  it("renders a <CheckoutArea/> component without props", () => {
    const wrapper = shallow(<CheckoutArea />);

    const CheckoutItems = wrapper.find(CheckoutItem);
    expect(CheckoutItems).toHaveLength(0);
  });
});
