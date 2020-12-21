import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  fireEvent,
  getByPlaceholderText,
  render,
  wait,
} from "@testing-library/react";
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
    orderId: "1",
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
    orderId: "1",
  };

  it("renders a <ItemArea/> component with expected props", async () => {
    const { getAllByTestId, getByTestId, getByPlaceholderText } = render(
      <MemoryRouter>
        <ItemArea {...props} />
      </MemoryRouter>
    );
    await wait(() => {
      expect(getAllByTestId("extra-category")).toHaveLength(
        props.item.extra_categories.length
      );
      expect(getByTestId("bottom-box")).toBeTruthy();
      fireEvent.change(getByPlaceholderText("Ειδικές Οδηγίες:"), {
        target: { value: "23" },
      });
      expect(getByPlaceholderText("Ειδικές Οδηγίες:").value).toBe("23");
    });
  });

  it("renders a <ItemArea/> component with expected props and no values", async () => {
    const { getAllByTestId, getByTestId, getByPlaceholderText } = render(
      <MemoryRouter>
        <ItemArea {...noValuesProps} />
      </MemoryRouter>
    );
    await wait(() => {
      expect(getAllByTestId("extra-category")).toHaveLength(
        noValuesProps.item.extra_categories.length
      );
      expect(getByTestId("bottom-box")).toBeTruthy();
      fireEvent.change(getByPlaceholderText("Ειδικές Οδηγίες:"), {
        target: { value: "23" },
      });
      expect(getByPlaceholderText("Ειδικές Οδηγίες:").value).toBe("23");
    });
  });

  it("renders a <ItemArea/> component without props", async () => {
    const { queryAllByTestId, getByTestId, getByPlaceholderText } = render(
      <MemoryRouter>
        <ItemArea />
      </MemoryRouter>
    );
    await wait(() => {
      expect(queryAllByTestId("extra-category")).toHaveLength(0);
      expect(getByTestId("bottom-box")).toBeTruthy();
      fireEvent.change(getByPlaceholderText("Ειδικές Οδηγίες:"), {
        target: { value: "23" },
      });
      expect(getByPlaceholderText("Ειδικές Οδηγίες:").value).toBe("23");
    });
  });
});
