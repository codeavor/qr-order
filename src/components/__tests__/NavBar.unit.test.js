import React from "react";
import { cleanup, render } from "@testing-library/react";
import NavBar from "../NavBar";

describe("NavBar", () => {
  const props = {
    back: true,
    text: "Welcome",
    search: true,
  };

  afterEach(() => {
    cleanup();
  });

  it("renders a <NavBar/> component with expected props", () => {
    const { getByText, queryByTestId } = render(<NavBar {...props} />);

    expect(queryByTestId(/back-button/i)).toBeTruthy();
    expect(getByText("Welcome")).toBeInTheDocument();
    expect(queryByTestId(/search-button/i)).toBeTruthy();
  });

  it("renders a <NavBar/> component without props", () => {
    const { queryByTestId } = render(<NavBar />);

    expect(queryByTestId(/back-button/i)).toBeFalsy();
    expect(queryByTestId(/search-button/i)).toBeFalsy();
  });
});
