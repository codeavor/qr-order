import { cyan } from "@material-ui/core/colors";

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
