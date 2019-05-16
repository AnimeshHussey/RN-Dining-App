import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import { reducer } from '../GithubRedux';
import { Toast } from 'native-base';

const INITIAL_STATE = Immutable({
     OrderDetails:{},
      swap: false,
      subOrderNumber: null,
      CanceledRound:0,
      isItemCancelled:false,
      rqItemID:'',
      rqItemName:'',
      rqItemQuantity:'',
      rqsubOrderNumber:null,
      showQuantityModal:false,
      changeditemQuantity:'',
      successfullyReducedQuantity:null
});


export const reviewReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case ReduxActions.SUCCESSFULLY_GET_ORDER_DETAILS:
    return Object.assign({},state,{OrderDetails:action.response,isItemCancelled:false});

    case ReduxActions.ACTIVATE_SWAP_TABLE:
    return Object.assign({},state,{swap:!state.swap, subOrderNumber: action.subOrderNumber});

    case ReduxActions.SUCCESSFULLY_CANCELED_ROUND:    
     let roundNumber=action.response.match(/\d+/)[0];
    Toast.show({
      text: 'Successfully canceled round :'+roundNumber,
      textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
      duration: 2000,
      buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
      buttonText: "Okay",
      type: "success"
      });
      return Object.assign({},state,{CanceledRound:roundNumber});

    case ReduxActions.SUCCESSFULLY_CANCELLED_ITEM:
      Toast.show({
        text: 'Successfully canceled item.',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "success"
        });
    return Object.assign({},state,{isItemCancelled:true});     

    case ReduxActions.FAILED_TO_GET_ORDER_DETAILS:
    return Object.assign({},state);

    case ReduxActions.RESET_REVIEW_REDUCER: 
    return Object.assign({},state,INITIAL_STATE);

    case ReduxActions.FAILED_TO_PRINT_KOT:
      Toast.show({
        text: 'Unable to find any Printer',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "danger"
    });
    return Object.assign({},state);

    case ReduxActions.FAILED_TO_SWAP:
      Toast.show({
        text: action.response===""?'Unable to swap/cancel. Try again!': action.response,
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "danger"
    });
    return Object.assign({},state);

    case ReduxActions.SUCCESSFULLY_PRINT_KOT:
      Toast.show({
        text: 'Sucessfully printed, please collect.',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "success"
    });
    return Object.assign({},state);

    case ReduxActions.SUCCESSFULLY_SWAPPED:
      Toast.show({
        text: 'Sucessfully swapped suborder.',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "success"
    });
    return Object.assign({},state,{swap: false});

    case ReduxActions.SET_RQITEM:
    return Object.assign({},state,{rqItemID:action.ItemID,rqItemName:action.ItemName,rqItemQuantity:action.ItemQuantity,rqsubOrderNumber:action.rqsubOrderNumber});

    case ReduxActions.SHOW_QUANTITY_MODAL:
    return Object.assign({},state,{showQuantityModal:action.showhideModal});

    case ReduxActions.SET_CHANGED_QUANTITY:
    return Object.assign({},state,{changeditemQuantity:action.newQuantity});

    case ReduxActions.SUCCESSFULLY_CHANGED_QUANTITY:
    return Object.assign({},state,{successfullyReducedQuantity:true});

    case ReduxActions.FAILED_CHANGED_QUANTITY:
    return Object.assign({},state,{successfullyReducedQuantity:false});

    case ReduxActions.RESET_CHANGED_QUANTITY:
    return Object.assign({},state,{successfullyReducedQuantity:null});
    
    default:
    return Object.assign({},state);
    
    }
}