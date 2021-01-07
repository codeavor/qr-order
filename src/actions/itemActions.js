import axios from "axios";
import { handleError } from "./errorActions";
import C from "../constants";
import { fixItem, getInitializedExtras } from "../utils/extra/extraUtils";

export const getItemRequest = () => {
  return {
    type: C.GET_ITEM,
  };
};

export const getItemSuccess = (item) => {
  return {
    type: C.GET_ITEM_SUCCESS,
    payload: item,
  };
};

export const getItemFailure = () => {
  return {
    type: C.GET_ITEM_FAILURE,
  };
};

export const setExtraValues = (values) => {
  return {
    type: C.SET_EXTRA_VALUES,
    payload: values,
  };
};

export const getItem = (id) => {
  return function (dispatch) {
    dispatch(getItemRequest());
    axios
      .get(`${C.API_URL + C.MENU_ENDPOINT}/${id}`)
      .then((response) => {
        const item = fixItem(response.data);
        dispatch(getItemSuccess(item));
        dispatch(setExtraValues(getInitializedExtras(item.extra_categories)));
      })
      .catch((error) => {
        dispatch(getItemFailure());
        dispatch(handleError(error.response.data.error));
      });
  };
};
