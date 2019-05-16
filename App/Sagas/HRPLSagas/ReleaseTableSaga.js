import { call, put } from 'redux-saga/effects';
import {tableRelease} from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const releaseTable = function * (action) {
  // make the call to the api
  const response = yield call(tableRelease, action.id,action.orderExistAndEmpty,action.Captain);
  if (response==="Successfully released the table.") {
    // do data conversion here if needed
    yield put({type: ReduxActions.SUCCESSFULLY_RELEASED_TABLE});
  } else {
    yield put({type: ReduxActions.FAILED_TO_RELEASE_TABLE});
  }
}