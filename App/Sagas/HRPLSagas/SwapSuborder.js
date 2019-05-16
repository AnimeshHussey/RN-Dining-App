import { call, put } from 'redux-saga/effects';
import {swapOrder} from '../../Services/HRPLApi'
import ReduxActions from "../../Redux/ActionTypes/Action";

export const swapSuborder = function * (action) {
  
  const swapObj = action.obj;
  // make the call to the api
  const response = yield call(swapOrder, swapObj);
  if ((response.includes("Sucessfully") && swapObj.CancelOnly===false)|| response.includes("-")) {
    // do data conversion here if needed
    yield put({type: ReduxActions.SUCCESSFULLY_SWAPPED});
  }
  else if ((response.includes("Cancelled SubOrder:")|| response==="Sucessfully PrintedCancelled Item. ")&& swapObj.CancelOnly===true) {
    // do data conversion here if needed
    if(response==="Sucessfully PrintedCancelled Item. ")
    yield put({type: ReduxActions.SUCCESSFULLY_CANCELLED_ITEM,response});
    else
    yield put({type: ReduxActions.SUCCESSFULLY_CANCELLED_ROUND,response});
    
  } 
  else if (response==="Suborder does not exist."){
    yield put({type: ReduxActions.FAILED_TO_SWAP, response }); 
  }
  else {
    yield put({type: ReduxActions.FAILED_TO_SWAP, response:""});
  }
}