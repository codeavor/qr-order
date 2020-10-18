import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { getMenu } from "../menuActions";

const mockStore = configureMockStore([thunk]);

describe("Menu Actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      menu: {},
    });
  });

  describe("getMenu action creator", () => {
    it("dispatches GET_MENU action and returns data on success", async () => {
      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: [{ id: 1, name: "Coffee" }],
        })
      );

      await store.dispatch(getMenu());
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual("GET_MENU");
      expect(actions[1].type).toEqual("GET_MENU_SUCCESS");
      expect(actions[1].payload[0].name).toEqual("Coffee");
    });

    it("dispatches GET_MENU action and returns an error", async () => {
      const errorMsg = "Something bad happened :(";

      mockAxios.get.mockImplementationOnce(() =>
        Promise.reject({
          response: {
            data: {
              message: errorMsg,
            },
          },
        })
      );

      try {
        await store.dispatch(getMenu());
      } catch {
        const actions = store.getActions();

        expect.assertions(3);
        expect(actions[0].type).toEqual("GET_MENU");
        expect(actions[1].type).toEqual("GET_MENU_FAILURE");
        expect(actions[1].payload[0].error).toEqual(errorMsg);
      }
    });
  });
});
