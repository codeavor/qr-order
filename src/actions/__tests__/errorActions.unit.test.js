import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import C from "../../constants";
import { handleError } from "../errorActions";

const mockStore = configureMockStore([thunk]);

describe("errorActions", () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  describe("handleError action", () => {
    it("dispatches getItem action and returns data on success", async () => {
      await store.dispatch(handleError("Error"));
      const routerData = { args: ["/"], method: "push" };
      const expectedActions = [
        { type: C.SET_ERROR, payload: "Error" },
        { type: "@@router/CALL_HISTORY_METHOD", payload: routerData },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
