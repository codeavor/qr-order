import React from "react";
import { cleanup, render } from "@testing-library/react";
import CheckoutItem from "../CheckoutItem";

describe("CheckoutItem", () => {
  const props = {
    item_name: "Espresso",
    extras: [
      {
        id: 2,
        name: "Καστανή Ζάχαρη",
        price: 1.0,
      },
      {
        id: 4,
        name: "Σαντιγύ",
        price: 0,
      },
    ],
    quantity: 2,
    price: "1",
    notes: "",
  };

  afterEach(cleanup);

  it("renders a <CheckoutItem/> component with expected props", () => {
    const { getByText } = render(<CheckoutItem {...props} />);

    expect(getByText("2x")).toBeInTheDocument();
    expect(getByText("Espresso")).toBeInTheDocument();
  });

  it("renders a <CheckoutItem/> component without props", () => {
    const { queryAllByTestId } = render(<CheckoutItem />);

    expect(queryAllByTestId(/checkout-item/i)).toBeTruthy();
  });
});
