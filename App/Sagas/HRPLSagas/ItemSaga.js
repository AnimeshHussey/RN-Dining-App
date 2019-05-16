import { call, put } from 'redux-saga/effects';
import { getAllItems } from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const getAllItemsDetails = function * (action) {
    // make the call to the api
    const response = yield call(getAllItems,action.Pricegroup);
    if (response) {
      // do data conversion here if needed
      yield put({type: ReduxActions.GOT_ALL_ITEMS, response });
    } else {
      yield put({type: ReduxActions.FAILED_TO_GET_ITEMS});
    }
  }