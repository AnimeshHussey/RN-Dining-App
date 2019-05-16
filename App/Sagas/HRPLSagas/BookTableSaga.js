import { call, put } from 'redux-saga/effects';
import { occupyTable } from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const bookTable = function * (action) {
    const tableId=action.id;
    // make the call to the api
    const response = yield call(occupyTable, tableId);
    if (response === "Successfully booked the table.") {
      // do data conversion here if needed
      yield put({type: ReduxActions.SUCCESSFULLY_BOOKED_TABLE, response });
    } else {
      yield put({type: ReduxActions.FAILED_TO_BOOK_TABLE});
    }
  }