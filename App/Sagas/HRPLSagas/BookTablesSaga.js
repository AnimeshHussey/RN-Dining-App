import { call, put } from 'redux-saga/effects';
import { bookTables } from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const occupyTables = function * (action) {
    const tableIds=action.childTables;
    // make the call to the api
    const response = yield call(bookTables, tableIds);
    
    try {
      if (response === "Successfully booked the table.") {
        // do data conversion here if needed
        yield put({type: ReduxActions.SUCCESSFULLY_BOOKED_TABLES, response });
      } else {
        yield put({type: ReduxActions.FAILED_TO_BOOK_TABLES});
      } 
    } catch (error) {
      yield put({type: ReduxActions.FAILED_TO_BOOK_TABLES});
    }
    
  }