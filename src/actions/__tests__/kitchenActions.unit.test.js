import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import C from "../../constants";
import {
  changeStatus,
  createOrder,
  getOrders,
  removeOrder,
} from "../kitchenActions";

const mockStore = configureMockStore([thunk]);

describe("kitchenActions", () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  describe("getOrders action", () => {
    it("dispatches getOrders action and returns data on success", async () => {
      const mockData = [
        {
          cart: [
            {
              id: 58,
              order_id: 1,
              item_id: 1,
              quantity: 3,
              item_name: "Espresso",
              price: "1.80",
              description: "random text",
              notes: "extra notes",
              extras: [
                {
                  id: 2,
                  name: "Καστανή Ζάχαρη",
                  price: "0",
                },
                {
                  id: 4,
                  name: "Σαντιγύ",
                  price: "0.1",
                },
              ],
            },
          ],
          order_complete: "sent",
        },
        {
          cart: [
            {
              id: 57,
              order_id: 1,
              item_id: 1,
              quantity: 2,
              item_name: "Espresso",
              price: "1",
              description: "random text",
              notes: "extra notes",
              extras: [
                {
                  id: 1,
                  name: "Γλυκός",
                  price: "1.0",
                },
                {
                  id: 2,
                  name: "Καστανή Ζάχαρη",
                  price: "0",
                },
                {
                  id: 3,
                  name: "Σιρόπι φράουλα",
                  price: "0.2",
                },
                {
                  id: 4,
                  name: "Σαντιγύ",
                  price: "0.3",
                },
              ],
            },
          ],
          order_complete: "processed",
        },
      ];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: mockData,
        })
      );

      await store.dispatch(getOrders());

      const expectedActions = [
        { type: C.GET_KITCHEN },
        { type: C.RESET_ERROR },
        { type: C.GET_KITCHEN_SUCCESS, payload: mockData },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });

    it("dispatches getOrders action and returns an error", async () => {
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
        await store.dispatch(getOrders());
      } catch {
        const expectedActions = [
          { type: C.GET_KITCHEN },
          { type: C.GET_KITCHEN_FAILURE },
          { type: "@@router/CALL_HISTORY_METHOD", payload: routerData },
        ];

        expect(store.getActions()).toEqual(expectedActions);
      }
    });
  });

  describe("createOrder action", () => {
    it("dispatches createOrder action and returns data on success", async () => {
      const mockData = {
        order_id: "465",
      };
      const routerData = { args: [C.MENU_PATH], method: "push" };

      mockAxios.mockImplementationOnce(() =>
        Promise.resolve({
          data: mockData,
        })
      );

      await store.dispatch(createOrder(1));

      const expectedActions = [
        { type: C.RESET_ERROR },
        { type: "@@router/CALL_HISTORY_METHOD", payload: routerData },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });

    it("dispatches createOrder action and returns an error", async () => {
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
        await store.dispatch(createOrder(1));
      } catch {
        const expectedActions = [
          { type: C.GET_KITCHEN_FAILURE },
          { type: "@@router/CALL_HISTORY_METHOD", payload: routerData },
        ];

        expect(store.getActions()).toEqual(expectedActions);
      }
    });
  });

  describe("changeStatus action", () => {
    const mockData = [
      {
        cart: [
          {
            id: 58,
            order_id: 1,
            item_id: 1,
            quantity: 3,
            item_name: "Espresso",
            price: "1.80",
            description: "random text",
            notes: "extra notes",
            extras: [
              {
                id: 2,
                name: "Καστανή Ζάχαρη",
                price: "0",
              },
              {
                id: 4,
                name: "Σαντιγύ",
                price: "0.1",
              },
            ],
          },
        ],
        order_complete: "sent",
      },
      {
        cart: [
          {
            id: 57,
            order_id: 1,
            item_id: 1,
            quantity: 2,
            item_name: "Espresso",
            price: "1",
            description: "random text",
            notes: "extra notes",
            extras: [
              {
                id: 1,
                name: "Γλυκός",
                price: "1.0",
              },
              {
                id: 2,
                name: "Καστανή Ζάχαρη",
                price: "0",
              },
              {
                id: 3,
                name: "Σιρόπι φράουλα",
                price: "0.2",
              },
              {
                id: 4,
                name: "Σαντιγύ",
                price: "0.3",
              },
            ],
          },
        ],
        order_complete: "processed",
      },
    ];
    it("dispatches changeStatus (to sent) action and returns data on success", async () => {
      const routerData = { args: [C.ORDERS_PATH], method: "push" };

      mockAxios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: mockData,
        })
      );

      await store.dispatch(changeStatus(57, "sent"));

      const expectedActions = [
        { type: "@@router/CALL_HISTORY_METHOD", payload: routerData },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });

    it("dispatches changeStatus (to processed) action and returns data on success", async () => {
      mockAxios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: mockData,
        })
      );

      await store.dispatch(changeStatus(57, "processed"));

      const expectedActions = [
        { type: C.GET_KITCHEN_SUCCESS, payload: mockData },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });

    it("dispatches changeStatus action and returns an error", async () => {
      const errorMsg = "Something bad happened :(";
      const routerData = { args: ["/"], method: "push" };
      mockAxios.put.mockImplementationOnce(() =>
        Promise.reject({
          response: {
            data: {
              error: errorMsg,
            },
          },
        })
      );

      try {
        await store.dispatch(changeStatus(57));
      } catch {
        const expectedActions = [
          { type: C.GET_KITCHEN_FAILURE, payload: errorMsg },
          { type: "@@router/CALL_HISTORY_METHOD", payload: routerData },
        ];

        expect(store.getActions()).toEqual(expectedActions);
      }
    });
  });

  describe("removeOrder action", () => {
    it("dispatches removeOrder action", async () => {
      const routerData = { args: [C.ORDERS_PATH], method: "push" };
      jest.spyOn(window.localStorage.__proto__, "removeItem");
      window.localStorage.__proto__.setItem = jest.fn();

      mockAxios.delete.mockImplementationOnce(() =>
        Promise.resolve({
          data: null,
        })
      );

      await store.dispatch(removeOrder(57));
      const expectedActions = [
        { type: "@@router/CALL_HISTORY_METHOD", payload: routerData },
      ];

      expect(store.getActions()).toEqual(expectedActions);
      expect(localStorage.removeItem).toHaveBeenCalled();
    });

    it("dispatches removeOrder action and returns an error", async () => {
      const errorMsg = "Something bad happened :(";
      const routerData = { args: ["/"], method: "push" };
      mockAxios.delete.mockImplementationOnce(() =>
        Promise.reject({
          response: {
            data: {
              error: errorMsg,
            },
          },
        })
      );

      try {
        await store.dispatch(removeOrder(57));
      } catch {
        const expectedActions = [
          { type: C.GET_KITCHEN_FAILURE },
          { type: "@@router/CALL_HISTORY_METHOD", payload: routerData },
        ];

        expect(store.getActions()).toEqual(expectedActions);
      }
    });
  });
});
