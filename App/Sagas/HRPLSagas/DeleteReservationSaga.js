import { call, put } from 'redux-saga/effects';
import {cancelReservation} from '../../Services/HRPLApi'
import ReduxActions from "../../Redux/ActionTypes/Action";

export const deleteReservation = function * (action) {
    const  reservation  = action.res;
    // make the call to the api
  const response = yield call(cancelReservation, reservation, reservation.ID);

  try {
    if (response==="CANCELLED") {
      // do data conversion here if needed
      yield put({type: ReduxActions.SUCCESSFULLY_DELETED_RESERVATIONS, response });
    } else {
      yield put({type: ReduxActions.FAILED_TO_DELETE_RESERVATIONS});
    }
  } catch (error) {
    yield put({type: ReduxActions.FAILED_TO_DELETE_RESERVATIONS});
  }
 
}