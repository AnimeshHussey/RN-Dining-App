import { call, put } from 'redux-saga/effects';
import { createUser } from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const registerUser = function * (action) {
    const custObj=action.customer;
    // make the call to the api
    const response = yield call(createUser,custObj);
    try {
      if (typeof response!== 'object') {
        // do data conversion here if needed
        yield put({type: ReduxActions.IS_USER_REGISTERED, response });
      } 
      else {
        yield put({type: ReduxActions.FAILED_TO_REGISTER_USER});
      }
    } catch (error) {
      yield put({type: ReduxActions.FAILED_TO_REGISTER_USER});
    }
  }