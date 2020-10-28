import authReducer from "../authReducer";
import C from "../../constants";

describe("auth Reducer", () => {
  const initialState = {
    orderId: null,
    loading: true,
    error: "",
  };

  it("returns the initial state when an action type is not passed", () => {
    const reducer = authReducer(undefined, {});
    expect(reducer).toEqual(initialState);
  });

  it("handles GET_TOKEN as expected", () => {
    const reducer = authReducer(initialState, { type: C.GET_TOKEN });

    expect(reducer).toEqual({
      orderId: null,
      loading: true,
      error: "",
    });
  });

  it("handles GET_TOKEN_SUCCESS as expected", () => {
    const reducer = authReducer(initialState, {
      type: C.GET_TOKEN_SUCCESS,
      payload: 1,
    });

    expect(reducer).toEqual({
      orderId: 1,
      loading: false,
      error: "",
    });
  });

  it("handles GET_TOKEN_FAILURE as expected", () => {
    const reducer = authReducer(initialState, {
      type: C.GET_TOKEN_FAILURE,
      payload: "Error",
    });

    expect(reducer).toEqual({
      orderId: null,
      loading: false,
      error: "Error",
    });
  });
});
