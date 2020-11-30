import { fixCart, totalItemPrice, totalCartPrice } from "../cartUtils";

describe("cartUtils", () => {
  const cart = [
    {
      order_item_id: 57,
      quantity: 2,
      extras: "Γλυκός",
      extra_price: "1.0",
      name: "Espresso",
      price: "1",
    },
    {
      order_item_id: 57,
      quantity: 2,
      extras: "Καστανή Ζάχαρη",
      extra_price: null,
      name: "Espresso",
      price: "1",
    },
    {
      order_item_id: 57,
      quantity: 2,
      extras: "Σιρόπι φράουλα",
      extra_price: "0.2",
      name: "Espresso",
      price: "1",
    },
    {
      order_item_id: 57,
      quantity: 2,
      extras: "Σαντιγύ",
      extra_price: "0.3",
      name: "Espresso",
      price: "1",
    },
    {
      order_item_id: 58,
      quantity: 3,
      extras: "Καστανή Ζάχαρη",
      extra_price: null,
      name: "Espresso",
      price: "1.80",
    },
    {
      order_item_id: 58,
      quantity: 3,
      extras: "Σαντιγύ",
      extra_price: "0.1",
      name: "Espresso",
      price: "1.80",
    },
  ];

  const fixedCart = [
    {
      order_item_id: 57,
      quantity: 2,
      extras: ["Γλυκός", "Καστανή Ζάχαρη", "Σιρόπι φράουλα", "Σαντιγύ"],
      extra_price: ["1.0", 0, "0.2", "0.3"],
      name: "Espresso",
      price: "1",
    },
    {
      order_item_id: 58,
      quantity: 3,
      extras: ["Καστανή Ζάχαρη", "Σαντιγύ"],
      extra_price: [0, "0.1"],
      name: "Espresso",
      price: "1.80",
    },
  ];

  it("fixCart works correctly", () => {
    expect(fixCart(cart)).toEqual(fixedCart);
    expect(fixCart([])).toEqual([]);
  });

  it("totalItemPrice works correctly", () => {
    const item = fixedCart[1];
    expect(totalItemPrice(item.price, item.extra_price, item.quantity)).toEqual(
      5.7
    );
    expect(totalItemPrice()).toEqual(0);
  });

  it("totalCartPrice works correctly", () => {
    expect(totalCartPrice(fixedCart)).toEqual(10.7);
    expect(totalCartPrice([])).toEqual(0);
  });
});
