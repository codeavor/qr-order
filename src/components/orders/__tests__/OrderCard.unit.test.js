import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import OrderCard from "../OrderCard";

describe("OrderCard", () => {
  const mockChangeStatus = jest.fn();

  const props = {
    order: {
      cart: [
        {
          id: 58,
          order_id: 1,
          item_id: 1,
          quantity: 3,
          item_name: "Espresso",
          price: "1.80",
          description: "random text",
          notes: "extra notes",
          extras: [
            {
              id: 2,
              name: "Καστανή Ζάχαρη",
              price: "0",
            },
            {
              id: 4,
              name: "Σαντιγύ",
              price: "0.1",
            },
          ],
        },
      ],
      order_complete: "sent",
      umbrella_id: 1,
      updated_at: "2020-12-30T12:18:05.000000Z",
    },
    changeStatus: mockChangeStatus,
  };

  afterEach(cleanup);

  it("renders a <OrderCard/> component with expected props", () => {
    const { getByText, queryByTestId, queryAllByTestId } = render(
      <OrderCard {...props} />
    );

    expect(getByText("" + props.order.umbrella_id)).toBeInTheDocument();
    expect(getByText("12:18:05")).toBeInTheDocument();
    expect(getByText(props.order.order_complete)).toBeInTheDocument();

    fireEvent.click(queryByTestId(/change-order-status/i));
    expect(mockChangeStatus).toBeCalled();

    expect(queryAllByTestId(/checkout-item/i)).toHaveLength(
      props.order.cart.length
    );
  });

  it("renders a <OrderCard/> component without props", () => {
    const { queryByTestId } = render(<OrderCard />);

    fireEvent.click(queryByTestId(/change-order-status/i));
  });
});
