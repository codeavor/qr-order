import React from "react";
import { createShallow } from "@material-ui/core/test-utils";
import { MemoryRouter } from "react-router-dom";
import Extra from "../Extras";
import ExtraCheckBox from "../ExtraCheckBox";

describe("ExtraCheckBox", () => {
  const mockSetFieldValue = jest.fn();

  const props = {
    extra_category: {
      id: 1,
      name: "Επιλέξτε μέγεθος",
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
    values: { "Επιλέξτε μέγεθος": "0 7" },
    setFieldValue: mockSetFieldValue,
  };

  let shallow;

  beforeEach(() => {
    shallow = createShallow({ untilSelector: Extra });
  });

  it("renders a <ExtraCheckBox/> component with expected props", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ExtraCheckBox {...props} />
      </MemoryRouter>
    );

    const extra = wrapper.find(Extra);
    expect(extra).toHaveLength(props.extra_category.extras.length);
  });

  it("renders a <ExtraCheckBox/> component without props", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ExtraCheckBox />
      </MemoryRouter>
    );

    const extra = wrapper.find(Extra);
    expect(extra).toHaveLength(0);
  });
});
