import React from "react";
import { MemoryRouter } from "react-router-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import KitchenNavBar from "../KitchenNavBar";

describe("KitchenNavBar", () => {
  window.localStorage.__proto__.getItem = jest.fn((x) => "12345");
  const mockedSetStatusFilter = jest.fn();
  const mockedCreateOrder = jest.fn();
  const props = {
    statusFilter: "sent",
    setStatusFilter: mockedSetStatusFilter,
    text: "Kitchen",
    createOrder: mockedCreateOrder,
  };

  afterEach(() => {
    cleanup();
  });

  it("renders a <KitchenNavBar/> component with expected props", () => {
    const { getByText, queryByTestId } = render(
      <MemoryRouter>
        <KitchenNavBar {...props} />
      </MemoryRouter>
    );

    expect(queryByTestId(/status-button/i)).toBeTruthy();
    expect(queryByTestId(/take-away-button/i)).toBeTruthy();
    expect(getByText("Kitchen")).toBeInTheDocument();

    fireEvent.click(queryByTestId(/status-button/i));
    expect(mockedSetStatusFilter).toBeCalled();

    fireEvent.click(queryByTestId(/take-away-button/i));
    expect(mockedCreateOrder).toBeCalled();
  });

  it("renders a <KitchenNavBar/> component without props", () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <KitchenNavBar />
      </MemoryRouter>
    );

    fireEvent.click(queryByTestId(/status-button/i));
    fireEvent.click(queryByTestId(/take-away-button/i));
  });
});
