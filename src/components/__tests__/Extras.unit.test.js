import React from "react";
import { MemoryRouter } from "react-router-dom";
import { cleanup, render } from "@testing-library/react";
import Extra from "../Extras";
import { CheckBox } from "@material-ui/icons";

describe("Extra", () => {
  const props = {
    extra: {
      id: 1,
      name: "Coffee",
      price: "0.4",
    },
    controlComponent: <CheckBox />,
  };

  afterEach(() => {
    cleanup();
  });

  it("renders a <Extra/> component with expected props", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Extra {...props} />
      </MemoryRouter>
    );

    expect(getByText("Coffee")).toBeInTheDocument();
    expect(getByText("0,40€")).toBeInTheDocument();
  });

  it("renders a <Extra/> component without props", () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <Extra />
      </MemoryRouter>
    );

    expect(queryByTestId(/extra/i)).toBeTruthy();
  });
});
