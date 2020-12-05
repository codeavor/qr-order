import React from "react";
import { cleanup, render } from "@testing-library/react";
import CheckoutItem from "../CheckoutItem";

describe("CheckoutItem", () => {
  const props = {
    name: "Espresso",
    extras: ["Γλυκός", "Καστανή Ζάχαρη"],
    extraPrice: [1.0, 0],
    quantity: 2,
    price: "1",
  };

  afterEach(cleanup);

  it("renders a <CheckoutItem/> component with expected props", () => {
    const { getByText } = render(<CheckoutItem {...props} />);

    expect(getByText("2x")).toBeInTheDocument();
    expect(getByText("Espresso")).toBeInTheDocument();
  });

  it("renders a <CheckoutItem/> component without props", () => {
    const { queryAllByTestId } = render(<CheckoutItem />);

    expect(queryAllByTestId(/cart-item/i)).toBeTruthy();
  });
});
