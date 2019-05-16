import { call, put } from 'redux-saga/effects';
import {clearReservations} from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const clearAllReservation = function * (action) {
  const  idArray  = action.ids;
  
  // make the call to the api
  const response = yield call(clearReservations, idArray);
  
  if (response==="CLEARED") {
    // do data conversion here if needed
    yield put({type: ReduxActions.SUCCESSFULLY_CLEARED_RESERVATIONS, response});
  } else {
    yield put({type: ReduxActions.FAILED_TO_CLEAR_RESERVATIONS, response});
  }
}