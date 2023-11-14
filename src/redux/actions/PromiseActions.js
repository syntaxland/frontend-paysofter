// PromiseActions.js
import axios from "axios";
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
  CREATE_PROMISE_MESSAGE_REQUEST,
  CREATE_PROMISE_MESSAGE_SUCCESS,
  CREATE_PROMISE_MESSAGE_FAIL,
  LIST_PROMISE_MESSAGE_REQUEST,
  LIST_PROMISE_MESSAGE_SUCCESS,
  LIST_PROMISE_MESSAGE_FAIL,
} from "../constants/PromiseConstants";

const API_URL = process.env.REACT_APP_API_URL;

export const createPromiseMessages =
  (promiseMessageData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_PROMISE_MESSAGE_REQUEST,
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
        `${API_URL}/api/create-promise-messages/`,
        promiseMessageData,
        config
      );

      dispatch({
        type: CREATE_PROMISE_MESSAGE_SUCCESS,
        payload: data,
      });
      // window.location.href = "/promise";
      // window.location.reload();
    } catch (error) {
      dispatch({
        type: CREATE_PROMISE_MESSAGE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// export const listPromiseMessage =
//   (promiseId) => async (dispatch, getState) => {
//     try {
//       dispatch({
//         type: LIST_PROMISE_MESSAGE_REQUEST,
//       });

//       const {
//         userLogin: { userInfo },
//       } = getState();

//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userInfo.access}`,
//         },
//       };

//       const { data } = await axios.get(
//         `${API_URL}/api/list-promise-messages/`,
//         promiseId,
//         config
//       );

//       dispatch({
//         type: LIST_PROMISE_MESSAGE_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       dispatch({
//         type: LIST_PROMISE_MESSAGE_FAIL,
//         payload:
//           error.response && error.response.data.detail
//             ? error.response.data.detail
//             : error.message,
//       });
//     }
//   };

  export const listPromiseMessages = (promiseId) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({ type: LIST_PROMISE_MESSAGE_REQUEST });
  
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
        `${API_URL}/api/list-promise-messages/${promiseId}/`,
        config
      );
  
      dispatch({ type: LIST_PROMISE_MESSAGE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: LIST_PROMISE_MESSAGE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getSellerPromises = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_SELLER_PROMISE_REQUEST,
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
      `${API_URL}/api/get-seller-promise/`,
      config
    );

    dispatch({
      type: GET_SELLER_PROMISE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SELLER_PROMISE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getBuyerPromises = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_BUYER_PROMISE_REQUEST,
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
      `${API_URL}/api/get-buyer-promise/`,
      config
    );

    dispatch({
      type: GET_BUYER_PROMISE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BUYER_PROMISE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const buyerConfirmPromise =
  (promiseData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BUYER_CONFIRM_PROMISE_REQUEST,
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
        `${API_URL}/api/buyer-confirm-promise/`,
        promiseData,
        config
      );

      dispatch({
        type: BUYER_CONFIRM_PROMISE_SUCCESS,
        payload: data,
      });
      // window.location.href = "/promise";
      // window.location.reload();
    } catch (error) {
      dispatch({
        type: BUYER_CONFIRM_PROMISE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const sellerConfirmPromise =
  (promiseData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SELLER_CONFIRM_PROMISE_REQUEST,
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
        `${API_URL}/api/seller-confirm-promise/`,
        promiseData,
        config
      );

      dispatch({
        type: SELLER_CONFIRM_PROMISE_SUCCESS,
        payload: data,
      });
      window.location.href = "/dashboard";
      window.location.reload();
    } catch (error) {
      dispatch({
        type: SELLER_CONFIRM_PROMISE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
