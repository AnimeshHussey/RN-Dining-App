import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import {Toast } from 'native-base';

const INITIAL_STATE = Immutable({ 
    FeedbackQuestions: [],
    FeedbackOrderID: '',
    feedbackOrders: [],
    searchedVal: [],
    feedbackUserName:'',
    feedbackUserNumber:'',
    feedbackRating:5,
    isFeedbackSubmitted:false
   });


export const FeedbackReducer = (state = INITIAL_STATE, action) => {
    
    switch (action.type) {

        case ReduxActions.SET_FEEDBACK_QUESTIONS:
        return Object.assign([], state, {FeedbackQuestions:action.response});

        case ReduxActions.ERROR_FEEDBACK_QUESTIONS:
        Toast.show({
            text: 'Failed to load feedback.',
            textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
            duration: 3000,
            buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
            buttonText: "Okay",
            type: "danger"
        });
        return Object.assign({},state);

        case ReduxActions.SET_FEEDBACK_USER_NAME:
        return Object.assign({},state,{feedbackUserName:action.name});

        case ReduxActions.SET_FEEDBACK_USER_NUMBER:
        return Object.assign({},state,{feedbackUserNumber:action.number});

        // case ReduxActions.SET_FEEDBACK_RATING:
        // return Object.assign({},state,{serviceFeedback:action.rating});

        case ReduxActions.FAILED_TO_SET_FFEDBACK_QUESTIONS:
        
        Toast.show({
            text: 'Failed to post your feedback. Please check your Internet Connection.',
            textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
            duration: 3000,
            buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
            buttonText: "Okay",
            type: "danger"
        });
        return Object.assign({},state,{isFeedbackSubmitted:false});

        case ReduxActions.SUCCESSFULLY_SET_FFEDBACK_QUESTIONS:
        
        Toast.show({
            text: 'Thank you for your feedback!',
            textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
            duration: 3000,
            buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
            buttonText: "Okay",
            type: "success"
        });
        return Object.assign({},state,{isFeedbackSubmitted:true});

        
        case ReduxActions.ERROR_GET_ELIGIBLE_ORDERS:
        Toast.show({
            text: 'Failed to get eligible orders for feedback.',
            textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
            duration: 3000,
            buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
            buttonText: "Okay",
            type: "danger"
        });
        return Object.assign({},state);

        case ReduxActions.SET_ELIGIBLE_ORDERS: 
        return Object.assign([], state, {feedbackOrders:action.response, searchedVal:action.response});

        case ReduxActions.SET_SEARCH_FEEDBACK_VAL: 
        return Object.assign([], state, {searchedVal:action.searchedVal});

        case ReduxActions.FEEDBACK_ORDERID:
        return Object.assign([], state, {FeedbackOrderID:action.FeedbackOrderID});

        case ReduxActions.RESET_FEEDBACK_REDUCER:
        return Object.assign({}, state,INITIAL_STATE)

        case ReduxActions.SET_FEEDBACK_RATING:        
        return Object.assign({}, state,{feedbackRating:action.Rating})
        default:
        return Object.assign({},state);
    }
}