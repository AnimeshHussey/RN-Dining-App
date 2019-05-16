import { call, put } from 'redux-saga/effects';
import {getReviewOrder} from '../../Services/HRPLApi'
import ReduxActions from "../../Redux/ActionTypes/Action";

export const getCheckoutOrderDetails = function * (action) {    
  // make the call to the api
  const response = yield call(getReviewOrder,action.OrderID,action.priceGroup);
  if (response) {
    // do data conversion here if needed
    yield put({type: ReduxActions.SUCCESSFULLY_G0T_CHECKOUT_ORDER_DETAILS, response });
  } else {
    yield put({type: ReduxActions.FAILED_TO_GET_CHECKOUT_ORDER_DETAILS});
  }
}