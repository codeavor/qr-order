import React from "react";
import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BottomButton from "../BottomButton";

describe("BottomButton", () => {
  const props = {
    text: "My Cart",
    price: 1.24,
    route: "/menu",
  };

  afterEach(() => {
    cleanup();
  });

  it("renders a <BottomButton/> component with expected props", () => {
    const { queryByTestId, getByText } = render(
      <MemoryRouter>
        <BottomButton {...props} />
      </MemoryRouter>
    );
    expect(queryByTestId(/cart-icon/i)).toBeTruthy();
    expect(getByText("My Cart")).toBeInTheDocument();
    expect(getByText("1,24€")).toBeInTheDocument();
  });

  it("renders a <BottomButton/> component without props", () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <BottomButton />
      </MemoryRouter>
    );

    expect(queryByTestId(/bottom-button-text/i)).toBeTruthy();
    expect(queryByTestId(/bottom-button-price/i)).toBeTruthy();
  });
});
