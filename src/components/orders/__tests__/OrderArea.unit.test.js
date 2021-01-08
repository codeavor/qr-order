import React from "react";
import OrderCard from "../OrderCard";
import OrderArea from "../OrderArea";
import { mount } from "enzyme";

describe("OrderArea", () => {
  const mockChangeStatus = jest.fn();

  const propsSent = {
    statusFilter: "sent",
    orders: [
      {
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
        umbrella_id: 0,
        updated_at: "2020-11-30T12:20:10.000000Z",
      },
      {
        cart: [
          {
            id: 57,
            order_id: 1,
            item_id: 1,
            quantity: 2,
            item_name: "Espresso",
            price: "1",
            description: "random text",
            notes: "extra notes",
            extras: [
              {
                id: 1,
                name: "Γλυκός",
                price: "1.0",
              },
              {
                id: 2,
                name: "Καστανή Ζάχαρη",
                price: "0",
              },
              {
                id: 3,
                name: "Σιρόπι φράουλα",
                price: "0.2",
              },
              {
                id: 4,
                name: "Σαντιγύ",
                price: "0.3",
              },
            ],
          },
        ],
        order_complete: "processed",
        umbrella_id: 1,
        updated_at: "2020-12-30T12:18:05.000000Z",
      },
    ],
    changeStatus: mockChangeStatus,
  };

  const propsProcessed = {
    statusFilter: "processed",
    orders: [
      {
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
        umbrella_id: 0,
        updated_at: "2020-11-30T12:20:10.000000Z",
      },
      {
        cart: [
          {
            id: 57,
            order_id: 1,
            item_id: 1,
            quantity: 2,
            item_name: "Espresso",
            price: "1",
            description: "random text",
            notes: "extra notes",
            extras: [
              {
                id: 1,
                name: "Γλυκός",
                price: "1.0",
              },
              {
                id: 2,
                name: "Καστανή Ζάχαρη",
                price: "0",
              },
              {
                id: 3,
                name: "Σιρόπι φράουλα",
                price: "0.2",
              },
              {
                id: 4,
                name: "Σαντιγύ",
                price: "0.3",
              },
            ],
          },
        ],
        order_complete: "processed",
        umbrella_id: 1,
        updated_at: "2020-12-30T12:18:05.000000Z",
      },
    ],
    changeStatus: mockChangeStatus,
  };

  it("renders a <OrderArea/> component with expected props and filter with sent status", () => {
    const wrapper = mount(<OrderArea {...propsSent} />);

    const OrderCards = wrapper.find(OrderCard);
    expect(OrderCards).toHaveLength(1);
  });

  it("renders a <OrderArea/> component with expected props and filter with processed status", () => {
    const wrapper = mount(<OrderArea {...propsProcessed} />);

    const OrderCards = wrapper.find(OrderCard);
    expect(OrderCards).toHaveLength(1);
  });

  it("renders a <OrderArea/> component without props", () => {
    const wrapper = mount(<OrderArea />);

    const OrderCards = wrapper.find(OrderCard);
    expect(OrderCards).toHaveLength(0);
  });
});
