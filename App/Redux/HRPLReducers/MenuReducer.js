import Immutable from 'seamless-immutable';
import ReduxActions from "../ActionTypes/Action";
import {
  Toast
} from 'native-base';
//import { Object } from 'core-js';

const INITIAL_STATE = Immutable({
  isOrderModalOpen: false,
  isOrderPlaced: "",
  Orders: [],
  selectedIndex: null,
  selectedCategory: [],
  itemList: [],
  orderObj: {
    "OrderID": "",
    "customer": {
      "CustomerID": 0,
      "CustomerName": "",
      "Address": "",
      "City": "",
      "State": "",
      "Email": "",
      "DOB": "",
      "ANNIVERSARYDATE": "",
      "REMARKS1": ""
    },
    "custID": "",
    "tableID": 0,
    "noofPerson": 0,
    "finalCheckout": false,
    "TotalPrice": 0,
    "subOrder": [],
    "CaptainNumber": '',
    "ChildTablesName": []
  },
  selectedItemforRemarks: '',
  comment: "",
  orderNumber: "",
  SubOrderNumber: 0,
  remarksList: [],
  // remarksList: [{"key":'Less chilli',"value":false},{"key":'Less spicy',"value":false},{"key": 'Less onion',"value":false}, {"key":'Less sugar',"value":false}, {"key":'Extra spicy',"value":false}, {"key":'Extra cheese',"value":false}, {"key":'Extra butter',"value":false}],
  selectedRemarks: [],
  searchedVal: null,
  searchedArr: [],
  searchVisable: false,
  isKeyBoardOpen: false
});


