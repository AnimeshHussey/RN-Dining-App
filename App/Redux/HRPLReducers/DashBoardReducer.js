import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import { reducer } from '../GithubRedux';

const INITIAL_STATE = Immutable({
    getipAddress: '',
    getport: '',
    setipAddress: '',
    setPort: '',
    userID: '',
    adminPassword: '',
    width: '',
    height: ''
});


export const DashBoardReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case ReduxActions.SET_IP_ADDRESS:
            return Object.assign({}, state, { setipAddress: action.IP });
        case ReduxActions.SET_PORT:
            return Object.assign({}, state, { setPort: action.PortAddress });
        case ReduxActions.GET_IP_ADDRESS:
            return Object.assign({}, state, { getipAddress: action.IP });
        case ReduxActions.GET_PORT:
            return Object.assign({}, state, { getport: action.PortAddress });
        case ReduxActions.SETADMIN_USERID:
            return Object.assign({}, state, { userID: action.userID });
        case ReduxActions.SETADMIN_PASSWORD:
            return Object.assign({}, state, { adminPassword: action.adminPassword });
        case ReduxActions.RESET_DASHBOARD_REDUCER:
        return Object.assign({}, state,INITIAL_STATE)
        case ReduxActions.SCREEN_WIDTH:
        return Object.assign({}, state, { width: action.width });
        case ReduxActions.SCREEN_HEIGHT:
        return Object.assign({}, state, { height: action.height });
        default:
        return Object.assign({}, state);
    }
}