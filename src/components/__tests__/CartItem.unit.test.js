import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import CartItem from "../CartItem";

describe("CartItem", () => {
  const mockDeleteOrderItem = jest.fn();
  const mockChangeQuantity = jest.fn();

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
    notes: "",
    quantity: 2,
    price: "1",
    id: 57,
    deleteOrderItem: mockDeleteOrderItem,
    changeQuantity: mockChangeQuantity,
  };

  afterEach(cleanup);

  it("renders a <CartItem/> component with expected props", () => {
    const { getByText, queryByTestId } = render(<CartItem {...props} />);

    expect(getByText("Espresso")).toBeInTheDocument();

    fireEvent.click(queryByTestId(/increase-quantity/i));
    expect(mockChangeQuantity).toBeCalled();

    fireEvent.click(queryByTestId(/decrease-quantity/i));
    expect(mockChangeQuantity).toBeCalled();

    fireEvent.click(queryByTestId(/delete-item/i));
    expect(mockDeleteOrderItem).toBeCalled();
  });

  it("renders a <CartItem/> component without props", () => {
    const { queryAllByTestId, queryByTestId } = render(<CartItem />);

    fireEvent.click(queryByTestId(/increase-quantity/i));
    fireEvent.click(queryByTestId(/delete-item/i));
    expect(queryAllByTestId(/cart-item/i)).toBeTruthy();
  });
});
