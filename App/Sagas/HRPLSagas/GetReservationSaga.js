import { call, put } from 'redux-saga/effects';
import {getAllReservations} from '../../Services/HRPLApi'
import ReduxActions from "../../Redux/ActionTypes/Action";

export const getReservation = function * (action) {
  // make the call to the api
  const response = yield call(getAllReservations);
  if (response) {
    // do data conversion here if needed
    yield put({type: ReduxActions.SAVE_ALL_RESERVATIONS, response });
  } else {
    yield put({type: ReduxActions.FAILED_TO_GET_RESERVATIONS});
  }
}