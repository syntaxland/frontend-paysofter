// AccountFundActions.js
import axios from "axios";
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
} from "../constants/AccountFundConstants";

const API_URL = process.env.REACT_APP_API_URL;

export const fundUserAccount =
  (fundAccountData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_FUND_ACCOUNT_REQUEST,
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
        `${API_URL}/api/fund-user-account/`,
        fundAccountData,
        config
      );

      dispatch({
        type: USER_FUND_ACCOUNT_SUCCESS,
        payload: data,
      });
      window.location.href = "/dashboard";
      window.location.reload();
    } catch (error) {
      dispatch({
        type: USER_FUND_ACCOUNT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const setMaxWithdrawal = (amountData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SET_MAX_FUND_WITHDRAWAL_REQUEST,
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
      `${API_URL}/api/set-maximum-withdrawal/`,
      amountData,
      config
    );

    dispatch({
      type: SET_MAX_FUND_WITHDRAWAL_SUCCESS,
      payload: data,
    });
    // window.location.href = "/dashboard";
    window.location.reload();
  } catch (error) {
    dispatch({
      type: SET_MAX_FUND_WITHDRAWAL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const toggleAccountFund = (toggleData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TOGGLE_ACCCOUNT_FUND_REQUEST,
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
      `${API_URL}/api/toggle-activate-account/`,
      toggleData,
      config
    );

    dispatch({
      type: TOGGLE_ACCCOUNT_FUND_SUCCESS,
      payload: data,
    });
    window.location.href = "/dashboard";
    window.location.reload();
  } catch (error) {
    dispatch({
      type: TOGGLE_ACCCOUNT_FUND_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const disableAccountFund =
  (amountData) => async (dispatch) => {
    try {
      dispatch({
        type: DISABLE_ACCCOUNT_FUND_REQUEST,
      });

      // const {
      //   userLogin: { userInfo },
      // } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/send-otp-account-disable/`,
        amountData,
        config
      );

      dispatch({
        type: DISABLE_ACCCOUNT_FUND_SUCCESS,
        payload: data,
      });
      // window.location.href = "/dashboard";
      // window.location.reload();
    } catch (error) {
      dispatch({
        type: DISABLE_ACCCOUNT_FUND_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const verifyOtpDisableAccountFund =
  (otpData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: VERIFY_OTP_DISABLE_ACCCOUNT_FUND_REQUEST,
      });

      // const {
      //   userLogin: { userInfo },
      // } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/verify-account-fund-disable/`,
        otpData,
        config
      );

      dispatch({
        type: VERIFY_OTP_DISABLE_ACCCOUNT_FUND_SUCCESS,
        payload: data,
      });
      // window.location.href = "/dashboard";
      window.location.reload();
    } catch (error) {
      dispatch({
        type: VERIFY_OTP_DISABLE_ACCCOUNT_FUND_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getUserAccountFundBalance = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ACCOUNT_FUND_BALANCE_REQUEST,
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
      `${API_URL}/api/get-user-acount-balance/`,
      config
    );

    dispatch({
      type: USER_ACCOUNT_FUND_BALANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ACCOUNT_FUND_BALANCE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userAccountFundList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ACCOUNT_FUND_LIST_REQUEST,
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
      `${API_URL}/api/user-account-funds/`,
      config
    );

    dispatch({
      type: USER_ACCOUNT_FUND_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ACCOUNT_FUND_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
