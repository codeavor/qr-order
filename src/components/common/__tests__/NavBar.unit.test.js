import React from "react";
import { MemoryRouter } from "react-router-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import NavBar from "../NavBar";

describe("NavBar", () => {
  const props = {
    back: false,
    text: "Welcome",
  };

  afterEach(() => {
    cleanup();
  });

  it("renders a <NavBar/> component with expected props", () => {
    expect(true).toBeTruthy();
    const { getByText, queryByTestId } = render(
      <MemoryRouter>
        <NavBar {...props} />
      </MemoryRouter>
    );

    expect(queryByTestId(/back-button/i)).toBeFalsy();
    expect(getByText("Welcome")).toBeInTheDocument();
  });

  it("renders a <NavBar/> component without props", () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(queryByTestId(/back-button/i)).toBeTruthy();
    fireEvent.click(queryByTestId(/back-button/i));
  });
});
