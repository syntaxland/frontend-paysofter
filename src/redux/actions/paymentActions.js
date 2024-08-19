// paymentActions.js
import axios from "axios";
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

import { API_URL } from "../../config/apiConfig";

export const createPaymentLink = (sellerData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PAYMENT_LINK_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/create-payment-link/`,
      sellerData,
      config
    );

    dispatch({
      type: CREATE_PAYMENT_LINK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PAYMENT_LINK_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getPaymentLinkDetail =
  (linkData) => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_PAYMENT_LINK_DETAIL_REQUEST });

      // const {
      //   userLogin: { userInfo },
      // } = getState();

      const config = {
        headers: {
          // "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
          // Authorization: `Bearer ${userInfo.access}`,
        },
      };

      // const { data } = await axios.get(
      //   `${API_URL}/api/get-payment-link-detail/`,
      //   linkData,
      //   config
      // );

      const { link_id, seller_username } = linkData;
      const url = `${API_URL}/api/get-payment-link-detail/?link_id=${link_id}&seller_username=${seller_username}`;
      const { data } = await axios.get(url, config);

      dispatch({
        type: GET_PAYMENT_LINK_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_PAYMENT_LINK_DETAIL_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const updatePaymentLink =
  (editLinkFormData) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_PAYMENT_LINK_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.put(
        `${API_URL}/api/update-payment-link/`,
        editLinkFormData,
        config
      );

      dispatch({
        type: UPDATE_PAYMENT_LINK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PAYMENT_LINK_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const deletePaymentLink = (linkData) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_PAYMENT_LINK_REQUEST });

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
      `${API_URL}/api/delete-payment-link/`,
      linkData,
      config
    );

    dispatch({
      type: DELETE_PAYMENT_LINK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PAYMENT_LINK_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getSellerPaymentLinks = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_SELLER_PAYMENT_LINKS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-seller-payment-links/`,
      config
    );

    dispatch({
      type: GET_SELLER_PAYMENT_LINKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SELLER_PAYMENT_LINKS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getPaymentApiKeys = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PAYMENT_API_KEYS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-payment-details/`,
      config
    );

    dispatch({
      type: GET_PAYMENT_API_KEYS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PAYMENT_API_KEYS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createPayment = (paymentData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_CREATE_REQUEST,
    });

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
      `${API_URL}/api/create-payment/`,
      paymentData,
      config
    );

    dispatch({
      type: PAYMENT_CREATE_SUCCESS,
      payload: data,
    });
    window.location.reload();
    window.location.href = "/dashboard";
  } catch (error) {
    dispatch({
      type: PAYMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listPayments = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-user-payments/`,
      config
    );

    dispatch({
      type: PAYMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getAllPaymentsList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_ALL_PAYMENTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-all-payments/`,
      config
    );

    dispatch({
      type: LIST_ALL_PAYMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_ALL_PAYMENTS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
