import { call, put } from 'redux-saga/effects';
import {undoCheckout} from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const undoCheckoutTable = function * (action) {
  // make the call to the api
  const response = yield call(undoCheckout, action.id,action.orderiD);
  if(response.split("-").length===4)
  {
  if (response===action.orderiD) {
    // do data conversion here if needed
    yield put({type: ReduxActions.UNDO_CHECKOUT_SUCESSFULLY});
  } else {
    yield put({type: ReduxActions.UNDO_CHECKOUT_FAILED});
  }
}
else{
    yield put({type: ReduxActions.UNDO_CHECKOUT_FAILED});
}
}