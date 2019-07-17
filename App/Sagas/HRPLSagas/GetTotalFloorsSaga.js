import { call, put } from 'redux-saga/effects';
import {getTotalNoOfFloors} from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const GetTotalFloor = function * (action) {
  //yield put({type: ReduxActions.SET_API_CALL});
  // make the call to the api
  const response = yield call(getTotalNoOfFloors);
  
  try {
    if (response) {
      // do data conversion here if needed
      yield put({type: ReduxActions.SET_TOTAL_FLOOR, response });
      yield put({ type: ReduxActions.SET_SELECTED_SECTION,section:response[0]});
    } else {
      yield put({type: ReduxActions.FAILED_TO_SET_TOTAL_FLOOR});
    }
  } catch (error) {
    yield put({type: ReduxActions.FAILED_TO_SET_TOTAL_FLOOR});
  }
}