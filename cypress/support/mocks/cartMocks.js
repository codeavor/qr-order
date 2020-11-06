import { apiUrl } from "../../settings";

export const getCart = (response, status = 200) => {
  let endpoint = "/api/cart/1";

  cy.route({
    method: "GET",
    status: status,
    url: apiUrl + endpoint,
    response,
  }).as("getCart");
};

export const deleteOrderItem = (response, status = 200) => {
  let endpoint = "/api/order_item/57";

  cy.route({
    method: "DELETE",
    status: status,
    url: apiUrl + endpoint,
    response,
  }).as("deleteOrderItem");
};

export const changeQuantity = (response, status = 200) => {
  let endpoint = "/api/order_item/58?quantity=2";

  cy.route({
    method: "PUT",
    status: status,
    url: apiUrl + endpoint,
    response,
  }).as("changeQuantity");
};
