import { call, put } from 'redux-saga/effects';
import {createOrder} from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";

export const placeOrder = function * (action) {
  const  OrderObj  = action.Obj;
  // make the call to the api
  const response = yield call(createOrder, OrderObj);
  if(response.split("-").length===4)
  {
    if (OrderObj.subOrder.length>0) {
      // do data conversion here if needed
      yield put({type: ReduxActions.SUCCESSFULLY_PLACED_ORDER, response});
    } 
    else if (OrderObj.OrderID==="" && OrderObj.subOrder.length===0){
      yield put({type: ReduxActions.USER_ALREADY_REGISTERED, response});
      yield put({type: ReduxActions.SET_ORDER_ID, response});
    }
    else if(OrderObj.OrderID=="" && OrderObj.subOrder.length===0){
      yield put({type: ReduxActions.IS_USER_REGISTERED, response});
    }
 }
 else if(response==="ORDER EXISTS")
 {
  yield put({type: ReduxActions.FAILED_TO_PLACE_ORDER, response});
 }
  else {
    yield put({type: ReduxActions.FAILED_TO_PLACE_ORDER, response});
  }
}