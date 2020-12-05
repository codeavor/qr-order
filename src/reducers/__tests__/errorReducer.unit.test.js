import errorReducer from "../errorReducer";
import C from "../../constants";

describe("error Reducer", () => {
  const initialState = {
    error: null,
  };

  it("returns the initial state when an action type is not passed", () => {
    const reducer = errorReducer(undefined, {});
    expect(reducer).toEqual(initialState);
  });

  it("handles SET_ERROR as expected", () => {
    const reducer = errorReducer(initialState, {
      type: C.SET_ERROR,
      payload: "Error",
    });

    expect(reducer).toEqual({ error: "Error" });
  });

  it("handles RESET_ERROR as expected", () => {
    const reducer = errorReducer(initialState, { type: C.RESET_ERROR });

    expect(reducer).toEqual({
      error: null,
    });
  });
});
