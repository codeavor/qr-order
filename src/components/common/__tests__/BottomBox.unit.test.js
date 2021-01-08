import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BottomBox from "../BottomBox";
import BottomButton from "../BottomButton";

describe("BottomBox", () => {
  it("renders a <BottomBox/> component with expected children", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <BottomBox>
          <BottomButton />
        </BottomBox>
      </MemoryRouter>
    );

    expect(getByTestId("bottom-button")).toBeTruthy();
  });
});
