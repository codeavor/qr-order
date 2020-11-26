import React from "react";
import { MemoryRouter } from "react-router-dom";
import BottomBox from "../BottomBox";
import { createShallow } from "@material-ui/core/test-utils";
import QuantityButton from "../QuantityButton";
import BottomButton from "../BottomButton";
import { fireEvent, render } from "@testing-library/react";

describe("BottomBox", () => {
  const mockAddItemToCart = jest.fn();

  const props = {
    text: "My Cart",
    price: "1.24",
    route: "/umbrella",
    quantity: true,
    addItemToCart: mockAddItemToCart,
    orderId: 1,
    itemId: 1,
    values: { "Επιλέξτε μέγεθος": "0 7", "Επιλέξτε ζάχαρη": "0 1" },
  };

  let shallow;

  beforeEach(() => {
    shallow = createShallow({
      untilSelector: QuantityButton,
    });
  });

  it("renders a <BottomBox/> component with expected props", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <BottomBox {...props} />
      </MemoryRouter>
    );

    expect(getByTestId("quantity-button-group")).toBeTruthy();
    expect(getByTestId("bottom-button")).toBeTruthy();

    fireEvent.click(getByTestId("bottom-button"));
    expect(mockAddItemToCart).toBeCalled();
  });

  it("renders a <BottomBox/> component without props", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <BottomBox />
      </MemoryRouter>
    );

    const QuantityButtons = wrapper.find(QuantityButton);
    expect(QuantityButtons).toHaveLength(0);
    const BottomButtons = wrapper.find(BottomButton);
    expect(BottomButtons).toHaveLength(1);
  });
});
