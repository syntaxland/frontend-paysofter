// store.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userTransactionReducer,
  createTransactionReducer,
} from "./reducers/transactionReducers";
import { userPayoutReducer } from "./reducers/payoutReducers";

import {
  userLoginReducers,
  userRegisterReducers,
} from "./reducers/userReducers";

import {
  sellerAccountReducer,
  getSellerAccountReducer,
  createBusinessStatusReducer,
getBusinessStatusReducer,
updateBusinessStatusReducer,
  updateSellerAccountReducer,
  getBusinessOwnerDetailsReducer,
updateBusinessOwnerDetailsReducer,
getBankAccountReducer,
updateBankAccountReducer,
getSellerBvnReducer,
updateSellerBvnReducer,
getSellerPhotoReducer,
updateSellerPhotoReducer,
  businessOwnerDetailReducer,
  sellerBankAccountReducer,
  sellerBvnReducer,
  sellerPhotoReducer,
} from "./reducers/sellerReducers";

import {
  fundAccountReducer,
  getUserAccountFundDebitsReducer,
  getAllAccountFundBalanceReducer,
  activateAccountFundReducer,
  getUserAccountFundCreditsReducer,
  toggleAccountFundReducer,
  disableAccountFundReducer,
  verifyOtpAccountFundReducer,
  setMaxFundReducer,
  getUserAccountBalanceReducer,
  userAccountFundListReducer,
} from "./reducers/AccountFundReducers";

import {
  cancelPromiseReducer,
  getAllPromiseReducer,
  settleDisputedPromiseReducer,
  getBuyerpromiseReducer,
  getSellerPromiseReducer,
  buyerConfirmPromiseReducer,
  sellerConfirmPromiseReducer,
  createPromiseMessagesReducer,
  listPromiseMessagesReducer,
} from "./reducers/PromiseReducers";

import {
  getUserProfileReducer,
  changePasswordReducer,
  updateUserProfileReducer,
  deleteUserProfileReducer,
  updateUserAvatarReducer,
  sendPasswordResetLinkReducer,
  resetPasswordReducer,
} from "./reducers/userProfileReducers";

import {
  emailOtpSendReducer,
  emailOtpVerifyReducer,
} from "./reducers/emailOtpReducers";

import {
  creditPointBalanceReducer,
  creditPointRequestCreateReducer,
} from "./reducers/creditPointReducers";

import { referralReducer } from "./reducers/promoReducer";
import { orderListReducer } from "./reducers/orderReducers";
const reducer = combineReducers({
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,

  emailOtpSend: emailOtpSendReducer,
  emailOtpVerify: emailOtpVerifyReducer,

  userProfile: getUserProfileReducer,
  updateProfile: updateUserProfileReducer,
  userChangePassword: changePasswordReducer,
  deleteProfile: deleteUserProfileReducer,
  updateUserAvatar: updateUserAvatarReducer,
  sendPasswordResetLink: sendPasswordResetLinkReducer,
  resetPassword: resetPasswordReducer,
  referral: referralReducer,

  userTransactions: userTransactionReducer,
  createTransactionState: createTransactionReducer,
  userPayouts: userPayoutReducer,

  fundAccountState: fundAccountReducer,
  getUserAccountFundDebitsState: getUserAccountFundDebitsReducer,
  getAllAccountFundBalanceState: getAllAccountFundBalanceReducer,
  activateAccountFundState: activateAccountFundReducer,
  getUserAccountFundCreditsState: getUserAccountFundCreditsReducer,
  toggleAccountFundState: toggleAccountFundReducer,
  disableAccountFundState: disableAccountFundReducer,
  verifyOtpAccountFundState: verifyOtpAccountFundReducer,
  setMaxFundState: setMaxFundReducer,
  userAccountBalanceState: getUserAccountBalanceReducer,
  userAccountFundListState: userAccountFundListReducer,
  getBuyerPromiseState: getBuyerpromiseReducer,
  getSellerPromiseState: getSellerPromiseReducer,
  buyerConfirmPromiseState: buyerConfirmPromiseReducer,
  sellerConfirmPromiseState: sellerConfirmPromiseReducer,

  cancelPromiseState: cancelPromiseReducer,
  getAllPromiseState: getAllPromiseReducer,
  settleDisputedPromiseState: settleDisputedPromiseReducer,
  createPromiseMessageState: createPromiseMessagesReducer,
  listPromiseMessageState: listPromiseMessagesReducer,

  creditPointBal: creditPointBalanceReducer,
  creditPointRequestCreate: creditPointRequestCreateReducer,

  createSellerAccountState: sellerAccountReducer,
  getSellerAccountState: getSellerAccountReducer,
  updateSellerAccountState: updateSellerAccountReducer,

  createBusinessStatusState: createBusinessStatusReducer,
getBusinessStatusState: getBusinessStatusReducer,
updateBusinessStatusState: updateBusinessStatusReducer,

  getBusinessOwnerDetailsState: getBusinessOwnerDetailsReducer,
updateBusinessOwnerDetailsState: updateBusinessOwnerDetailsReducer,
getBankAccountState: getBankAccountReducer,
updateBankAccountState: updateBankAccountReducer,
getSellerBvnState: getSellerBvnReducer,
updateSellerBvnState: updateSellerBvnReducer,
getSellerPhotoState: getSellerPhotoReducer,
updateSellerPhotoState: updateSellerPhotoReducer,

  businessOwnerDetailState: businessOwnerDetailReducer,
  sellerBankAccountState: sellerBankAccountReducer,
  sellerBvnState: sellerBvnReducer,
  sellerPhotoState: sellerPhotoReducer,

  orderList: orderListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
