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
