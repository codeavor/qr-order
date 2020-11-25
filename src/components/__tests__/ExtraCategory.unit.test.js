import React from "react";
import { createShallow } from "@material-ui/core/test-utils";
import { MemoryRouter } from "react-router-dom";
import ExtraCategory from "../ExtraCategory";
import Extra from "../Extras";

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
    disabled: false,
    setValues: mockSetValues,
  };

  const checkBoxProps = {
    extra_category: {
      id: 6,
      name: "Επιλέξτε είδος ζάχαρης",
      type: "checkBox",
      extras: [],
    },
    handleChange: mockHandleChange,
    values: {},
    setFieldValue: mockSetFieldValue,
    disabled: true,
    setValues: mockSetValues,
  };

  let shallow;

  beforeEach(() => {
    shallow = createShallow({ untilSelector: Extra });
  });

  it("renders a <ExtraCategory/> component with expected props", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ExtraCategory {...radioButtonProps} />
      </MemoryRouter>
    );

    const extra = wrapper.find(Extra);
    expect(extra).toHaveLength(radioButtonProps.extra_category.extras.length);
  });

  it("renders a <ExtraCategory/> component with expected props", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ExtraCategory {...checkBoxProps} />
      </MemoryRouter>
    );

    const extra = wrapper.find(Extra);
    expect(extra).toHaveLength(checkBoxProps.extra_category.extras.length);
  });

  it("renders a <ExtraCategory/> component without props", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ExtraCategory />
      </MemoryRouter>
    );

    const extra = wrapper.find(Extra);
    expect(extra).toHaveLength(0);
  });
});
