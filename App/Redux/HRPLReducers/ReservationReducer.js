import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import {Toast } from 'native-base';
import moment from "moment";

const INITIAL_STATE = Immutable({
    mobileNumber: '',
    bookingName: '',
    noOfGuest: '',
    dateTime: '',
    isResvfieldsVerified:true,
    isDateTimePickerVisible:false,
    registeredSuccessfully:false,
    stateOfReservation: 'new',
    allReservations: [],
    reservationsSearch:[],
    searchedVal:'',
    tobeDel:{},
    isResCancelled:false,
    isResModified:false,
    ResToModify:0,
    isGetting: false,
    searchDate: '',
    isSearchDatePickerVisible:false,
    ReservationID:0,
    isDelResModalVisible: false,
    switchState: false,
    sortBy:'',
    isClearAllVisible:true
});

export const ReservationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
      case ReduxActions.TOGGLE_SWITCH:
      let temp=state.switchState
      return Object.assign({}, state, {switchState: !temp, isUpdated:true});

      case ReduxActions.SET_SORT:
      return Object.assign({}, state, {sortBy:action.val});

      case ReduxActions.UPDATED_ALREADY:
      return Object.assign({}, state, {isUpdated:false});

      case ReduxActions.SET_MOBILE_NUMBER:
      return Object.assign({}, state, {mobileNumber: action.mobileNumber});
      break;
      case ReduxActions.SET_BOOKING_NAME:
      return Object.assign({}, state, {bookingName: action.bookingName});
      break;
      case ReduxActions.SET_NO_OF_GUEST:
      return Object.assign({}, state, {noOfGuest: action.noOfGuest});
      break;
      case ReduxActions.SET_DATE_TIME:
      return Object.assign({}, state, {dateTime: action.dateTime});
      break;
      case ReduxActions.IS_RESRV_FIELDS_VERIFIED:
      return Object.assign({}, state, {isResvfieldsVerified: action.isVerified});
      
      case ReduxActions.IS_RESRV_DATETIME_VISIBLE:
      return Object.assign({}, state, {isDateTimePickerVisible: action.isVisible});

      case ReduxActions.FAILED_TO_SET_RESERVATION_DETAILS:
      Toast.show({
        text: 'Failed to save reservation !',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "danger"
        });
      return Object.assign({}, state);

      case ReduxActions.SUCCESSFULLY_CLEARED_RESERVATIONS:
      Toast.show({
        text: 'Successfully cleared reservations.',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "success"
    });
      return Object.assign({}, state,{isResCancelled: true});

      case ReduxActions.FAILED_TO_CLEAR_RESERVATIONS:
      Toast.show({
        text: 'Failed to clear reservations !',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "danger"
        });
      return Object.assign({}, state);

      case ReduxActions.RESERVATION_DETAILS_SAVED:
      Toast.show({
        text: 'Successfully reserved table.',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "success"
    });
      return Object.assign({}, state,{registeredSuccessfully:true});

      case ReduxActions.RESET_RESERVATION:
      return Object.assign({}, state, INITIAL_STATE);

      case ReduxActions.STATE_OF_RESERVATION: 
      return Object.assign({}, state, {stateOfReservation: action.resState});
      
      case ReduxActions.SAVE_ALL_RESERVATIONS:
      let Arr=[];
      action.response.map(res=>{
        if(res.STATUS==="3"||res.STATUS==="2"){
          Arr.push(res.ID)
        }
      })
      let tArr=action.response.filter(ele => ele.TABLEID===0 && !Arr.includes(ele.ID) && (ele.STATUS==="0" || ele.STATUS==="1"));
      let resrvArr=action.response.filter(ele => {if(!Arr.includes(ele.ID))return ele});
      return Object.assign([], state, {allReservations: resrvArr, reservationsSearch:tArr, isGetting: false});

      case ReduxActions.FAILED_TO_GET_RESERVATIONS:
      Toast.show({
        text: 'Failed to get reservations. Try again!',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "danger"
        });
      return Object.assign({}, state);

      case ReduxActions.SET_RESERVATION_SEARCH_RESULTS:
      return Object.assign([], state, {reservationsSearch:action.searchedArr, stateOfReservation:'new'});      

      case ReduxActions.SET_SEARCH_VALUE:
      return Object.assign({}, state, {searchedVal:action.searchedVal})

      case ReduxActions.IS_RES_DELETE_VISIABLE:
      return Object.assign({}, state, {isDelResModalVisible:action.isDel})

      case ReduxActions.SET_RESERVATION_FOR_DELETION:
      return Object.assign({}, state, {tobeDel:action.tobeDel})

      case ReduxActions.SUCCESSFULLY_DELETED_RESERVATIONS:
      Toast.show({
        text: 'Successfully cancelled reservation!',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "success"
      });
      return  Object.assign({}, state, {isResCancelled:true})  
    
    case ReduxActions.FAILED_TO_DELETE_RESERVATIONS:
      Toast.show({
        text: 'Failed to cancel reservation. Try again!',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "danger"
    });
    return  Object.assign({}, state)

    case ReduxActions.SELECTED_MODIFY_DATA:
    return Object.assign({}, state, {ReservationID:action.reservation.ID,mobileNumber:action.reservation.CUSTOMERID,
    bookingName: action.reservation.BOOKINGNAME, noOfGuest: action.reservation.NOOFPERSONS,
    dateTime: action.reservation.BOOKINGDATETIME, ResToModify:action.reservation
    })

    case ReduxActions.SUCCESFULLY_MODIFIED_RESERVATION:
      Toast.show({
        text: 'Successfully modified reservation!',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "success"
      });
      return  Object.assign({}, state, {isResModified:true})  

      case ReduxActions.FAILED_TO_MODIFY_RESERVATIONS:
      Toast.show({
        text: 'Failed to modify reservation. Try again!',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "danger"
    });
    return  Object.assign({}, state)

    case ReduxActions.SET_SEARCHED_DATE:
    return Object.assign({}, state, {searchDate:action.searchDate}); 

    case ReduxActions.SET_SEARCHED_DATE_PICKER:
    return Object.assign({}, state,{isSearchDatePickerVisible:action.isSearchDatePickerVisible});

    case ReduxActions.SET_ACTIVITY_INDICATOR:
    return Object.assign({}, state,{isGetting:true});

    case ReduxActions.TOGGLE_CLEAR_ALL_RESERV:
    return Object.assign({}, state,{isClearAllVisible:!state.isClearAllVisible});
  
    default:
    return Object.assign({}, state);
  }
}
