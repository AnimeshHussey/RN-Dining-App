import { call, put } from 'redux-saga/effects';
import {getCustomer} from '../../Services/HRPLApi'
import ReduxActions from "../../Redux/ActionTypes/Action";

export const getUser = function * (action) {
    const mobileNumber=action.mobileNumber;
    const isResOpen= action.isResOpen;
  // make the call to the api
  const response = yield call(getCustomer,mobileNumber);
 try {
  if (response!=="Mobile number is not registered !") {
    if(isResOpen){
      yield put({type: ReduxActions.SET_BOOKING_NAME, bookingName: response.CustomerName });
    }
    else{
      yield put({type: ReduxActions.SUCCESSFULLY_GET_USER, response});
    }
  } 
  else {
    yield put({type: ReduxActions.FAILED_TO_GET_USER});
  }
 } catch (error) {
  yield put({type: ReduxActions.FAILED_TO_GET_USER});
 }
}