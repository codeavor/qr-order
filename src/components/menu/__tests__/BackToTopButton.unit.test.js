import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import BackToTopButton from "../BackToTopButton";

describe("BackToTopButton", () => {
  const mockFunction = jest.fn();

  const props = {
    handleBackToTop: mockFunction,
  };

  afterEach(() => {
    cleanup();
  });

  it("renders a <BackToTopButton/> component with expected props", () => {
    const { queryByTestId } = render(<BackToTopButton {...props} />);

    fireEvent.click(queryByTestId(/back-to-top-button/i));

    expect(mockFunction).toBeCalled();
    expect(queryByTestId(/back-to-top-button/i)).toBeTruthy();
  });

  it("renders a <BackToTopButton/> component without props", () => {
    const { queryByTestId } = render(<BackToTopButton />);

    fireEvent.click(queryByTestId(/back-to-top-button/i));

    expect(queryByTestId(/back-to-top-button/i)).toBeTruthy();
  });
});
