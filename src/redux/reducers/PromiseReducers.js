// PromiseReducers.js
import {
  GET_BUYER_PROMISE_REQUEST,
  GET_BUYER_PROMISE_SUCCESS,
  GET_BUYER_PROMISE_FAIL,
  GET_SELLER_PROMISE_REQUEST,
  GET_SELLER_PROMISE_SUCCESS,
  GET_SELLER_PROMISE_FAIL,
  BUYER_CONFIRM_PROMISE_REQUEST,
  BUYER_CONFIRM_PROMISE_SUCCESS,
  BUYER_CONFIRM_PROMISE_FAIL,
  SELLER_CONFIRM_PROMISE_REQUEST,
  SELLER_CONFIRM_PROMISE_SUCCESS,
  SELLER_CONFIRM_PROMISE_FAIL,
} from "../constants/PromiseConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
  promises: [],
};

export const getBuyerpromiseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUYER_PROMISE_REQUEST:
      return { ...state, loading: true };
    case GET_BUYER_PROMISE_SUCCESS:
      return { loading: false, success: true, promises: action.payload };
    case GET_BUYER_PROMISE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerPromiseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_PROMISE_REQUEST:
      return { ...state, loading: true };
    case GET_SELLER_PROMISE_SUCCESS:
      return { loading: false, success: true, promises: action.payload };
    case GET_SELLER_PROMISE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const buyerConfirmPromiseReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUYER_CONFIRM_PROMISE_REQUEST:
      return { ...state, loading: true };
    case BUYER_CONFIRM_PROMISE_SUCCESS:
      return { loading: false, success: true };
    case BUYER_CONFIRM_PROMISE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerConfirmPromiseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELLER_CONFIRM_PROMISE_REQUEST:
      return { ...state, loading: true };
    case SELLER_CONFIRM_PROMISE_SUCCESS:
      return { loading: false, success: true };
    case SELLER_CONFIRM_PROMISE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};