import React from "react";
import { cleanup, render } from "@testing-library/react";
import BottomButton from "../BottomButton";

describe("BottomButton", () => {
  const props = {
    icon: true,
    text: "My Cart",
    price: 1.24,
  };

  afterEach(() => {
    cleanup();
  });

  it("renders a <BottomButton/> component with expected props", () => {
    const { queryByTestId, getByText } = render(<BottomButton {...props} />);
    expect(queryByTestId(/cart-icon/i)).toBeTruthy();
    expect(getByText("My Cart 1.24€")).toBeInTheDocument();
  });

  it("renders a <BottomButton/> component without props", () => {
    const { queryByTestId } = render(<BottomButton />);

    expect(queryByTestId(/bottom-button/i)).toBeTruthy();
  });
});
