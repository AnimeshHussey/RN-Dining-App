import { call, put } from 'redux-saga/effects';
import { getTableStatus } from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const fetchTableStatus = function * (action) {
    const tableID=action.tableID;
    // make the call to the api
    const response = yield call(getTableStatus,tableID);        
    if (response==="" ||response==="PLACED" ||response==="CHECKEDOUT" ||response=== "INVOICED") {
      // do data conversion here if needed
      yield put(
        {type: ReduxActions.GOT_TABLE_STATUS, response }
      );
    } else {
      yield put({type: ReduxActions.FAILED_TO_GET_TABLE_STATUS});
    }
  }