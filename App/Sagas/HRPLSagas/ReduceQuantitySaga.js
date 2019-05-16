import { call, put } from 'redux-saga/effects';
import { ReduceItemQuantity } from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const reduceQuantity = function * (action) {
    const itemObj=action.obj;
    // make the call to the api
    const response = yield call(ReduceItemQuantity,itemObj);
    if (typeof response!== 'object') {
      // do data conversion here if needed
      yield put({type: ReduxActions.SUCCESSFULLY_CHANGED_QUANTITY, response });
    } 
    else {
      yield put({type: ReduxActions.FAILED_CHANGED_QUANTITY});
    }
  }