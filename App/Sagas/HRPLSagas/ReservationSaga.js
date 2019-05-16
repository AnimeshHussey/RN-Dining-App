import { call, put } from 'redux-saga/effects';
import {reserveTable} from '../../Services/HRPLApi'
import ReduxActions from "../../Redux/ActionTypes/Action";

export const saveReservation = function * (action) {
  const newReservation = action.objReservation;
  // make the call to the api
  const response = yield call(reserveTable, newReservation);
  if (/^\d+$/.test(response)) {
    // do data conversion here if needed
    yield put({type: ReduxActions.RESERVATION_DETAILS_SAVED, response });
  } else {
    yield put({type: ReduxActions.FAILED_TO_SET_RESERVATION_DETAILS});
  }
}