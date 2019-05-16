import { call, put } from 'redux-saga/effects';
import { unblockTables } from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const UnblockTables = function * (action) {
    const tableIds=action.TableIds;

    // make the call to the api
    const response = yield call(unblockTables, tableIds);
    
    if (response === "Successfully booked the table.") {
      // do data conversion here if needed
      yield put({type: ReduxActions.SUCCESSFULLY_UNBLOCK_TABLES, response });
    } else {
      yield put({type: ReduxActions.FAILED_TO_UNBLOCK_TABLES});
    }
  }