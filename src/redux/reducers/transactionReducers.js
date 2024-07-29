// transactionReducers.js
import {
  USER_TRANSACTION_REQUEST,
  USER_TRANSACTION_SUCCESS,
  USER_TRANSACTION_FAIL,

  TRANSACTION_CREATE_REQUEST,
TRANSACTION_CREATE_SUCCESS,
TRANSACTION_CREATE_FAIL,
GET_USER_TRANSACTIONS_TEST_REQUEST,
GET_USER_TRANSACTIONS_TEST_SUCCESS,
GET_USER_TRANSACTIONS_TEST_FAIL,
} from "../constants/transactionConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
  transactions: [],
};

export const getUserTransactionsTestReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_TRANSACTIONS_TEST_REQUEST:
      return { ...state, loading: true };
    case GET_USER_TRANSACTIONS_TEST_SUCCESS:
      return { loading: false, success: true, transactions: action.payload };
    case GET_USER_TRANSACTIONS_TEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userTransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TRANSACTION_REQUEST:
      return { ...state, loading: true };
    case USER_TRANSACTION_SUCCESS:
      return { loading: false, success: true, transactions: action.payload };
    case USER_TRANSACTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createTransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTION_CREATE_REQUEST:
      return { ...state, loading: true };
    case TRANSACTION_CREATE_SUCCESS:
      return { loading: false, success: true, transactions: action.payload };
    case TRANSACTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
