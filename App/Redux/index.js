import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import { ReservationReducer } from './HRPLReducers/ReservationReducer';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  navReducer: require('./HRPLReducers/NavReducer').navReducer,
  floorReducer: require('./HRPLReducers/FloorReducer').floorReducer,
  tableReducer: require('./HRPLReducers/TableReducer').tableReducer,
  reviewReducer:require('./HRPLReducers/ReviewOrderReducer').reviewReducer,
  loginReducer:require('./HRPLReducers/LoginReducer').loginReducer,
  menuReducer:require('./HRPLReducers/MenuReducer').menuReducer,
  DashBoardReducer:require('./HRPLReducers/DashBoardReducer').DashBoardReducer,
  ReservationReducer: require('./HRPLReducers/ReservationReducer').ReservationReducer,
  checkOutReducer:require('./HRPLReducers/CheckoutOrderReducer').checkOutReducer,
  UserReducer:require('./HRPLReducers/UserReducer').UserReducer,
  FeedbackReducer:require('./HRPLReducers/FeedbackReducer').FeedbackReducer
})

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
