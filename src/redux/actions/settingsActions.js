// actions/settingsActions.js
import axios from "../../axiosConfig";
import {
  SELECT_CURRENCY_REQUEST,
  SELECT_CURRENCY_SUCCESS,
  SELECT_CURRENCY_FAIL,
  TOGGLE_API_STATUS_REQUEST,
  TOGGLE_API_STATUS_SUCCESS,
  TOGGLE_API_STATUS_FAIL,
} from "../constants/settingsConstants";

import { API_URL } from "../../config/apiConfig";

export const selecteCurrency = (currencyData) => async (dispatch, getState) => {
  try {
    dispatch({ type: SELECT_CURRENCY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/select-currency/`,
      currencyData,
      config
    );

    dispatch({
      type: SELECT_CURRENCY_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: SELECT_CURRENCY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const toggleApiKeyStatus = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TOGGLE_API_STATUS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/toggle-api-key-status/`,
      {},
      config
    );

    dispatch({
      type: TOGGLE_API_STATUS_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: TOGGLE_API_STATUS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// export const getSelectedCurrency = () => async (dispatch, getState) => {
//   try {
//     dispatch({ type: GET_SELECTED_CURRENCY_REQUEST });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userInfo.access}`,
//       },
//     };

//     const { data } = await axios.get(
//       `${API_URL}/api/get-selected-currency/`,
//       config
//     );

//     dispatch({ type: GET_SELECTED_CURRENCY_SUCCESS, payload: data });
//     return data;
//   } catch (error) {
//     dispatch({
//       type: GET_SELECTED_CURRENCY_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };
