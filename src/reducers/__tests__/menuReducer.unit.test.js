import menuReducer from "../menuReducer";
import C from "../../constants";

describe("menu Reducer", () => {
  const initialState = {
    menu: [],
    loading: true,
  };

  it("returns the initial state when an action type is not passed", () => {
    const reducer = menuReducer(undefined, {});
    expect(reducer).toEqual(initialState);
  });

  it("handles GET_MENU_REQUEST as expected", () => {
    const reducer = menuReducer(initialState, { type: C.GET_MENU });

    expect(reducer).toEqual({
      menu: [],
      loading: true,
    });
  });

  it("handles GET_MENU_SUCCESS as expected", () => {
    const reducer = menuReducer(initialState, {
      type: C.GET_MENU_SUCCESS,
      payload: {
        id: 1,
        name: "foo",
      },
    });

    expect(reducer).toEqual({
      menu: {
        id: 1,
        name: "foo",
      },
      loading: false,
    });
  });

  it("handles GET_MENU_FAILURE as expected", () => {
    const reducer = menuReducer(initialState, {
      type: C.GET_MENU_FAILURE,
      payload: "Error",
    });

    expect(reducer).toEqual({
      menu: [],
      loading: false,
    });
  });
});
