import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import {Toast } from 'native-base';

const INITIAL_STATE = Immutable({   
    captainDetails:{
        USERNAME:'',
        PASSWORD:'',
        MOBILENO:''
    },
    confPass:'',
    captainIdValid:true,
    nameValid:true,
    passValid:true,
    confPassValid:true,
    captainloginDetils:{
        mobileNo:"",
        loggedInUserName:""
    },
    loginSuccessfully:false,
    isLoginPressed:false,
    isRegisterPressed: false,
    rememberMe:false,
    connectionStatus: '',
    ip: '',
    port: ''
});

export const loginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ReduxActions.SET_LOGIN_ID:
        return Object.assign({}, state, {captainDetails: action.tempObj, captainIdValid: true, nameValid:true, passValid: true});

        case ReduxActions.SET_CONFIRM_PASS:
        return Object.assign({}, state, {confPass: action.input, confPassValid: true})

        case ReduxActions.SET_COLOR_ID:
        return Object.assign({}, state, {captainIdValid: action.isCorrect})

        case ReduxActions.SET_COLOR_NAME:
        return Object.assign({}, state, {nameValid: action.isCorrect})

        case ReduxActions.SET_COLOR_PASS:
        return Object.assign({}, state, {passValid: action.isCorrect})

        case ReduxActions.SET_COLOR_CONFPASS:
        return Object.assign({}, state, {confPassValid: action.isCorrect})

        case ReduxActions.SET_LOGIN_PROGRESSBAR:
        return Object.assign({}, state, {isLoginPressed: true})

        case ReduxActions.SUCCESSFULLY_LOGIN:
        let loggedIncaptain =  Object.assign({}, state.captainloginDetils,{
            mobileNo:action.response.MOBILENO,
            loggedInUserName:action.response.USERNAME
        });
        return Object.assign({},state,{captainloginDetils:loggedIncaptain,loginSuccessfully:true, isLoginPressed:false});

        case ReduxActions.FAILED_TO_LOGIN:
        Toast.show({
            text: 'Please check saved ip & port./ Invalid Username and/or Password',
            textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
            duration: 3000,
            buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
            buttonText: "Okay",
            type: "danger"
        })
        return Object.assign({},state,{loginSuccessfully:false,isLoginPressed:false});

        case ReduxActions.SUCCESSFULLY_REGISTERED:
        let newcaptain =  Object.assign({}, INITIAL_STATE.captainDetails);
            Toast.show({
                text: 'Registered successfully, please login with your registered ID.',
                textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
                duration: 3000,
                buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
                buttonText: "Okay",
                type: "success"
        })
        return Object.assign({},state,{captainDetails:newcaptain,confPass:'',isRegisterPressed: false});

        case ReduxActions.USER_ALREADY_EXISTS:
            Toast.show({
                text: 'User already exists.',
                textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
                duration: 3000,
                buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
                buttonText: "Okay",
                type: "danger"
        })
        return Object.assign({},state,{captainDetails:{USERNAME:'',PASSWORD:'',MOBILENO:''},isRegisterPressed:false});

        case ReduxActions.SET_REGISTER_PRESSED:
        return Object.assign({}, state, {isRegisterPressed: true})

        case ReduxActions.FAILED_TO_REGISTER:
        let captain =  Object.assign({}, INITIAL_STATE.captainDetails);
        let msg="";
        if(action.response.Message==="Please provide a valid User name !"){
            msg="Please provide a valid name !"
        }
        else{
            msg='Failed to register. Please check saved ip & port.'
        }
        Toast.show({
            text: msg,
            textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
            duration: 3000,
            buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
            buttonText: "Okay",
            type: "danger"
        })
        return Object.assign({}, state,{captainDetails:captain,confPass:'', isRegisterPressed: false})

        case ReduxActions.RESET_LOGIN_REDUCER:
        return Object.assign({}, state,INITIAL_STATE)

        case ReduxActions.RESET_LOGIN_SUCCESSFULLY:
        return Object.assign({}, state,{loginSuccessfully:false,rememberMe:false})

        case ReduxActions.SET_REMEMBER_ME:
        return Object.assign({}, state, {rememberMe: action.isChecked})

        case ReduxActions.SET_CONNECTION_STATUS:
        return Object.assign({}, state, {connectionStatus: action.connectionStatus})

        case ReduxActions.SET_IP_ADDRESS:
        return Object.assign({}, state, { ip: action.ip });

        case ReduxActions.SET_PORT:
        return Object.assign({}, state, { port: action.port });

        default:
        return Object.assign({},state);
    }
}