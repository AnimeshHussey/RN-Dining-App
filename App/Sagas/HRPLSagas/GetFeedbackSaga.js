import { call, put } from 'redux-saga/effects';
import {getFeedbackQuestions} from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const GetFeedbackQuestions = function * (action) {
  //yield put({type: ReduxActions.SET_API_CALL});
  // make the call to the api
  
  const response = yield call(getFeedbackQuestions);
  try {
    if (response) {    
      // do data conversion here if needed
      yield put({type: ReduxActions.SET_FEEDBACK_QUESTIONS, response});
    } else {
      yield put({type: ReduxActions.ERROR_FEEDBACK_QUESTIONS});
    }
  } catch (error) {
    yield put({type: ReduxActions.ERROR_FEEDBACK_QUESTIONS});
  }
}