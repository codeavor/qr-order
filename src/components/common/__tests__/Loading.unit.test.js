import React from "react";
import { cleanup, render } from "@testing-library/react";
import Loading from "../Loading";

describe("Loading", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a <Loading/> component", () => {
    const { queryByTestId } = render(<Loading />);
    expect(queryByTestId(/loading/i)).toBeTruthy();
  });
});
