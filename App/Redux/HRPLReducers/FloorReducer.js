import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import { reducer } from '../GithubRedux';
import {Toast } from 'native-base';

const INITIAL_STATE = Immutable({
     floorList:[],
     selectedSection:{},
     selectedtable:{},
     totalSection:[],
     selectedSwapTable:{}
});


export const floorReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case ReduxActions.FLOOR_DETAILS:
    return Object.assign({},state,{floorList:action.response})

    case ReduxActions.ERROR_FLOOR_DETAILS:
    Toast.show({
        text: 'Failed to get the table data. Please check api connection.',
        textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
        duration: 3000,
        buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
        buttonText: "Okay",
        type: "danger"
    })
    return Object.assign({},state);

    case ReduxActions.SET_TOTAL_FLOOR:
    return Object.assign({},state,{totalSection:action.response})

    case ReduxActions.FAILED_TO_SET_TOTAL_FLOOR:
    return Object.assign({},state);

    case ReduxActions.SET_SELECTED_SECTION:
    return Object.assign({},state,{selectedSection:action.section})

    case ReduxActions.SELECTED_TABLE:
    return Object.assign({},state,{selectedtable:action.SelectedtableData})

    case ReduxActions.SELECTED_SWAP_TABLE:
    return Object.assign({},state,{selectedSwapTable:action.SelectedtableData})


    case ReduxActions.RESET_SELECTED_TABLE:
    return Object.assign({}, state,{selectedtable:{}});
    
    case ReduxActions.RESET_FLOOR:
    return Object.assign({},state,{selectedFloor:INITIAL_STATE.selectedFloor});

    case ReduxActions.RESET_FLOOR_DATA:
    return Object.assign({},state,{floorList:[],selectedtable:{}})
    break;
    case ReduxActions.RESET_FLOOR:
    return Object.assign({},state,{selectedFloor:INITIAL_STATE.selectedFloor});
    default:
    return Object.assign({},state);
    }
}