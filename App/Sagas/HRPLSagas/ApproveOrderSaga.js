import { call, put } from 'redux-saga/effects';
import {approveOrder} from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const approveOrderSaga = function * (action) {
  const  OrderObj  = action.approveObj;
  
  // make the call to the api
  const response = yield call(approveOrder, OrderObj);
  
  try {
    if (typeof response==='object' && response.isroundApproved===true) {
      // do data conversion here if needed 
      yield put({type: ReduxActions.SUCCESSFULLY_APPROVED_ORDER});
    } else {
      yield put({type: ReduxActions.FAILED_TO_APPROVE_ORDER});
    }
  } catch (error) {
    yield put({type: ReduxActions.FAILED_TO_APPROVE_ORDER});
  }
}