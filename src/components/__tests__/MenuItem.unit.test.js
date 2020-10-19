import React from "react";
import { MemoryRouter } from "react-router-dom";
import { cleanup, render } from "@testing-library/react";
import MenuItem from "../MenuItem";

describe("MenuItem", () => {
  const props = {
    item: {
      id: 1,
      name: "Coffee",
      price: 2.13,
    },
  };

  afterEach(() => {
    cleanup();
  });

  it("renders a <MenuItem/> component with expected props", () => {
    const { getByText } = render(
      <MemoryRouter>
        <MenuItem {...props} />
      </MemoryRouter>
    );

    expect(getByText("Coffee")).toBeInTheDocument();
    expect(getByText("2.13 €")).toBeInTheDocument();
  });

  it("renders a <MenuItem/> component without props", () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <MenuItem />
      </MemoryRouter>
    );

    expect(queryByTestId(/menu-item/i)).toBeTruthy();
  });

  // TODO: add test case for clicking Button and redirecting
});
