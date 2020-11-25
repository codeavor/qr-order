import { apiUrl } from "../../settings";

export const item = (endpoint, method, response, status = 200) => {
  cy.route({
    method: method,
    status: status,
    url: apiUrl + endpoint,
    response,
  }).as("item");
};

export const orderItem = (endpoint, method, status = 200) => {
  cy.route({
    method: method,
    status: status,
    url: apiUrl + endpoint,
    data: {
      order_id: 1,
      item_id: 1,
      quantity: 1,
      extras_id: [
        {
          extra_id: 7,
        },
        {
          extra_id: 1,
        },
        {
          extra_id: 10,
        },
      ],
    },
    response: {},
  }).as("orderItem");
};
