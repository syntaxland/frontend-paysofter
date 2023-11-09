// AccountFundReducers.js
import {
  USER_FUND_ACCOUNT_REQUEST,
  USER_FUND_ACCOUNT_SUCCESS,
  USER_FUND_ACCOUNT_FAIL,
  USER_ACCOUNT_FUND_BALANCE_REQUEST,
  USER_ACCOUNT_FUND_BALANCE_SUCCESS,
  USER_ACCOUNT_FUND_BALANCE_FAIL,
  USER_ACCOUNT_FUND_LIST_REQUEST,
  USER_ACCOUNT_FUND_LIST_SUCCESS,
  USER_ACCOUNT_FUND_LIST_FAIL,
  SET_MAX_FUND_WITHDRAWAL_REQUEST,
  SET_MAX_FUND_WITHDRAWAL_SUCCESS,
  SET_MAX_FUND_WITHDRAWAL_FAIL,
  TOGGLE_ACCCOUNT_FUND_REQUEST,
  TOGGLE_ACCCOUNT_FUND_SUCCESS,
  TOGGLE_ACCCOUNT_FUND_FAIL,
} from "../constants/AccountFundConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
  accountFunds: [],
  accountFund: [],
  accountFundBalance: [],
};

export const toggleAccountFundReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ACCCOUNT_FUND_REQUEST:
      return { loading: true };
    case TOGGLE_ACCCOUNT_FUND_SUCCESS:
      return {
        loading: false,
        success: true,
        accountFunds: action.payload,
      };
    case TOGGLE_ACCCOUNT_FUND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const setMaxFundReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAX_FUND_WITHDRAWAL_REQUEST:
      return { loading: true };
    case SET_MAX_FUND_WITHDRAWAL_SUCCESS:
      return {
        loading: false,
        success: true,
        accountFunds: action.payload,
      };
    case SET_MAX_FUND_WITHDRAWAL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const fundAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_FUND_ACCOUNT_REQUEST:
      return { loading: true };
    case USER_FUND_ACCOUNT_SUCCESS:
      return {
        loading: false,
        success: true,
        accountFunds: action.payload,
      };
    case USER_FUND_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserAccountBalanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACCOUNT_FUND_BALANCE_REQUEST:
      return { loading: true };
    case USER_ACCOUNT_FUND_BALANCE_SUCCESS:
      return {
        loading: false,
        success: true,
        accountFundBalance: action.payload,
      };
    case USER_ACCOUNT_FUND_BALANCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userAccountFundListReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACCOUNT_FUND_LIST_REQUEST:
      return { loading: true };
    case USER_ACCOUNT_FUND_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        accountFunds: action.payload,
      };
    case USER_ACCOUNT_FUND_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