export const menuReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    // case ReduxActions.SET_MENU:
    // return Object.assign([], state, {menuItems:action.menuItems});

    case ReduxActions.SET_SELECTED_ITEMS:
      let tempSelectedMenu = [];
      if (state.searchedVal && state.searchedArr.length > 0) {
        tempSelectedMenu = Object.assign([], state.searchedArr[action.selectedIndex].Items);
      } else {
        tempSelectedMenu = Object.assign([], state.itemList[action.selectedIndex].Items);
      }
      //let tempSelectedMenu=Object.assign([],state.itemList[action.selectedIndex].Items);
      return Object.assign([], state, {
        selectedCategory: tempSelectedMenu,
        selectedIndex: action.selectedIndex
      })

    case ReduxActions.GOT_ALL_ITEMS:
      return Object.assign({}, state, {
        itemList: action.response
      })

    case ReduxActions.FAILED_TO_GET_ITEMS:
      return Object.assign({}, state);

    case ReduxActions.IS_ORDER_MODAL_OPEN:
      return Object.assign([], state, {
        isOrderModalOpen: action.isOrderModalOpen
      });

    case ReduxActions.SET_ORDERS:
      return Object.assign([], state, {
        Orders: action.selectedOrders
      });

    case ReduxActions.SELECTED_ITEM_FOR_REMARKS:
      return Object.assign([], state, {
        selectedItemforRemarks: action.ItemID
      });

    case ReduxActions.UPDATE_QUANTITY:
      let dummySelIndex, dummyItemIndex;
      let tempItemlist = Object.assign([], state.itemList);
      let tempSearchedArr = Object.assign([], state.searchedArr);
      if (state.searchedVal && state.searchedArr.length > 0) {
        tempItemlist.forEach((each, index) => {
          if (each.CategoryName === tempSearchedArr[state.selectedIndex].CategoryName) {
            dummySelIndex = index;
            each.Items.map((item, ind) => {
              if (item.ItemName === tempSearchedArr[state.selectedIndex].Items[action.itemIndex].ItemName) {
                dummyItemIndex = ind;
                if (action.toAdd) {
                  item.quantity += 1;
                } else {
                  if (item.quantity !== 0) {
                    item.quantity -= 1;
                  }
                }
              }
            })
          }
        })
        let tempOrders = Object.assign([], state.Orders);
        if (tempOrders.length === 0) {
          let temp = Object.assign({}, tempItemlist[dummySelIndex].Items[dummyItemIndex]);
          temp.CategoryIndex = dummySelIndex;
          temp.ItemIndex = dummyItemIndex;
          tempOrders.push(temp);
        } else {
          let tempState = false
          tempOrders.map((each, index) => {
            if (each.ItemID === tempItemlist[dummySelIndex].Items[dummyItemIndex].ItemID) {
              tempOrders[index].quantity = tempItemlist[dummySelIndex].Items[dummyItemIndex].quantity;
              tempState = true;
            }
            if (tempOrders[index].quantity === 0) {
              tempOrders.splice(index, 1)
            }
          })
          if (tempState === false) {
            let temp = Object.assign({}, tempItemlist[dummySelIndex].Items[dummyItemIndex]);
            temp.CategoryIndex = dummySelIndex;
            temp.ItemIndex = dummyItemIndex;
            tempOrders.push(temp);
          }
        }
        return (Object.assign({}, state, {
          Orders: tempOrders,
          selectedCategory: tempSearchedArr[state.selectedIndex].Items,
          itemList: tempItemlist,
          searchedArr: tempSearchedArr
        }))
      } else {
        if (action.toAdd) {
          tempItemlist[state.selectedIndex].Items[action.itemIndex].quantity += 1
        } else {
          if (tempItemlist[state.selectedIndex].Items[action.itemIndex].quantity !== 0) {
            tempItemlist[state.selectedIndex].Items[action.itemIndex].quantity -= 1
          }
        }
        let tempOrders = Object.assign([], state.Orders);
        if (tempOrders.length === 0) {
          let temp = Object.assign({}, tempItemlist[state.selectedIndex].Items[action.itemIndex]);
          temp.CategoryIndex = state.selectedIndex;
          temp.ItemIndex = action.itemIndex;
          tempOrders.push(temp);
        } else {
          let tempState = false
          tempOrders.map((each, index) => {
            if (each.ItemID === tempItemlist[state.selectedIndex].Items[action.itemIndex].ItemID) {
              tempOrders[index].quantity = tempItemlist[state.selectedIndex].Items[action.itemIndex].quantity;
              tempState = true;
            }
            if (tempOrders[index].quantity === 0) {
              tempOrders.splice(index, 1)
            }
          })
          if (tempState === false) {
            let temp = Object.assign({}, tempItemlist[state.selectedIndex].Items[action.itemIndex]);
            temp.CategoryIndex = state.selectedIndex;
            temp.ItemIndex = action.itemIndex;
            tempOrders.push(temp);
          }
        }
        return (Object.assign({}, state, {
          Orders: tempOrders,
          selectedCategory: tempItemlist[state.selectedIndex].Items,
          itemList: tempItemlist
        }))
      }

      case ReduxActions.CHANGE_QUANTITY_FROM_MODAL:

        let tempItemlist1 = Object.assign([], state.itemList)
        if (action.toAdd) {
          tempItemlist1[action.itemDetails.CategoryIndex].Items[action.itemDetails.ItemIndex].quantity += 1
        } else {
          if (tempItemlist1[state.selectedIndex].Items[action.itemDetails.ItemIndex].quantity !== 0) {
            tempItemlist1[action.itemDetails.CategoryIndex].Items[action.itemDetails.ItemIndex].quantity -= 1
          }
        }
        let tempOrders1 = Object.assign([], state.Orders)
        if (action.toAdd) {
          tempOrders1[action.itemIndex].quantity += 1;
        }
        if (!action.toAdd) {
          if (tempOrders1[action.itemIndex].quantity !== 0)
            tempOrders1[action.itemIndex].quantity -= 1;
        }
        if (state.searchedVal && state.searchedArr.length > 0) {
          return (Object.assign({}, state, {
            Orders: tempOrders1,
            itemList: tempItemlist1,
            selectedCategory: state.searchedArr[state.selectedIndex].Items
          }))
        } else {
          return (Object.assign({}, state, {
            Orders: tempOrders1,
            itemList: tempItemlist1,
            selectedCategory: tempItemlist1[state.selectedIndex].Items
          }))
        }

        case ReduxActions.RESET_PLACING_ORDER:
          return (Object.assign({}, state, {
            isOrderPlaced: INITIAL_STATE.isOrderPlaced
          }))

          case ReduxActions.PLACING_ORDER:
          return (Object.assign({}, state, {
            isOrderPlaced: "PLACING"
          }))

        case ReduxActions.SUCCESSFULLY_PLACED_ORDER:
          Toast.show({
            text: "Order Successfully placed! ",
            textStyle: {
              fontSize: 25,
              fontFamily: 'Avenir-Black',
              fontWeight: 'bold'
            },
            duration: 3000,
            buttonTextStyle: {
              fontSize: 20,
              fontFamily: 'Avenir-Black'
            },
            buttonText: "Okay",
            type: "success"
          });
          let orderId = action.response.trim();
          let tempOrdObj = Object.assign({}, state.orderObj);
          tempOrdObj.OrderID = orderId;
          return (Object.assign({}, state, {
            isOrderPlaced: "SUCCESS",
            orderNumber: orderId,
            orderObj: tempOrdObj,
            Orders: []
          }))

        case ReduxActions.FAILED_TO_PLACE_ORDER:
          return (Object.assign({}, state, {
            isOrderPlaced: "FAILED"
          }))

        case ReduxActions.RESET_ITEM_QUANTITY:
          let number = state.SubOrderNumber + 1;
          return Object.assign({}, state, {
            itemList: action.itemList,
            SubOrderNumber: number
          })

        case ReduxActions.SET_EXISTING_ORDER_ID:
          let OrdObj = Object.assign({}, state.orderObj);
          OrdObj.OrderID = action.OrderID;
          return Object.assign({}, state, {
            orderNumber: action.OrderID,
            SubOrderNumber: action.SubOrderNumber,
            orderObj: OrdObj
          })

        case ReduxActions.RESET_MENU_REDUCER:
          let tempList = [...state.itemList]
          tempList.forEach((element) => {
            element.Items.forEach(item => {
              item.quantity = 0;
            })
          });
          return Object.assign({}, state, {
            isOrderModalOpen: false,
            isOrderPlaced: "",
            Orders: [],
            selectedIndex: null,
            selectedCategory: [],
            orderObj: {
              "OrderID": "",
              "customer": {
                "CustomerID": 0,
                "CustomerName": "",
                "Address": "",
                "City": "",
                "State": "",
                "Email": ""
              },
              "custID": "",
              "tableID": 0,
              "noofPerson": 0,
              "finalCheckout": false,
              "TotalPrice": 0,
              "subOrder": [],
              "CaptainNumber": '',
              "ChildTables": []
            },
            selectedItemforRemarks: '',
            comment: "",
            orderNumber: "",
            SubOrderNumber: 0,
            // remarksList: [{"key":'Less chilli',"value":false},{"key":'Less spicy',"value":false},{"key": 'Less onion',"value":false}, {"key":'Less sugar',"value":false}, {"key":'Extra spicy',"value":false}, {"key":'Extra cheese',"value":false}, {"key":'Extra butter',"value":false}],
            selectedRemarks: [],
            itemList: tempList,
            searchedVal: null,
            searchedArr: [],
            searchVisable: false,
            isKeyBoardOpen: false
          })

        case ReduxActions.SET_ORDER_ID:
          return Object.assign({}, state, {
            orderNumber: action.response
          })

        case ReduxActions.IS_KEYBOARD_OPEN:
          return Object.assign({}, state, {
            isKeyBoardOpen: action.isKeyboardOpen
          })

        case ReduxActions.UPDATE_REMARKS_LIST:
          let allData = Object.assign([], state.remarksList);
          allData.forEach((each, index) => {
            if (action.selectedRemarks.key === each.key) {
              allData[index] = {
                "key": action.selectedRemarks.key,
                "value": !each.value
              }
            }
          })
          return Object.assign({}, state, {
            remarksList: allData
          })

        case ReduxActions.RESET_REMARKS:
          return Object.assign({}, state, {
            comment: INITIAL_STATE.comment
          })

        case ReduxActions.RESET_REMARKSLIST:
          var tempOut = [];
          state.remarksList.forEach((each, index) => {
            tempOut.push({
              "key": each.key,
              "value": false
            })
          })
          return Object.assign({}, state, {
            remarksList: tempOut
          })

        case ReduxActions.COMMENT_REMOVED:
          return Object.assign({}, state, {
            Orders: action.newObj
          })

        case ReduxActions.SET_COMMENT:
          return Object.assign({}, state, {
            comment: action.remarks
          })

        case ReduxActions.SET_REMARKS:
          var tempOut = [];
          action.response.forEach((each, index) => {
            tempOut.push({
              "key": each,
              "value": false
            })
          })
          return Object.assign([], state, {
            remarksList: tempOut
          });

        case ReduxActions.ERROR_REMARKS:
          Toast.show({
            text: "Error in fetching Remarks List! Please try again.",
            textStyle: {
              fontSize: 25,
              fontFamily: 'Avenir-Black',
              fontWeight: 'bold'
            },
            duration: 2000,
            buttonTextStyle: {
              fontSize: 20,
              fontFamily: 'Avenir-Black'
            },
            buttonText: "Okay",
            type: "danger"
          });

        case ReduxActions.SET_SEARCH_VALUE_MENU:
          return Object.assign({}, state, {
            searchedVal: action.searchedVal
          });

        case ReduxActions.SET_SEARCH_RESULTS_MENU:
          return Object.assign({}, state, {
            searchedArr: action.searchedArr
          });

        case ReduxActions.IS_SEARCH_VISIBLE:
          return Object.assign({}, state, {
            searchVisable: action.searchVisable
          });

        case ReduxActions.RESET_SEARCH_DATA_MENU_REDUCER:
          return Object.assign({}, state, {
            searchedVal: null,
            searchedArr: [],
            selectedIndex: 0,
            selectedCategory: state.itemList[0].Items,
          })
        default:
          return Object.assign({}, state);
  }
}
