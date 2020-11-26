import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  getCart,
  deleteOrderItem,
  changeQuantity,
  addItemToCart,
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
          order_item_id: 57,
          quantity: 2,
          extras: "Γλυκός",
          extra_price: null,
          name: "Espresso",
          price: "1",
        },
        {
          order_item_id: 57,
          quantity: 2,
          extras: "Καστανή Ζάχαρη",
          extra_price: null,
          name: "Espresso",
          price: "1",
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
          { type: C.GET_CART_FAILURE, payload: errorMsg },
        ];

        expect(store.getActions()).toEqual(expectedActions);
      }
    });
  });

  describe("deleteOrderItem action", () => {
    it("dispatches deleteOrderItem action and returns data on success", async () => {
      const mockData = [
        {
          order_item_id: 57,
          quantity: 2,
          extras: "Γλυκός",
          extra_price: null,
          name: "Espresso",
          price: "1",
        },
        {
          order_item_id: 57,
          quantity: 2,
          extras: "Καστανή Ζάχαρη",
          extra_price: null,
          name: "Espresso",
          price: "1",
        },
      ];

      mockAxios.delete.mockImplementationOnce(() =>
        Promise.resolve({
          data: mockData,
        })
      );

      await store.dispatch(deleteOrderItem(1));

      const expectedActions = [
        { type: C.GET_CART_SUCCESS, payload: fixCart(mockData) },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });

    it("dispatches deleteOrderItem action and returns an error", async () => {
      const errorMsg = "Something bad happened :(";

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
          { type: C.GET_CART_FAILURE, payload: errorMsg },
        ];

        expect(store.getActions()).toEqual(expectedActions);
      }
    });
  });

  describe("changeQuantity action", () => {
    it("dispatches changeQuantity action and returns data on success", async () => {
      const mockData = [
        {
          order_item_id: 57,
          quantity: 2,
          extras: "Γλυκός",
          extra_price: null,
          name: "Espresso",
          price: "1",
        },
        {
          order_item_id: 57,
          quantity: 2,
          extras: "Καστανή Ζάχαρη",
          extra_price: null,
          name: "Espresso",
          price: "1",
        },
      ];

      mockAxios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: mockData,
        })
      );

      await store.dispatch(changeQuantity(1, 1));

      const expectedActions = [
        { type: C.GET_CART_SUCCESS, payload: fixCart(mockData) },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });

    it("dispatches changeQuantity action and returns an error", async () => {
      const errorMsg = "Something bad happened :(";

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

      await store.dispatch(addItemToCart(1, 1, 2, [5, 6]));
    });

    it("dispatches addItemToCart action and returns an error", async () => {
      const errorMsg = "Something bad happened :(";
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
        await store.dispatch(addItemToCart(1, 1, 2, [5, 6]));
      } catch {
        const expectedActions = [
          { type: C.GET_CART_FAILURE, payload: errorMsg },
        ];

        expect(store.getActions()).toEqual(expectedActions);
      }
    });
  });
});
