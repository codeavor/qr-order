import {
  fixCart,
  totalItemPrice,
  totalCartPrice,
  showExtras,
} from "../cartUtils";

describe("cartUtils", () => {
  const cart = [
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
  ];

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

  it("fixCart works correctly", () => {
    expect(fixCart(cart)).toEqual(fixedCart);
    expect(fixCart([])).toEqual([]);
  });

  it("totalItemPrice works correctly", () => {
    const item = fixedCart[1];
    expect(totalItemPrice(item.price, item.extras, item.quantity)).toEqual(5.7);
    expect(totalItemPrice()).toEqual(0);
  });

  it("totalCartPrice works correctly", () => {
    expect(totalCartPrice(fixedCart)).toEqual(10.7);
    expect(totalCartPrice([])).toEqual(0);
  });

  it("showExtras works correctly", () => {
    expect(showExtras(fixedCart[1].extras, fixedCart[1].notes)).toEqual(
      "Καστανή Ζάχαρη, Σαντιγύ, extra notes"
    );
    expect(showExtras(fixedCart[1].extras, null)).toEqual(
      "Καστανή Ζάχαρη, Σαντιγύ"
    );
    expect(showExtras(fixedCart[1].extras, "")).toEqual(
      "Καστανή Ζάχαρη, Σαντιγύ"
    );
  });
});
