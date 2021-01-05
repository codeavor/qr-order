import C from "../../constants";
import kitchenReducer from "../kitchenReducer";

describe("kitchen Reducer", () => {
  const initialState = {
    orders: [],
    loading: true,
  };

  it("returns the initial state when an action type is not passed", () => {
    const reducer = kitchenReducer(undefined, {});
    expect(reducer).toEqual(initialState);
  });

  it("handles GET_KITCHEN as expected", () => {
    const reducer = kitchenReducer(initialState, { type: C.GET_KITCHEN });

    expect(reducer).toEqual({
      orders: [],
      loading: true,
    });
  });

  it("handles GET_KITCHEN_SUCCESS as expected", () => {
    const ordersResponse = [
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
      },
    ];

    const reducer = kitchenReducer(initialState, {
      type: C.GET_KITCHEN_SUCCESS,
      payload: ordersResponse,
    });

    expect(reducer).toEqual({
      orders: ordersResponse,
      loading: false,
    });
  });

  it("handles GET_KITCHEN_FAILURE as expected", () => {
    const reducer = kitchenReducer(initialState, {
      type: C.GET_KITCHEN_FAILURE,
      payload: "Error",
    });

    expect(reducer).toEqual({
      orders: [],
      loading: false,
    });
  });
});
