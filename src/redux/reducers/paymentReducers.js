// paymentReducers.js

import {
  PAYMENT_CREATE_REQUEST,
  PAYMENT_CREATE_SUCCESS,
  PAYMENT_CREATE_FAIL,
  PAYMENT_LIST_REQUEST,
  PAYMENT_LIST_SUCCESS,
  PAYMENT_LIST_FAIL,
  LIST_ALL_PAYMENTS_REQUEST,
  LIST_ALL_PAYMENTS_SUCCESS,
  LIST_ALL_PAYMENTS_FAIL,
  GET_PAYMENT_API_KEYS_REQUEST,
  GET_PAYMENT_API_KEYS_SUCCESS,
  GET_PAYMENT_API_KEYS_FAIL,
  CREATE_PAYMENT_LINK_REQUEST,
  CREATE_PAYMENT_LINK_SUCCESS,
  CREATE_PAYMENT_LINK_FAIL,
  UPDATE_PAYMENT_LINK_REQUEST,
  UPDATE_PAYMENT_LINK_SUCCESS,
  UPDATE_PAYMENT_LINK_FAIL,
  GET_PAYMENT_LINK_DETAIL_REQUEST,
  GET_PAYMENT_LINK_DETAIL_SUCCESS,
  GET_PAYMENT_LINK_DETAIL_FAIL,
  GET_SELLER_PAYMENT_LINKS_REQUEST,
  GET_SELLER_PAYMENT_LINKS_SUCCESS,
  GET_SELLER_PAYMENT_LINKS_FAIL,

  DELETE_PAYMENT_LINK_REQUEST,
DELETE_PAYMENT_LINK_SUCCESS,
DELETE_PAYMENT_LINK_FAIL,
} from "../constants/paymentConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
  payments: [],
  paystackPublicKey: [],
  paysofterPublicKey: [],
  paymentLinks: [],
  sellerBusinessName: [],
  sellerTradingName: [],
  sellerTestApiKey: [],
  sellerLiveApiKey: [],
  isSellerApiKeyLive: [],
  sellerLogo: [],
};

export const deletePaymentLinkReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PAYMENT_LINK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PAYMENT_LINK_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_PAYMENT_LINK_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createPaymentLinkReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PAYMENT_LINK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PAYMENT_LINK_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CREATE_PAYMENT_LINK_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updatePaymentLinkReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PAYMENT_LINK_REQUEST:
      return { loading: true };
    case UPDATE_PAYMENT_LINK_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_PAYMENT_LINK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getPaymentLinkDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAYMENT_LINK_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PAYMENT_LINK_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        paymentLinks: action.payload.data,
        sellerBusinessName: action.payload.seller_business_name,
        sellerTradingName: action.payload.seller_trading_name,
        sellerTestApiKey: action.payload.seller_test_api_key,
        sellerLiveApiKey: action.payload.seller_live_api_key,
        isSellerApiKeyLive: action.payload.is_seller_api_key_live,
        sellerLogo: action.payload.seller_logo,

      };
    case GET_PAYMENT_LINK_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getSellerPaymentLinksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_PAYMENT_LINKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SELLER_PAYMENT_LINKS_SUCCESS:
      return {
        ...state,
        loading: false,
        paymentLinks: action.payload,
      };
    case GET_SELLER_PAYMENT_LINKS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getPaymentApiKeysReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAYMENT_API_KEYS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PAYMENT_API_KEYS_SUCCESS:
      return {
        ...state,
        loading: false,
        paystackPublicKey: action.payload.paystackPublicKey,
        paysofterPublicKey: action.payload.paysofterPublicKey,
      };
    case GET_PAYMENT_API_KEYS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const paymentCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PAYMENT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PAYMENT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const paymentListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PAYMENT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        payments: action.payload,
      };
    case PAYMENT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const listAllPaymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_ALL_PAYMENTS_REQUEST:
      return { ...state, loading: true };
    case LIST_ALL_PAYMENTS_SUCCESS:
      return { loading: false, payments: action.payload };
    case LIST_ALL_PAYMENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
