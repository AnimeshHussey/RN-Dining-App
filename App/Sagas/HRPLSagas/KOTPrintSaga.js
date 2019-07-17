import { call, put } from 'redux-saga/effects';
import {KOTPrinting} from '../../Services/HRPLApi'
import ReduxActions from "../../Redux/ActionTypes/Action";

export const doKOTPrinting = function * (action) {
  // make the call to the api
  const  KOTObj  = action.KOTObj;
  const response = yield call(KOTPrinting,KOTObj);
  try {
    if (response==="Sucessfully Printed") {
      // do data conversion here if needed
      yield put({type: ReduxActions.SUCCESSFULLY_PRINT_KOT, response });
    } else {
      yield put({type: ReduxActions.FAILED_TO_PRINT_KOT});
    }
  } catch (error) {
    yield put({type: ReduxActions.FAILED_TO_PRINT_KOT});
  }  
}