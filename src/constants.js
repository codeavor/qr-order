const C = {
  // Urls
  URL: "http://localhost:3000",
  API_URL: "https://qr-order-api.herokuapp.com/api",
  LOGIN_PATH: "/authentication",
  MENU_PATH: "/menu",
  ITEM_PATH: "/item",
  CART_PATH: "/cart",
  CHECKOUT_PATH: "/checkout",
  FINAL_PATH: "/final",
  ORDERS_PATH: "/orders",

  // API Endpoints
  REGISTER_ENDPOINT: "/auth/register",
  MENU_ENDPOINT: "/menu",
  CART_ENDPOINT: "/cart",
  ORDER_ENDPOINT: "/order_item",
  ORDERS_ENDPOINT: "/orders",

  // Roles
  CUSTOMER_ROLE: "customer",
  KITCHEN_ROLE: "kitchen",

  // Local Storage Variables
  JWT_TOKEN: "jwtToken",
  ORDER_ID: "orderId",
  USERTYPE_ID: "userTypeID",
  ROLE: "role",

  // Error action types
  SET_ERROR: "SET_ERROR",
  RESET_ERROR: "RESET_ERROR",

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

  //Kitchen action types
  GET_KITCHEN: "GET_KITCHEN",
  GET_KITCHEN_SUCCESS: "GET_KITCHEN_SUCCESS",
  GET_KITCHEN_FAILURE: "GET_KITCHEN_FAILURE",

  SUGAR_IDS: ["0 4", "0 5", "0 6"],
  SKETOS_ID: "1",
  EPILEKSTE_EIDOS_ZAXARHS: "Επιλέξτε είδος ζάχαρης",
  EPILEKSTE_ZAXARH: "Επιλέξτε ζάχαρη",

  //Statuses
  STATUS: ["not_sent", "sent", "processed", "completed"],
};

export default C;
