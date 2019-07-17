import { call, put } from 'redux-saga/effects';
import { unblockTable } from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const UnblockTable = function * (action) {
    const tableId=action.id;
    // make the call to the api
    const response = yield call(unblockTable, tableId);
    
    try {
      if (response === "Successfully booked the table.") {
        // do data conversion here if needed
        yield put({type: ReduxActions.SUCCESSFULLY_UNBLOCK_TABLE, response });
      } else {
        yield put({type: ReduxActions.FAILED_TO_UNBLOCK_TABLE});
      }
    } catch (error) {
      yield put({type: ReduxActions.FAILED_TO_UNBLOCK_TABLE});
    }
  }