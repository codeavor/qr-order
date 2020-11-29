import React from "react";
import { cleanup, render } from "@testing-library/react";
import CheckoutPayment from "../CheckoutPayment";

describe("CheckoutPayment", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a CheckoutPayment component with expected props", () => {
    const { queryByTestId, getByText } = render(<CheckoutPayment />);

    expect(queryByTestId(/payment-options/i)).toBeTruthy();
    expect(getByText("Pay with Cash")).toBeInTheDocument();
    expect(getByText("Pay with Card")).toBeInTheDocument();
  });
});
