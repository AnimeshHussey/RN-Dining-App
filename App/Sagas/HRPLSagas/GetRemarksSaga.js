import { call, put } from 'redux-saga/effects';
import {getRemarks} from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const GetRemarks = function * (action) {
  //yield put({type: ReduxActions.SET_API_CALL});
  // make the call to the api
  
  const response = yield call(getRemarks);
  
  try {
    if (response) {
      // do data conversion here if needed
      yield put({type: ReduxActions.SET_REMARKS, response });
    } else {
      yield put({type: ReduxActions.ERROR_REMARKS});
    }
  } catch (error) {
    yield put({type: ReduxActions.ERROR_REMARKS});
  }
}