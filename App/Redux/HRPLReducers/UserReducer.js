import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import { Toast } from 'native-base';

const INITIAL_STATE = Immutable({
  isUserModalVisible: false,
  isUserRegistered: false,
  isRemarksModalVisible: false,
  CustomerDetails:{
    "CustomerID": "",
    "CustomerName": "",
    "Address": "",
    "City": "",
    "State": "",
    "Email": "",
    "NoofPerson": 0
},
alreadyExists: false,
savedCustomer: null,
isButtonClicked: false
});
  export const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ReduxActions.SET_BUTTON_PRESS:
        return Object.assign({}, state, {isButtonClicked:action.set});

      case ReduxActions.SET_USER_NAME:
        let tempCust1=Object.assign({},state.CustomerDetails)
        tempCust1.CustomerName=action.userName;
        return Object.assign({}, state, {CustomerDetails:tempCust1});
      case ReduxActions.SET_USER_MOBILE_NO:
        let tempCust=Object.assign({},state.CustomerDetails)
        tempCust.CustomerID=action.mobileNumber;
        if(state.alreadyExists){tempCust.CustomerName=""}
        return Object.assign({}, state, {CustomerDetails:tempCust, alreadyExists:false});
      case ReduxActions.IS_USER_MODAL_VISIBLE:
        return Object.assign({}, state, { isUserModalVisible: action.visible });
      case ReduxActions.IS_USER_REGISTERED:
      Toast.show({
        text: 'User registered successfully.',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "success"
    });
      return Object.assign({}, state, { isUserRegistered: true,isUserModalVisible:false, savedCustomer: state.CustomerDetails.CustomerID });
      
      case ReduxActions.IS_REMARKS_MODAL_VISIBLE:
      return Object.assign({}, state, { isRemarksModalVisible: action.remarksVisible });
      
      case ReduxActions.SUCCESSFULLY_GET_USER:
      let selectedCustomer= Object.assign({}, state.CustomerDetails)
      //selectedCustomer.CustomerID=action.response.CustomerID;
      selectedCustomer.CustomerName=action.response.CustomerName;
      return Object.assign({}, state, {CustomerDetails: selectedCustomer, alreadyExists:true });

      case ReduxActions.FAILED_TO_REGISTER_USER:
      Toast.show({
        text: 'Failed to register user. Try again!',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "danger"
    });

    case ReduxActions.USER_ALREADY_REGISTERED:
      Toast.show({
        text: 'User registered for this order.',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "success"
    });
    return Object.assign({}, state, {isUserModalVisible:false });

    case ReduxActions.FAILED_TO_GET_USER:
      return Object.assign({}, state);

      case ReduxActions.RESET_USER:
      return Object.assign({}, state,{CustomerDetails: INITIAL_STATE.CustomerDetails});

      case ReduxActions.RESET_USER_REDUCER:
      return Object.assign({}, state,INITIAL_STATE);

      case ReduxActions.SET_EXISTING_CUSTOMER:
      let exisOrderCustomer= Object.assign({}, state.CustomerDetails)
      exisOrderCustomer.CustomerID=action.CustomerID;
      exisOrderCustomer.CustomerName=action.CustomerName;
      return Object.assign({}, state, {CustomerDetails: exisOrderCustomer})

      default:
        return Object.assign({}, state);
    }
  }