import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import {Toast } from 'native-base';

const INITIAL_STATE = Immutable({
    //CheckOrderDetails:{},
    isCheckoutOrderSuccessfully : false,
    showCheckoutModal:false,
    CheckoutOrderDetails: null 
});


export const checkOutReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    // case ReduxActions.SET_CHECKOUT_ORDER_DETAILS:
    // return Object.assign({},state,{CheckOrderDetails:action.CheckoutorderDetails});
    
    case ReduxActions.SUCCESSFULLY_GOT_CHECKOUT_ORDER_DETAILS:
    return Object.assign({},state,{CheckoutOrderDetails:action.response});

    case ReduxActions.FAILED_TO_GET_CHECKOUT_ORDER_DETAILS:   
    return Object.assign({},state);

    case ReduxActions.FAILED_TO_CHECKEDOUT_ORDER:   
    Toast.show({
        text: "Unable to connect your network. Please check your connection and try again.",
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 3000,
        buttonTextStyle: { fontSize: 15, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "danger"
      });
    return Object.assign({},state);

    case ReduxActions.SUCCESSFULLY_CHECKEDOUT_ORDER:
    Toast.show({
        text: 'Successfully checked out. Thanks!',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "success"
    });  
    return Object.assign({},state,{isCheckoutOrderSuccessfully:true});

    case ReduxActions.SHOW_CHECKOUT_MODAL:
    return Object.assign({},state,{showCheckoutModal:true});

    case ReduxActions.HIDE_CHECKOUT_MODAL:
    return Object.assign({},state,{showCheckoutModal:false});

    case ReduxActions.RESET_CHECKOUT_REDUCER: 
    return Object.assign({},state,INITIAL_STATE);

    default:
    return Object.assign({},state);
    
    }
}