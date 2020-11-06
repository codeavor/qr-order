import cartReducer from "../cartReducer";
import C from "../../constants";

describe("cart Reducer", () => {
  const initialState = {
    cart: [],
    loading: true,
    error: "",
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
      error: "",
    });
  });

  it("handles GET_CART_SUCCESS as expected", () => {
    const cartResponse = [
      {
        order_item_id: 57,
        quantity: 2,
        extras: "Γλυκός",
        extra_price: null,
        name: "Espresso",
        price: "1",
      },
      {
        order_item_id: 57,
        quantity: 2,
        extras: "Καστανή Ζάχαρη",
        extra_price: null,
        name: "Espresso",
        price: "1",
      },
    ];

    const reducer = cartReducer(initialState, {
      type: C.GET_CART_SUCCESS,
      payload: cartResponse,
    });

    expect(reducer).toEqual({
      cart: cartResponse,
      loading: false,
      error: "",
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
      error: "Error",
    });
  });
});
