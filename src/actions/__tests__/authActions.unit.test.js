import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { getToken } from "../authActions";
import C from "../../constants";

const mockStore = configureMockStore([thunk]);

describe("Auth Actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  describe("getToken action creator", () => {
    it("dispatches GET_TOKEN action and returns data on success", async () => {
      const mockData = { token: "12345", orderId: 1 };
      const routerData = { args: [C.MENU_PATH], method: "push" };
      mockAxios.mockImplementationOnce(() =>
        Promise.resolve({
          data: mockData,
        })
      );

      await store.dispatch(getToken(1));

      const expectedActions = [
        { type: "@@router/CALL_HISTORY_METHOD", payload: routerData },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });

    it("dispatches GET_TOKEN action and returns an error", async () => {
      const errorMsg = "Something bad happened :(";
      const routerData = { args: ["/"], method: "push" };
      mockAxios.mockImplementationOnce(() =>
        Promise.reject({
          response: {
            data: {
              error: errorMsg,
            },
          },
        })
      );

      try {
        await store.dispatch(getToken(1));
      } catch {
        const expectedActions = [
          { type: C.GET_TOKEN_FAILURE },
          { type: "@@router/CALL_HISTORY_METHOD", payload: routerData },
        ];

        expect(store.getActions()).toEqual(expectedActions);
      }
    });
  });
});
