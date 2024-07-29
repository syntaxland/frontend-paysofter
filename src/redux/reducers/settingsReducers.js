// settingsReducers.js
import {
  SELECT_CURRENCY_REQUEST,
  SELECT_CURRENCY_SUCCESS,
  SELECT_CURRENCY_FAIL,
  GET_SELECTED_CURRENCY_REQUEST,
  GET_SELECTED_CURRENCY_SUCCESS,
  GET_SELECTED_CURRENCY_FAIL,
  TOGGLE_API_STATUS_REQUEST,
  TOGGLE_API_STATUS_SUCCESS,
  TOGGLE_API_STATUS_FAIL,
} from "../constants/settingsConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
  currencies: [],
  
};

export const toggleApiKeyStatusStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_API_STATUS_REQUEST:
      return { loading: true };
    case TOGGLE_API_STATUS_SUCCESS:
      return { loading: false, success: true };
    case TOGGLE_API_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const selecteCurrencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CURRENCY_REQUEST:
      return { loading: true };
    case SELECT_CURRENCY_SUCCESS:
      return { loading: false, success: true };
    case SELECT_CURRENCY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSelectedCurrencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELECTED_CURRENCY_REQUEST:
      return { loading: true };
    case GET_SELECTED_CURRENCY_SUCCESS:
      return { loading: false, success: true, currencies: action.payload };
    case GET_SELECTED_CURRENCY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
