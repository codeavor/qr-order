import itemReducer from "../itemReducer";
import C from "../../constants";

describe("item Reducer", () => {
  const initialState = {
    item: null,
    extraValues: {},
    loading: true,
  };

  it("returns the initial state when an action type is not passed", () => {
    const reducer = itemReducer(undefined, {});
    expect(reducer).toEqual(initialState);
  });

  it("handles GET_ITEM_REQUEST as expected", () => {
    const reducer = itemReducer(initialState, { type: C.GET_ITEM });

    expect(reducer).toEqual({
      item: null,
      extraValues: {},
      loading: true,
    });
  });

  it("handles GET_ITEM_SUCCESS as expected", () => {
    const reducer = itemReducer(initialState, {
      type: C.GET_ITEM_SUCCESS,
      payload: {
        id: 1,
        name: "foo",
        price: "1.9",
      },
    });

    expect(reducer).toEqual({
      item: {
        id: 1,
        name: "foo",
        price: "1.9",
      },
      extraValues: {},
      loading: false,
    });
  });

  it("handles GET_ITEM_FAILURE as expected", () => {
    const reducer = itemReducer(initialState, {
      type: C.GET_ITEM_FAILURE,
      payload: "Error",
    });

    expect(reducer).toEqual({
      item: null,
      extraValues: {},
      loading: false,
    });
  });

  it("handles SET_EXTRA_VALUES as expected", () => {
    const reducer = itemReducer(initialState, {
      type: C.SET_EXTRA_VALUES,
      payload: { "Επιλεξτε ζαχαρη": "0 1" },
    });

    expect(reducer).toEqual({
      item: null,
      extraValues: { "Επιλεξτε ζαχαρη": "0 1" },
      loading: true,
    });
  });
});
