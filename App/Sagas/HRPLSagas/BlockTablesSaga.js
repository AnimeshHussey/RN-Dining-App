import { call, put } from 'redux-saga/effects';
import { blockTables } from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const BlockTables = function * (action) {
    const tableIds=action.TableIds;
    const LockOrCheck=action.LockOrCheck;
    // make the call to the api
    const response = yield call(blockTables, tableIds,LockOrCheck);
    
    try {
      if (response === true) {
        if(LockOrCheck)
        yield put({type: ReduxActions.SUCCESSFULLY_BLOCK_TABLES, response });
        else
        yield put({type: ReduxActions.SET_MERGE_TABLES_STATUS,status:"BLOCKED"});
      } else {
          if(LockOrCheck)
          yield put({type: ReduxActions.FAILED_TO_BLOCK_TABLES});
          else
          yield put({type: ReduxActions.SET_MERGE_TABLES_STATUS,status:"UNBLOCKED"});   
      }
    } catch (error) {
      yield put({type: ReduxActions.SET_MERGE_TABLES_STATUS,status:"UNBLOCKED"}); 
    }
    
  }