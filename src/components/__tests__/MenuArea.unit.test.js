import React from "react";
import { createShallow } from "@material-ui/core/test-utils";
import { MemoryRouter } from "react-router-dom";
import MenuArea from "../MenuArea";
import MenuItem from "../MenuItem";

describe("MenuArea", () => {
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
          {
            id: 3,
            name: "Cappuccino",
            price: "1.4",
            category_id: 1,
          },
          {
            id: 4,
            name: "Freddo Cappuccino",
            price: "1.7",
            category_id: 1,
          },
          {
            id: 5,
            name: "Frappe",
            price: "1",
            category_id: 1,
          },
          {
            id: 6,
            name: "Φίλτρου",
            price: "1.4",
            category_id: 1,
          },
          {
            id: 7,
            name: "Ελληνικός",
            price: "1",
            category_id: 1,
          },
        ],
      },
    ],
  };

  let shallow;

  beforeEach(() => {
    shallow = createShallow({ untilSelector: MenuItem });
  });

  it("renders a <MenuArea/> component with expected props", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <MenuArea {...props} />
      </MemoryRouter>
    );

    const menuItems = wrapper.find(MenuItem);
    expect(menuItems).toHaveLength(props.menu[0].items.length);
  });

  it("renders a <MenuArea/> component without props", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <MenuArea />
      </MemoryRouter>
    );

    const menuItems = wrapper.find(MenuItem);
    expect(menuItems).toHaveLength(0);
  });
});
