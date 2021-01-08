import React from "react";
import { MemoryRouter } from "react-router-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import MenuNavBar from "../MenuNavBar";

describe("MenuNavBar", () => {
  window.localStorage.__proto__.getItem = jest.fn((x) => "12345");
  const mockedRemoveOrder = jest.fn();
  const props = {
    text: "Welcome",
    removeOrder: mockedRemoveOrder,
  };

  afterEach(() => {
    cleanup();
  });

  it("renders a <MenuNavBar/> component with expected props", () => {
    const { getByText, queryByTestId } = render(
      <MemoryRouter>
        <MenuNavBar {...props} />
      </MemoryRouter>
    );

    expect(queryByTestId(/back-button/i)).toBeTruthy();
    expect(getByText("Welcome")).toBeInTheDocument();
  });

  it("renders a <MenuNavBar/> component without props", () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <MenuNavBar />
      </MemoryRouter>
    );

    expect(queryByTestId(/back-button/i)).toBeTruthy();
    fireEvent.click(queryByTestId(/back-button/i));
  });
});
