import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ItemBottomButtons from "../ItemBottomButtons";

describe("ItemBottomButtons", () => {
  const mockAddItemToCart = jest.fn();

  const props = {
    text: "My Cart",
    price: "1.24",
    route: "/menu",
    addItemToCart: mockAddItemToCart,
    itemId: 1,
    values: { "Επιλέξτε μέγεθος": "0 7", "Επιλέξτε ζάχαρη": "0 1" },
    notes: {
      current: {
        value: "random notes",
      },
    },
  };

  it("renders a <ItemBottomButtons/> component with expected props", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ItemBottomButtons {...props} />
      </MemoryRouter>
    );

    expect(getByTestId("quantity-button-group")).toBeTruthy();
    expect(getByTestId("bottom-button")).toBeTruthy();

    fireEvent.click(getByTestId("bottom-button"));
    expect(mockAddItemToCart).toBeCalled();
  });

  it("renders a <ItemBottomButtons/> component without props", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ItemBottomButtons />
      </MemoryRouter>
    );

    expect(getByTestId("quantity-button-group")).toBeTruthy();
    expect(getByTestId("bottom-button")).toBeTruthy();

    fireEvent.click(getByTestId("bottom-button"));
    expect(mockAddItemToCart).toBeCalled();
  });
});
