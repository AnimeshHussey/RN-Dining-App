import { call, put } from 'redux-saga/effects';
import { blockTable } from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const BlockTable = function * (action) {
    const tableId=action.id;
    const LockOrCheck=action.LockOrCheck;
    // make the call to the api
    const response = yield call(blockTable, tableId,LockOrCheck);
    if (response === true) {
      // do data conversion here if needed
      if(LockOrCheck)
        yield put({type: ReduxActions.SUCCESSFULLY_BLOCK_TABLE });
      else
        yield put({type: ReduxActions.TABLE_BLOCKED});
    } else {
      if(LockOrCheck)
        yield put({type: ReduxActions.FAILED_TO_BLOCK_TABLE});
      else
        yield put({type: ReduxActions.TABLE_UNBLOCKED});
    }
  }
  