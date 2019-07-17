import { call, put } from 'redux-saga/effects';
import {modifyReservationById} from '../../Services/HRPLApi'
import ReduxActions from "../../Redux/ActionTypes/Action";

export const modifyReservation = function * (action) {
  const objToModify=action.objModify;
  // make the call to the api
  const response = yield call(modifyReservationById, objToModify,objToModify.ID );
  try {
    if (response==="MODIFIED") {
      // do data conversion here if needed
      yield put({type: ReduxActions.SUCCESFULLY_MODIFIED_RESERVATION, response });
    } else {
      yield put({type: ReduxActions.FAILED_TO_MODIFY_RESERVATIONS});
    }
  } catch (error) {
    yield put({type: ReduxActions.FAILED_TO_MODIFY_RESERVATIONS});
  }
}