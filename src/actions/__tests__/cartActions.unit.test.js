import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  getCart,
  deleteOrderItem,
  changeQuantity,
  addItemToCart,
  orderComplete,
} from "../cartActions";
import C from "../../constants";
import { fixCart } from "../../utils/cart/cartUtils";

const mockStore = configureMockStore([thunk]);

describe("cartActions", () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  describe("getCart action", () => {
    it("dispatches getCart action and returns data on success", async () => {
      const mockData = [
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
      ];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: mockData,
        })
      );

      await store.dispatch(getCart());

      const expectedActions = [
        { type: C.GET_CART },
        { type: C.GET_CART_SUCCESS, payload: fixCart(mockData) },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });

    it("dispatches getCart action and returns an error", async () => {
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
        await store.dispatch(getCart());
      } catch {
        const expectedActions = [
          { type: C.GET_CART },
          { type: C.GET_CART_FAILURE },
          { type: "@@router/CALL_HISTORY_METHOD", payload: routerData },
        ];

        expect(store.getActions()).toEqual(expectedActions);
      }
    });
  });

  describe("deleteOrderItem action", () => {
    it("dispatches deleteOrderItem action and returns data on success", async () => {
      const mockData = [
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
      ];

      mockAxios.delete.mockImplementationOnce(() =>
        Promise.resolve({
          data: mockData,
        })
      );

      await store.dispatch(deleteOrderItem(57));

      const expectedActions = [
        { type: C.GET_CART_SUCCESS, payload: fixCart(mockData) },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });

    it("dispatches deleteOrderItem action and returns an error", async () => {
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
        await store.dispatch(deleteOrderItem(1));
      } catch {
        const expectedActions = [
          { type: C.GET_CART_FAILURE },
          { type: "@@router/CALL_HISTORY_METHOD", payload: routerData },
        ];

        expect(store.getActions()).toEqual(expectedActions);
      }
    });
  });

  describe("changeQuantity action", () => {
    it("dispatches changeQuantity action and returns data on success", async () => {
      const mockData = [
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
      ];

      mockAxios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: mockData,
        })
      );

      await store.dispatch(changeQuantity(57, 1));

      const expectedActions = [
        { type: C.GET_CART_SUCCESS, payload: fixCart(mockData) },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });

    it("dispatches changeQuantity action and returns an error", async () => {
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
        await store.dispatch(changeQuantity(1, 1));
      } catch {
        const expectedActions = [
          { type: C.GET_CART_FAILURE, payload: errorMsg },
          { type: "@@router/CALL_HISTORY_METHOD", payload: routerData },
        ];

        expect(store.getActions()).toEqual(expectedActions);
      }
    });
  });

  describe("addItemToCart action", () => {
    it("dispatches addItemToCart action", async () => {
      mockAxios.mockImplementationOnce(() =>
        Promise.resolve({
          data: [],
        })
      );

      await store.dispatch(addItemToCart(1, 1, 2, [5, 6], ""));
    });

    it("dispatches addItemToCart action and returns an error", async () => {
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
        await store.dispatch(addItemToCart(1, 1, 2, [5, 6], ""));
      } catch {
        const expectedActions = [
          { type: C.GET_CART_FAILURE },
          { type: "@@router/CALL_HISTORY_METHOD", payload: routerData },
        ];

        expect(store.getActions()).toEqual(expectedActions);
      }
    });
  });

  describe("orderComplete action", () => {
    it("dispatches orderComplete action as a customer", async () => {
      jest.spyOn(Object.getPrototypeOf(window.localStorage), "clear");
      mockAxios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: [],
        })
      );

      await store.dispatch(orderComplete(1, C.CUSTOMER_ROLE));
      expect(localStorage.clear).toHaveBeenCalled();
    });

    it("dispatches orderComplete action as the kitchen", async () => {
      mockAxios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: [],
        })
      );
      const routerData = { args: [C.ORDERS_PATH], method: "push" };
      const expectedActions = [
        { type: "@@router/CALL_HISTORY_METHOD", payload: routerData },
      ];

      await store.dispatch(orderComplete(1, C.KITCHEN_ROLE));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it("dispatches orderComplete action and returns an error", async () => {
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
        await store.dispatch(orderComplete(1, C.CUSTOMER_ROLE));
      } catch {
        const expectedActions = [
          { type: C.GET_CART_FAILURE },
          { type: "@@router/CALL_HISTORY_METHOD", payload: routerData },
        ];

        expect(store.getActions()).toEqual(expectedActions);
      }
    });
  });
});
