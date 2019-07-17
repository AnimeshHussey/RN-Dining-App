import { call, put } from 'redux-saga/effects';
import {selectReservTable} from '../../Services/HRPLApi'
import ReduxActions from "../../Redux/ActionTypes/Action";

export const selectReserveTable = function * (action) {
  const newReservation = action.objResrvTable;
  // make the call to the api
  const response = yield call(selectReservTable, newReservation);
  try {
    if (/^\d+$/.test(response)) {
      // do data conversion here if needed
      yield put({type: ReduxActions.SUCCESSFULLY_RESERVED_TABLE, response });
    } else {
      yield put({type: ReduxActions.FAILED_TO_RESERVED_TABLE});
    }
  } catch (error) {
    yield put({type: ReduxActions.FAILED_TO_RESERVED_TABLE});
  }
}