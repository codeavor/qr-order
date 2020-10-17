import React from "react";
import { cleanup, render } from "@testing-library/react";
import Error from "../Error";

describe("Error", () => {
  const props = {
    error: "An error has occured",
  };

  afterEach(() => {
    cleanup();
  });

  it("renders a <Error/> component with expected props", () => {
    const { queryByTestId, getByText } = render(<Error {...props} />);

    expect(queryByTestId(/error/i)).toBeTruthy();
    expect(getByText("An error has occured")).toBeInTheDocument();
  });

  it("renders a <BottomButton/> component without props", () => {
    const { queryByTestId } = render(<Error />);

    expect(queryByTestId(/error/i)).toBeTruthy();
  });
});
