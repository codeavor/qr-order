import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { getMenu } from "../menuActions";
import C from "../../constants";

const mockStore = configureMockStore([thunk]);

describe("Menu Actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  describe("getMenu action creator", () => {
    it("dispatches GET_MENU action and returns data on success", async () => {
      const mockData = [{ id: 1, name: "Coffee" }];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: mockData,
        })
      );

      await store.dispatch(getMenu());

      const expectedActions = [
        { type: C.GET_MENU },
        { type: C.RESET_ERROR },
        { type: C.GET_MENU_SUCCESS, payload: mockData },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });

    it("dispatches GET_MENU action and returns an error", async () => {
      const errorMsg = "Something bad happened :(";
      const routerData = { args: ["/"], method: "push" };
      mockAxios.get.mockImplementationOnce(() =>
        Promise.reject({
          response: {
            data: {
              error: errorMsg,
            },
          },
        })
      );

      try {
        await store.dispatch(getMenu());
      } catch {
        const expectedActions = [
          { type: C.GET_MENU },
          { type: C.GET_MENU_FAILURE },
          { type: "@@router/CALL_HISTORY_METHOD", payload: routerData },
        ];

        expect(store.getActions()).toEqual(expectedActions);
      }
    });
  });
});
