const C = {
  // Urls
  URL: "http://localhost:3000",
  API_URL: "https://qr-order-api.herokuapp.com/api",
  LOGIN_PATH: "/authentication",
  MENU_PATH: "/umbrella",
  CART_PATH: "/cart",
  CHECKOUT_PATH: "/checkout",

  // API Endpoints
  REGISTER_ENDPOINT: "/auth/register",
  MENU_ENDPOINT: "/menu",
  CART_ENDPOINT: "/cart",
  ORDER_ENDPOINT: "/order_item",

  // Roles
  CUSTOMER_ROLE: "customer",

  // Local Storage Variables
  JWT_TOKEN: "jwtToken",
  ORDER_ID: "orderId",

  //Auth action types
  GET_TOKEN: "GET_TOKEN",
  GET_TOKEN_SUCCESS: "GET_TOKEN_SUCCESS",
  GET_TOKEN_FAILURE: "GET_TOKEN_FAILURE",

  //Menu action types
  GET_MENU: "GET_MENU",
  GET_MENU_SUCCESS: "GET_MENU_SUCCESS",
  GET_MENU_FAILURE: "GET_MENU_FAILURE",

  //Item action types
  GET_ITEM: "GET_ITEM",
  GET_ITEM_SUCCESS: "GET_ITEM_SUCCESS",
  GET_ITEM_FAILURE: "GET_ITEM_FAILURE",
  SET_EXTRA_VALUES: "SET_EXTRA_VALUES",

  //Cart action types
  GET_CART: "GET_CART",
  GET_CART_SUCCESS: "GET_CART_SUCCESS",
  GET_CART_FAILURE: "GET_CART_FAILURE",

  SUGAR_IDS: ["0 4", "0 5", "0 6"],
  SKETOS_ID: "1",
  EPILEKSTE_EIDOS_ZAXARHS: "Επιλέξτε είδος ζάχαρης",
  EPILEKSTE_ZAXARH: "Επιλέξτε ζάχαρη",
};

export default C;
