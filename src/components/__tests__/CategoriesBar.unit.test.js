import React from "react";
import { act } from "react-dom/test-utils";
import Tab from "@material-ui/core/Tab";
import { createMount } from "@material-ui/core/test-utils";
import { cleanup, fireEvent, render } from "@testing-library/react";
import CategoriesBar from "../CategoriesBar";

describe("CategoriesBar", () => {
  const props = {
    menu: [
      {
        id: 1,
        name: "Καφέδες",
        description: "Ζεστά ή κρύα ροφήματα καφέ",
        items: [
          {
            id: 1,
            name: "Espresso",
            price: "1",
            category_id: 1,
          },
          {
            id: 2,
            name: "Freddo Espresso",
            price: "1.4",
            category_id: 1,
          },
        ],
      },
      {
        id: 2,
        name: "Ποτά",
        description: "Απλά ποτά",
        items: [
          {
            id: 3,
            name: "Ποτό 1",
            price: "1",
            category_id: 2,
          },
          {
            id: 4,
            name: "Ποτό 2",
            price: "1.4",
            category_id: 2,
          },
        ],
      },
    ],
  };

  let mount;

  beforeEach(() => {
    mount = createMount();
  });

  it("renders a <CategoriesBar/> component with expected props", () => {
    const wrapper = mount(<CategoriesBar {...props} />);
    const tabs = wrapper.find(Tab);

    expect(tabs).toHaveLength(props.menu.length);
  });

  it("renders a <CategoriesBar/> component with expected props", () => {
    const wrapper = mount(<CategoriesBar />);
    const tabs = wrapper.find(Tab);

    expect(tabs).toHaveLength(0);
  });

  it("expect tab to be selected on click", () => {
    const { getAllByRole, getAllByTestId } = render(
      <CategoriesBar {...props} />
    );

    const [firstTab, lastTab] = getAllByRole("tab");
    const [, backToTopButton] = getAllByTestId("back-to-top-button");

    expect(firstTab).toHaveAttribute("aria-selected", "true");
    expect(lastTab).toHaveAttribute("aria-selected", "false");

    act(() => {
      lastTab.focus();
    });

    expect(firstTab).toHaveAttribute("aria-selected", "false");
    expect(lastTab).toHaveAttribute("aria-selected", "true");

    fireEvent.click(backToTopButton);

    expect(firstTab).toHaveAttribute("aria-selected", "true");
    expect(lastTab).toHaveAttribute("aria-selected", "false");
  });
});
