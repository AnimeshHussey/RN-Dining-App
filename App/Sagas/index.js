import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Action Types ------------- */
import SagaActions from './ActionTypes/Action'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import {GetFloorDetails} from './HRPLSagas/FloorSaga'
import {getTableDetails} from './HRPLSagas/TableSaga'
import {loginCaptain} from './HRPLSagas/LoginSaga'
import {registerCaptain} from './HRPLSagas/RegisterSaga'
import {saveReservation} from './HRPLSagas/ReservationSaga'
import {getReservation} from './HRPLSagas/GetReservationSaga'
import {deleteReservation} from './HRPLSagas/DeleteReservationSaga'
import {modifyReservation} from './HRPLSagas/ModifyReservationSaga'
import {getAllItemsDetails} from './HRPLSagas/ItemSaga'
import {placeOrder} from './HRPLSagas/PlaceOrderSaga'
import {approveOrderSaga} from './HRPLSagas/ApproveOrderSaga'
import {getUser} from './HRPLSagas/GetUserSaga'
import {getOrderDetails} from './HRPLSagas/GetOrderDetailsSaga'
import {registerUser} from './HRPLSagas/RegisterUserSaga'
import {checkoutOrder} from './HRPLSagas/CheckoutOrderSaga'
import {selectReserveTable} from './HRPLSagas/ReserveTableSaga'
import {getCheckoutOrderDetails} from './HRPLSagas/getCheckoutItemsSaga'
import {doKOTPrinting} from './HRPLSagas/KOTPrintSaga'
import {clearAllReservation} from './HRPLSagas/ClearReservationSaga'
import {releaseTable} from './HRPLSagas/ReleaseTableSaga'
import {bookTable} from './HRPLSagas/BookTableSaga'
import {GetFeedbackQuestions} from './HRPLSagas/GetFeedbackSaga'
import {postFeedbackSaga} from './HRPLSagas/PostFeedbackSaga'
import {GetFeedbackOrders} from './HRPLSagas/GetEligibleOrdersForFeedbackSaga'
import {swapSuborder} from './HRPLSagas/SwapSuborder'
import {GetRemarks} from './HRPLSagas/GetRemarksSaga'
import {GetTotalFloor} from './HRPLSagas/GetTotalFloorsSaga'
import {fetchTableStatus} from './HRPLSagas/TableStatusSaga'
import {occupyTables} from './HRPLSagas/BookTablesSaga'
import {undoCheckoutTable} from './HRPLSagas/UndoCheckoutSaga'
import {BlockTable} from './HRPLSagas/BlockTableSaga'
import {UnblockTable} from './HRPLSagas/UnblockTableSaga'
import {reduceQuantity} from './HRPLSagas/ReduceQuantitySaga'
import {BlockTables} from './HRPLSagas/BlockTablesSaga'
import {UnblockTables} from './HRPLSagas/UnblockTablesSaga'
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(SagaActions.GET_FLOOR_DETAILS, GetFloorDetails),
    takeLatest(SagaActions.GET_TABLE_DETAILS, getTableDetails),
    takeLatest(SagaActions.LOGIN_CAPTAIN, loginCaptain),
    takeLatest(SagaActions.CREATE_CAPTAIN, registerCaptain),    
    takeLatest(SagaActions.SET_RESERVATION_DETAILS, saveReservation),
    takeLatest(SagaActions.GET_RESERVATIONS, getReservation),
    takeLatest(SagaActions.DELETE_RESERVATIONS, deleteReservation),
    takeLatest(SagaActions.MODIFY_RESERVATION_DETAILS, modifyReservation),
    takeLatest(SagaActions.GET_MENU_ITEMS, getAllItemsDetails),
    takeLatest(SagaActions.PLACE_ORDER, placeOrder),
    takeLatest(SagaActions.APPROVE_ORDER, approveOrderSaga),
    takeLatest(SagaActions.GET_USER_DETAILS,getUser),
    takeLatest(SagaActions.GET_ORDER_DETAILS,getOrderDetails),
    takeLatest(SagaActions.REGISTER_USER,registerUser),
    takeLatest(SagaActions.CHECKOUT_ORDER,checkoutOrder),
    takeLatest(SagaActions.SAVE_TABLE_RESERVATION,selectReserveTable),
    takeLatest(SagaActions.GET_CHECKOUT_ORDER_DETAILS,getCheckoutOrderDetails),
    takeLatest(SagaActions.KOT_PRINTING, doKOTPrinting),
    takeLatest(SagaActions.BOOK_TABLE,bookTable),
    takeLatest(SagaActions.RELEASE_TABLE,releaseTable),
    takeLatest(SagaActions.GET_FEEDBACK_QUESTIONS,GetFeedbackQuestions),
    takeLatest(SagaActions.SET_FEEDBACK_QUESANS,postFeedbackSaga),
    takeLatest(SagaActions.GET_ELIGIBLE_ORDERS_FOR_FEEDBACK,GetFeedbackOrders),    
    takeLatest(SagaActions.CLEAR_RESERVATIONS, clearAllReservation),
    takeLatest(SagaActions.SWAP_SUBORDER, swapSuborder),
    takeLatest(SagaActions.GET_REMARKS,GetRemarks),
    takeLatest(SagaActions.GET_TOTAL_FLOORS,GetTotalFloor),
    takeLatest(SagaActions.GET_TABLE_STATUS,fetchTableStatus),
    takeLatest(SagaActions.BOOK_TABLES,occupyTables),
    takeLatest(SagaActions.UNDO_CHECKOUT_TABLE,undoCheckoutTable), 
    takeLatest(SagaActions.BLOCK_TABLE,BlockTable),
    takeLatest(SagaActions.UNBLOCK_TABLE,UnblockTable),
    takeLatest(SagaActions.REDUCE_QUANTITY,reduceQuantity),
    takeLatest(SagaActions.BLOCK_TABLES,BlockTables),
    takeLatest(SagaActions.UNBLOCK_TABLES,UnblockTables)
  ])
}
