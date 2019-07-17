import { call, put } from 'redux-saga/effects';
import {getReviewOrder} from '../../Services/HRPLApi'
import ReduxActions from "../../Redux/ActionTypes/Action";

export const getOrderDetails = function * (action) {
  // make the call to the api
  const response = yield call(getReviewOrder,action.OrderID,action.priceGroup);
  
  try {
    if (response) {
      // do data conversion here if needed
      yield put({type: ReduxActions.SUCCESSFULLY_GET_ORDER_DETAILS, response });
    } else {
      yield put({type: ReduxActions.FAILED_TO_GET_ORDER_DETAILS});
    }
  } catch (error) {
    yield put({type: ReduxActions.FAILED_TO_GET_ORDER_DETAILS});
  }
}