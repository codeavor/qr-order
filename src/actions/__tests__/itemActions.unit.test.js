import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { getItem } from "../itemActions";
import C from "../../constants";
import { fixItem, getInitializedExtras } from "../../utils/extra/extraUtils";

const mockStore = configureMockStore([thunk]);

describe("itemActions", () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  describe("getItem action", () => {
    it("dispatches getItem action and returns data on success", async () => {
      const mockData = {
        id: 57,
        name: "Espresso",
        price: "2.0",
        category_id: 2,
        extra_categories: [
          {
            id: 1,
            name: "Επιλέξτε μέγεθος",
            type: "radioButton",
            extras: [
              {
                id: 2,
                name: "Γλυκός",
                price: null,
              },
              {
                id: 8,
                name: "Σαντιγύ",
                price: "0.2",
              },
            ],
          },
          {
            id: 2,
            name: "Επιλέξτε ζάχαρη",
            type: "radioButton",
            extras: [
              {
                id: 2,
                name: "Γλυκός",
                price: null,
              },
              {
                id: 8,
                name: "Σαντιγύ",
                price: "0.2",
              },
            ],
          },
        ],
      };

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: mockData,
        })
      );

      await store.dispatch(getItem());

      const expectedActions = [
        { type: C.GET_ITEM },
        { type: C.GET_ITEM_SUCCESS, payload: fixItem(mockData) },
        {
          type: C.SET_EXTRA_VALUES,
          payload: getInitializedExtras(mockData.extra_categories),
        },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });

    it("dispatches getItem action and returns an error", async () => {
      const errorMsg = "Something bad happened :(";

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
        await store.dispatch(getItem());
      } catch {
        const expectedActions = [
          { type: C.GET_ITEM },
          { type: C.GET_ITEM_ERROR, payload: errorMsg },
        ];

        expect(store.getActions()).toEqual(expectedActions);
      }
    });
  });
});
