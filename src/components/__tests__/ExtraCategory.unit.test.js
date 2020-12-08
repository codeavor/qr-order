import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ExtraCategory from "../ExtraCategory";

describe("ExtraCategory", () => {
  const mockHandleChange = jest.fn();
  const mockSetFieldValue = jest.fn();
  const mockSetValues = jest.fn();

  const radioButtonProps = {
    extra_category: {
      id: 1,
      name: "Επιλέξτε μέγεθος",
      type: "radioButton",
      extras: [
        {
          id: 7,
          name: "Μονός",
          price: null,
        },
        {
          id: 8,
          name: "Διπλός",
          price: "0.4",
        },
      ],
    },
    handleChange: mockHandleChange,
    values: { "Επιλέξτε μέγεθος": "0 7" },
    setFieldValue: mockSetFieldValue,
    setValues: mockSetValues,
  };

  const checkBoxProps = {
    extra_category: {
      id: 6,
      name: "Επιλέξτε είδος ζάχαρης",
      type: "checkBox",
      extras: [
        {
          id: 7,
          name: "Μονός",
          price: null,
        },
        {
          id: 8,
          name: "Διπλός",
          price: "0.4",
        },
      ],
    },
    handleChange: mockHandleChange,
    values: {},
    setFieldValue: mockSetFieldValue,
    setValues: mockSetValues,
  };

  it("renders a <ExtraCategory/> component with expected radioButtonProps", () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <ExtraCategory {...radioButtonProps} />
      </MemoryRouter>
    );

    expect(getAllByTestId("extra")).toHaveLength(
      radioButtonProps.extra_category.extras.length
    );
  });

  it("renders a <ExtraCategory/> component with expected checkBoxProps", () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <ExtraCategory {...checkBoxProps} />
      </MemoryRouter>
    );

    expect(getAllByTestId("extra")).toHaveLength(
      checkBoxProps.extra_category.extras.length
    );
  });

  it("renders a <ExtraCategory/> component without props", () => {
    const { queryAllByTestId } = render(
      <MemoryRouter>
        <ExtraCategory />
      </MemoryRouter>
    );

    expect(queryAllByTestId("extra")).toHaveLength(0);
  });
});
