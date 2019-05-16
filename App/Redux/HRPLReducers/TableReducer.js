import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import {Toast} from 'native-base';

const INITIAL_STATE = Immutable({ 
allTableArray:[],
OrderDetails:{}, 
TablesonSelectedFloor:[],
tableWithOrderDetails:{},
NoOfPerson:0,
NoOfPersonSwap:0,
tableReleased:false,
approvedOrders:[],
isOrderApproved:false,
searchedVal: null,
searchedTables:[],
isTableReservedSuccessfully:false,
releasedSuccessfully:false,
isBookingFailed:"",
CurrentStatus:"",
RevisedStatus:"",
mergeTable:false,
showMergeModal:false,
masterTableID:0,
childTables:[],
masterTableName:"",
childTablesName:[],
IstablesBooked:false,
IstableBlocked:'',
ReleasingTable:false,
ReleaseTableID:0,
ReleaseOrder:{},
tableStatus:'',
Block_UnblockAllTables:'',
mergeTablesStatus:''
});

export const tableReducer = (state = INITIAL_STATE, action) => {
        switch (action.type) {
        case ReduxActions.GOT_TABLE_DETAILS:
        let dummyArray=[];
        action.response.forEach(element => {
        dummyArray.push(element);
        }); 
        return Object.assign({}, state, {allTableArray: dummyArray});
        
        case ReduxActions.FAILED_TO_GET_TABLE_DETAILS:
        return Object.assign({}, state);

        case ReduxActions.SET_NOOFPERSON:
        return Object.assign({}, state, {NoOfPerson: action.noofperson})

        case ReduxActions.SET_SWAP_NOOFPERSON:
        return Object.assign({}, state, {NoOfPersonSwap: action.noofperson})

        case ReduxActions.FAILED_TO_APPROVE_ORDER:
        return Object.assign({}, state); 

        case ReduxActions.SET_SEARCH_VALUE:
        return Object.assign({}, state, {searchedVal:action.searchedVal})

        case ReduxActions.SUCCESSFULLY_BOOKED_TABLE:
        return Object.assign({}, state,{isBookingFailed:"SUCCESS"})

        case ReduxActions.FAILED_TO_BOOK_TABLE:
        return Object.assign({}, state,{isBookingFailed:"FAILED"});

        case ReduxActions.RESET_BOOKING_STATUS:
        return Object.assign({}, state,{isBookingFailed:""});
        
        case ReduxActions.SET_SEARCH_RESULTS:
        return Object.assign({}, state, {searchedTables:action.searchedArr})

        case ReduxActions.RELEASED_TABLE:
        let isReleased=false;
        if(action.response =="Successfully released the table."){
          isReleased=true;
        }
        return Object.assign({}, state,{tableReleased:isReleased});

        case ReduxActions.FAILED_TO_RELEASE_TABLE:
        return Object.assign({},state);

        case ReduxActions.GET_ORDER_DETAILS_FOR_CAPTAIN:
        let tempRounds=[]
        action.selectedTable.orderDetails.subOrder.map((element) =>{
        tempRounds.push(element.subOrderNumber)
        })
        return Object.assign({}, state, {tableWithOrderDetails: action.selectedTable}) 

        case ReduxActions.CAPTAIN_SELECTED_FLOOR:
        let tempTablesonSelectedFloor=[]; 
        state.allTableArray.forEach((floordata) => {
        if (floordata.floorID == action.selectedValue) { 
        tempTablesonSelectedFloor=floordata.tables; 
        }})
        return Object.assign({},state,{TablesonSelectedFloor:tempTablesonSelectedFloor})        

        case ReduxActions.RESET_TABLE_DATA:
        return Object.assign({}, state, INITIAL_STATE)

        case ReduxActions.SET_MERGE_TABLE:
        return Object.assign({}, state, {mergeTable:action.ismergeTable})

        case ReduxActions.SHOW_MERGE_TABLE_MODAL:
        return Object.assign({}, state, {showMergeModal:action.showMergeModal})

        case ReduxActions.FAILED_TO_RELEASE_TABLE:
        Toast.show({
          text: 'Failed to release table !',
          textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
          duration: 2000,
          buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
          buttonText: "Okay",
          type: "danger"
          });
        return Object.assign({}, state);

        case ReduxActions.SUCCESSFULLY_RELEASED_TABLE:
        Toast.show({
        text: 'Successfully released table.',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "success"
        });
        return Object.assign({}, state,{releasedSuccessfully:true});

        case ReduxActions.SUCCESSFULLY_RESERVED_TABLE:
        return Object.assign({}, state, {isTableReservedSuccessfully: true})

        case ReduxActions.RESET_SUCCESSFULLY_RESERVED_TABLE:
        return Object.assign({},state,{isTableReservedSuccessfully: false})

        case ReduxActions.GOT_TABLE_STATUS:  
        return Object.assign({},state,{RevisedStatus: action.response})

        case ReduxActions.FAILED_TO_GET_TABLE_STATUS:
        return Object.assign({},state)

        case ReduxActions.SET_CURRENT_TABLE_STATUS:
        return Object.assign({},state,{CurrentStatus: action.status})

        case ReduxActions.RESET_TABLE_STATUS:
        return Object.assign({},state,{CurrentStatus: "",RevisedStatus:""})

        case ReduxActions.SET_PARENT_TABLE:
        return Object.assign({},state,{masterTableID: action.tableID,masterTableName:action.tableName})

        case ReduxActions.RESET_PARENT_TABLE:
        return Object.assign({},state,{masterTableID: INITIAL_STATE.masterTableID,masterTableName:INITIAL_STATE.masterTableName})

        case ReduxActions.SET_CHILD_TABLES:
        return Object.assign({},state,{childTables: action.tables,childTablesName:action.childTables})

        case ReduxActions.RESET_CHILD_TABLES:
        return Object.assign({},state,{childTables: INITIAL_STATE.childTables,childTablesName:INITIAL_STATE.childTablesName})

        case ReduxActions.SUCCESSFULLY_BOOKED_TABLES:
        return Object.assign({},state,{IstablesBooked: true})

        case ReduxActions.FAILED_TO_BOOK_TABLES:
        return Object.assign({},state,{IstablesBooked: INITIAL_STATE.IstablesBooked})

        case ReduxActions.UNDO_CHECKOUT_FAILED:
        Toast.show({
          text: 'Undo checkout failed !',
          textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
          duration: 2000,
          buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
          buttonText: "Okay",
          type: "danger"
          });
        return Object.assign({}, state);

        case ReduxActions.UNDO_CHECKOUT_SUCESSFULLY:
        Toast.show({
        text: 'Undo checkedout successfully',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "success"
        });
        return Object.assign({}, state,{releasedSuccessfully:true});

        case ReduxActions.SUCCESSFULLY_BLOCK_TABLE:
        return Object.assign({}, state,{IstableBlocked:"BLOCKED"});

        case ReduxActions.FAILED_TO_BLOCK_TABLE:
        return Object.assign({}, state,{IstableBlocked:'FAILED_TO_BLOCK'});

        case ReduxActions.RESET_BOLCKING_STATUS:
        return Object.assign({}, state,{IstableBlocked:''});

        case ReduxActions.SET_RELEASING_TABLE:
        return Object.assign({}, state,{ReleasingTable:true,ReleaseTableID:action.ReleaseTableID,ReleaseOrder:action.ReleaseOrder});

        case ReduxActions.RESET_RELEASING_TABLE:
        return Object.assign({}, state,{ReleasingTable:false,ReleaseTableID:0,ReleaseOrder:{}});

        case ReduxActions.TABLE_BLOCKED:
        return Object.assign({}, state,{tableStatus:'BLOCKED'});

        case ReduxActions.TABLE_UNBLOCKED:
        return Object.assign({}, state,{tableStatus:'UNBLOCKED'});

        case ReduxActions.RESET_TABLE_BLOCK_STATUS:
        return Object.assign({}, state,{tableStatus:''});

        case ReduxActions.SUCCESSFULLY_BLOCK_TABLES:
        return Object.assign({}, state,{Block_UnblockAllTables:'BLOCKED'});

        case ReduxActions.SUCCESSFULLY_UNBLOCK_TABLES:
        return Object.assign({}, state,{Block_UnblockAllTables:'UNBLOCKED'});

        case ReduxActions.FAILED_TO_BLOCK_TABLES:
        return Object.assign({}, state,{Block_UnblockAllTables:'FAILED_TO_BLOCK'});

        case ReduxActions.RESET_BLOCK_TABLES:
        return Object.assign({}, state,{Block_UnblockAllTables:''});

        case ReduxActions.SET_MERGE_TABLES_STATUS:
        return Object.assign({}, state,{mergeTablesStatus:action.status});

        case ReduxActions.RESET_MERGE_TABLES_STATUS:
        return Object.assign({}, state,{mergeTablesStatus:''});

        default:
        return Object.assign({},state);
        }
}