import { call, put } from 'redux-saga/effects';
import {saveFloors} from '../../Services/HRPLApi';
import ReduxActions from "../../Redux/ActionTypes/Action";
import __  from "lodash";

export const GetFloorDetails = function * (action) {
  //yield put({type: ReduxActions.SET_API_CALL});
  // make the call to the api
  const response = yield call(saveFloors, action.user, action.section,action.Pricegroup);

  try {
    if(__.isArray(response)){
      yield put({type: ReduxActions.FLOOR_DETAILS, response });
      }
      else {
        yield put({type: ReduxActions.ERROR_FLOOR_DETAILS});
      }
  } catch (error) {
    yield put({type: ReduxActions.ERROR_FLOOR_DETAILS});
  }
  } 