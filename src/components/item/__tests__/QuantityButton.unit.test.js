import React from "react";
import { MemoryRouter } from "react-router-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import QuantityButton from "../QuantityButton";

describe("QuantityButton", () => {
  const mockSetQuantityNum = jest.fn();

  const props = {
    setQuantityNum: mockSetQuantityNum,
    quantityNum: 1,
  };

  afterEach(() => {
    cleanup();
  });

  it("renders a <QuantityButton/> component with expected props", () => {
    const { queryByTestId, getByText } = render(
      <MemoryRouter>
        <QuantityButton {...props} />
      </MemoryRouter>
    );

    expect(queryByTestId(/quantity-button-group/i)).toBeTruthy();
    expect(queryByTestId(/minus-quantity-button/i)).toBeTruthy();
    expect(queryByTestId(/quantity-value-button/i)).toBeTruthy();
    expect(queryByTestId(/plus-quantity-button/i)).toBeTruthy();
    expect(getByText("1")).toBeInTheDocument();

    fireEvent.click(queryByTestId(/minus-quantity-button/i));
    expect(mockSetQuantityNum).toBeCalled();

    fireEvent.click(queryByTestId(/plus-quantity-button/i));
    expect(mockSetQuantityNum).toBeCalled();
  });

  it("renders a <QuantityButton/> component without props", () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <QuantityButton />
      </MemoryRouter>
    );

    expect(queryByTestId(/quantity-button-group/i)).toBeTruthy();
    expect(queryByTestId(/minus-quantity-button/i)).toBeTruthy();
    expect(queryByTestId(/quantity-value-button/i)).toBeTruthy();
    expect(queryByTestId(/plus-quantity-button/i)).toBeTruthy();
  });
});
