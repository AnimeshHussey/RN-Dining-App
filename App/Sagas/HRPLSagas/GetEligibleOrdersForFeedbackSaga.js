import { call, put } from 'redux-saga/effects';
import {getEligibleOrders} from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const GetFeedbackOrders = function * (action) {
  //yield put({type: ReduxActions.SET_API_CALL});
  // make the call to the api
  
  const response = yield call(getEligibleOrders);
  
  try {
    if (response) {
    
      // do data conversion here if needed
      yield put({type: ReduxActions.SET_ELIGIBLE_ORDERS, response });
    } else {
      yield put({type: ReduxActions.ERROR_GET_ELIGIBLE_ORDERS});
    }
  } catch (error) {
    yield put({type: ReduxActions.ERROR_GET_ELIGIBLE_ORDERS});
  }
}