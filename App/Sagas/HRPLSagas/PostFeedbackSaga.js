import { call, put } from 'redux-saga/effects';
import {postFeedbackQuesAns} from '../../Services/HRPLApi'
import ReduxActions from "../../Redux/ActionTypes/Action";

export const postFeedbackSaga = function * (action) {
  const feedbackQuesAns = action.feed;
  const orderID = action.orderID;
  const mqs ={ "Mqs": feedbackQuesAns, "OrderID": orderID};
  // make the call to the api
  const response = yield call(postFeedbackQuesAns, mqs, orderID);
  //  ==='inserted'
  if (response  ==='inserted') {
    // do data conversion here if needed
    yield put({type: ReduxActions.SUCCESSFULLY_SET_FFEDBACK_QUESTIONS});
  } else {
    yield put({type: ReduxActions.FAILED_TO_SET_FFEDBACK_QUESTIONS});
  }
}