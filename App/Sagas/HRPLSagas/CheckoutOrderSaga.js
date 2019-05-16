import { call, put } from 'redux-saga/effects';
import {createOrder} from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const checkoutOrder = function * (action) {
  const  OrderObj  = action.Obj;
  // make the call to the api
  const response = yield call(createOrder, OrderObj);
  
  if (response.split("-").length===4) {
    // do data conversion here if needed
    yield put({type: ReduxActions.SUCCESSFULLY_CHECKEDOUT_ORDER, response});
  } else {
    yield put({type: ReduxActions.FAILED_TO_CHECKEDOUT_ORDER, response});
  }
}