import cartReducer from "../cartReducer";
import C from "../../constants";

describe("cart Reducer", () => {
  const initialState = {
    cart: [],
    loading: true,
  };

  it("returns the initial state when an action type is not passed", () => {
    const reducer = cartReducer(undefined, {});
    expect(reducer).toEqual(initialState);
  });

  it("handles GET_CART_REQUEST as expected", () => {
    const reducer = cartReducer(initialState, { type: C.GET_CART });

    expect(reducer).toEqual({
      cart: [],
      loading: true,
    });
  });

  it("handles GET_CART_SUCCESS as expected", () => {
    const cartResponse = [
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
    ];

    const reducer = cartReducer(initialState, {
      type: C.GET_CART_SUCCESS,
      payload: cartResponse,
    });

    expect(reducer).toEqual({
      cart: cartResponse,
      loading: false,
    });
  });

  it("handles GET_CART_FAILURE as expected", () => {
    const reducer = cartReducer(initialState, {
      type: C.GET_CART_FAILURE,
      payload: "Error",
    });

    expect(reducer).toEqual({
      cart: [],
      loading: false,
    });
  });
});
