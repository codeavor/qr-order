import { apiUrl } from "../../settings";

export const getMenu = (response, status = 200) => {
  let endpoint = "/api/menu";

  cy.route({
    method: "GET",
    status: status,
    url: apiUrl + endpoint,
    response,
  }).as("getMenu");
};

export const authFail = (response, status = 200) => {
  let endpoint = "/api/auth/register";

  cy.route({
    method: "POST",
    status: status,
    url: apiUrl + endpoint,
    response,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      umbrella_id: 1,
      role_name: "customer",
    },
  }).as("authFail");
};
