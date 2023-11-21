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
  DISABLE_ACCCOUNT_FUND_REQUEST,
  DISABLE_ACCCOUNT_FUND_SUCCESS,
  DISABLE_ACCCOUNT_FUND_FAIL,
  VERIFY_OTP_DISABLE_ACCCOUNT_FUND_REQUEST,
  VERIFY_OTP_DISABLE_ACCCOUNT_FUND_SUCCESS,
  VERIFY_OTP_DISABLE_ACCCOUNT_FUND_FAIL,
  GET_USER_FUND_ACCOUNT_DEBITS_REQUEST,
  GET_USER_FUND_ACCOUNT_DEBITS_SUCCESS,
  GET_USER_FUND_ACCOUNT_DEBITS_FAIL,
  GET_USER_FUND_ACCOUNT_CREDITS_REQUEST,
  GET_USER_FUND_ACCOUNT_CREDITS_SUCCESS,
  GET_USER_FUND_ACCOUNT_CREDITS_FAIL,
  GET_All_ACCOUNT_FUND_BALANCE_REQUEST,
  GET_All_ACCOUNT_FUND_BALANCE_SUCCESS,
  GET_All_ACCOUNT_FUND_BALANCE_FAIL,
  ADMIN_ACTIVATE_ACCCOUNT_FUND_REQUEST,
ADMIN_ACTIVATE_ACCCOUNT_FUND_SUCCESS,
ADMIN_ACTIVATE_ACCCOUNT_FUND_FAIL,
} from "../constants/AccountFundConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
  accountFunds: [],
  accountFund: [],
  accountFundBalance: [],
  formattedEmail: [],
};

export const activateAccountFundReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADMIN_ACTIVATE_ACCCOUNT_FUND_REQUEST:
      return { loading: true };
    case ADMIN_ACTIVATE_ACCCOUNT_FUND_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_ACTIVATE_ACCCOUNT_FUND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllAccountFundBalanceReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_All_ACCOUNT_FUND_BALANCE_REQUEST:
      return { loading: true };
    case GET_All_ACCOUNT_FUND_BALANCE_SUCCESS:
      return {
        loading: false,
        success: true,
        accountFunds: action.payload,
      };
    case GET_All_ACCOUNT_FUND_BALANCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserAccountFundDebitsReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_USER_FUND_ACCOUNT_DEBITS_REQUEST:
      return { loading: true };
    case GET_USER_FUND_ACCOUNT_DEBITS_SUCCESS:
      return {
        loading: false,
        success: true,
        accountFunds: action.payload,
      };
    case GET_USER_FUND_ACCOUNT_DEBITS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserAccountFundCreditsReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_USER_FUND_ACCOUNT_CREDITS_REQUEST:
      return { loading: true };
    case GET_USER_FUND_ACCOUNT_CREDITS_SUCCESS:
      return {
        loading: false,
        success: true,
        accountFunds: action.payload,
      };
    case GET_USER_FUND_ACCOUNT_CREDITS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const disableAccountFundReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISABLE_ACCCOUNT_FUND_REQUEST:
      return { loading: true };
    case DISABLE_ACCCOUNT_FUND_SUCCESS:
      return {
        loading: false,
        success: true,
        formattedEmail: action.payload.formattedEmail,
      };
    case DISABLE_ACCCOUNT_FUND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const verifyOtpAccountFundReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_OTP_DISABLE_ACCCOUNT_FUND_REQUEST:
      return { loading: true };
    case VERIFY_OTP_DISABLE_ACCCOUNT_FUND_SUCCESS:
      return {
        loading: false,
        success: true,
        formattedEmail: action.payload.formattedEmail,
      };
    case VERIFY_OTP_DISABLE_ACCCOUNT_FUND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
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
