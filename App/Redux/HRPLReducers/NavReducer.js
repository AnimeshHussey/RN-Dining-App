import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import {Toast } from 'native-base';

const INITIAL_STATE = Immutable({
    navState: 'table',
    isResOpen: false
});

export const navReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case ReduxActions.SET_NAV_STATE:
      return Object.assign({}, state, {navState: action.navState});
      break;

      case ReduxActions.SET_RES_STATE:
      return Object.assign({}, state, {isResOpen: action.isResOpen});
      break;
    
      case ReduxActions.RESET_NAV_REDUCER:
      return Object.assign({},state,INITIAL_STATE);

      default:
      return Object.assign({}, state);
  }
}
