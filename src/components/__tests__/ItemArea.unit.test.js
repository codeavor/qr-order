import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ItemArea from "../ItemArea";

describe("ItemArea", () => {
  const mockaddItemToCart = jest.fn();

  const props = {
    item: {
      id: 1,
      name: "Espresso",
      price: "1",
      category_id: 1,
      extra_categories: [
        {
          id: 6,
          name: "Επιλέξτε μέγεθος",
          type: "radioButton",
          extras: [
            {
              id: 7,
              name: "Διπλός",
              price: null,
            },
          ],
        },
        {
          id: 7,
          name: "Επιλέξτε ζάχαρη",
          type: "radioButton",
          extras: [
            {
              id: 1,
              name: "Σκέτος",
              price: null,
            },
          ],
        },
        {
          id: 8,
          name: "Επιλέξτε είδος ζάχαρης",
          type: "radioButton",
          extras: [
            {
              id: 5,
              name: "Λευκή ζάχαρη",
              price: null,
            },
          ],
        },
      ],
    },
    initialValues: { "Επιλέξτε μέγεθος": "0 7", "Επιλέξτε ζάχαρη": "0 1" },
    addItemToCart: mockaddItemToCart,
    orderId: 1,
  };

  const noValuesProps = {
    item: {
      id: 1,
      name: "Espresso",
      price: "1",
      category_id: 1,
      extra_categories: [
        {
          id: 6,
          name: "Επιλέξτε μέγεθος",
          type: "radioButton",
          extras: [
            {
              id: 1,
              name: "Σκέτος",
              price: null,
            },
          ],
        },
        {
          id: 7,
          name: "Επιλέξτε ζάχαρη",
          type: "radioButton",
          extras: [
            {
              id: 5,
              name: "Διπλός",
              price: null,
            },
          ],
        },
      ],
    },
    initialValues: {},
    addItemToCart: mockaddItemToCart,
    orderId: 1,
  };

  it("renders a <ItemArea/> component with expected props", () => {
    const { getAllByTestId, getByTestId } = render(
      <MemoryRouter>
        <ItemArea {...props} />
      </MemoryRouter>
    );

    expect(getAllByTestId("extra-category")).toHaveLength(
      props.item.extra_categories.length
    );
    expect(getByTestId("bottom-box")).toBeTruthy();
  });

  it("renders a <ItemArea/> component with expected props and no values", () => {
    const { getAllByTestId, getByTestId } = render(
      <MemoryRouter>
        <ItemArea {...noValuesProps} />
      </MemoryRouter>
    );

    expect(getAllByTestId("extra-category")).toHaveLength(
      noValuesProps.item.extra_categories.length
    );
    expect(getByTestId("bottom-box")).toBeTruthy();
  });

  it("renders a <ItemArea/> component without props", () => {
    const { queryAllByTestId, getByTestId } = render(
      <MemoryRouter>
        <ItemArea />
      </MemoryRouter>
    );

    expect(queryAllByTestId("extra-category")).toHaveLength(0);
    expect(getByTestId("bottom-box")).toBeTruthy();
  });
});
