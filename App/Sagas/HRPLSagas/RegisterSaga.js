import { call, put } from 'redux-saga/effects';
import {RegisterCaptain} from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const registerCaptain = function * (action) {
  const  loginId  = action.loginId;
  // make the call to the api
  const response = yield call(RegisterCaptain, loginId);
  try {
    if (response===loginId.MOBILENO) {
      // do data conversion here if needed
      yield put({type: ReduxActions.SUCCESSFULLY_REGISTERED, response});
    } 
    else if(response==="Please provide a valid User name !"){
      yield put({type: ReduxActions.FAILED_TO_REGISTER,response});
    }
    else if (response==="Number already registered.") {
      // do data conversion here if needed
      yield put({type: ReduxActions.USER_ALREADY_EXISTS, response});
    }
    else {
      yield put({type: ReduxActions.FAILED_TO_REGISTER,response});
    }
  } catch (error) {
    yield put({type: ReduxActions.FAILED_TO_REGISTER,response});
  }
}