const baseUrl = '';
export const globalUrl = (ip, port) => {
  baseUrl = 'http://' + ip + ':' + port + '/';
  return baseUrl;
}

// const NetworkError=()=> Toast.show({
//   text: "Unable to connect your network. Please check your connection and try again.",
//   textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
//   duration: 3000,
//   buttonTextStyle: { fontSize: 15, fontFamily: 'Avenir-Black' },
//   buttonText: "Okay",
//   type: "danger"
// });

export const KOTPrinting = async (kotData) => {
  try {
    const response = await fetch(baseUrl + 'orderdetails/ReprintKOT', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(kotData),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}
export const LoginCaptain = async (loginDetails) => {
  let url = baseUrl + 'HRPL/User/Validate';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginDetails),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const RegisterCaptain = async (objUser) => {
  try {
    const response = await fetch(baseUrl + 'HRPL/User/createUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objUser),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}


export const createOrder = async (objOrder) => {
  try {
    // const responseJson = api.post(baseUrl + 'orderdetails/CreateOrder',objOrder);
    // return responseJson;
    // const response = await axios.post(baseUrl + 'orderdetails/CreateOrder', objOrder);
    // const responseJson = await response.data;    
    const response = await fetch(baseUrl + 'orderdetails/CreateOrder', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objOrder),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const clearReservations = async (listofIDs) => {
  try {
    const response = await fetch(baseUrl + 'HRPL/Reservation/ClearTable', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listofIDs),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const occupyTable = async (id) => {
  try {
    const response = await fetch(baseUrl + 'HRPL/table/BookTable?id=' + id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const tableRelease = async (id, orderExistAndEmpty, captain) => {
  try {
    const response = await fetch(baseUrl + 'HRPL/table/ReleaseTable?id=' + id + '&orderExistAndEmpty=' + orderExistAndEmpty + '&Captain=' + captain, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const undoCheckout = async (id, orderiD) => {
  try {
    const response = await fetch(baseUrl + 'orderdetails/UndoCheckOut?OrderID=' + orderiD + '&TableID=' + id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const approveOrder = async (objUser) => {
  try {
    const response = await fetch(baseUrl + 'orderdetails/ApprovedOrder', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objUser),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const getAllItems = async (priceGr) => {
  let url = baseUrl + 'hrpl/item/all?UOM=' + priceGr;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const getCustomer = async (mobileNumber) => {
  let url = baseUrl + 'HRPL/customer/SearchbyMobile?mobile=' + mobileNumber;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const getTableStatus = async (tableID) => {
  let url = baseUrl + 'orderdetails/GetLastOrderStatus?tableID=' + tableID;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const createUser = async (objUser) => {
  try {
    const response = await fetch(baseUrl + 'HRPL/customer/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objUser),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const saveFloors = async (mobile, section, pricegroup) => {
  try {
    const response = await fetch(baseUrl + 'HRPL/floor/FloorsWithOrderDetails?phone=' + mobile + '&section=' + section + '&Pricegroup=' + pricegroup);
    const res = await response.json();
    return res;
  }
  catch (err) {
    return err;
  }
}

export const getTotalNoOfFloors = async () => {
  try {
    const response = await fetch(baseUrl + 'HRPL/floor/FloorsWithPriceGroup');
    const res = await response.json();
    return res;
  }
  catch (err) {
    return err;
  }
}


export const saveOrder = async (orderdata) => {
  try {
    const response = await fetch(baseUrl + 'api/OrderDetails', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderdata),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const swapOrder = async (orderdata) => {
  try {
    const response = await fetch(baseUrl + 'orderdetails/CancelOrSwapSubOrder', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderdata),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const getCustomersbyName = async (name) => {
  let url = baseUrl + 'HRPL/customer/SearchbyName?Name=' + name;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const getReviewOrder = async (orderID, priceGr) => {
  let url = baseUrl + 'api/OrderDetails?OrderID=' + orderID + "&UOM=" + priceGr;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const getFinalOrder = async (orderID) => {
  let url = baseUrl + 'HRPL/orderdetails/FinalOrder?OrderID=' + orderID;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const DeleteCustomer = async (CustomerID) => {
  try {
    const response = await fetch(baseUrl + 'HRPL/customer/DeleteCustomer?mobile=' + CustomerID, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const tableDetails = async () => {
  let url = baseUrl + 'HRPL/floor/FloorsWithOrderDetails';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const ModifyCustomer = async (objUserModified) => {
  try {
    const response = await fetch(baseUrl + 'HRPL/customer/ModifyCustomer', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objUserModified),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const bookTable = async (tableNumber) => {
  let url = baseUrl + 'HRPL/table/BookTable?id=' + tableNumber;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const blockTable = async (tableNumber, LockOrCheck) => {
  let url = baseUrl + 'HRPL/table/BlockTable?id=' + tableNumber + '&LockOrCheck=' + LockOrCheck;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const unblockTable = async (tableNumber) => {
  let url = baseUrl + 'HRPL/table/UnblockTable?id=' + tableNumber;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const blockTables = async (tableNumbers, LockOrCheck) => {
  let url = baseUrl + 'HRPL/table/BlockTableGroup?LockOrCheck=' + LockOrCheck;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tableNumbers),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const unblockTables = async (tableNumbers) => {
  let url = baseUrl + 'HRPL/table/UnBlockTableGroup';
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tableNumbers),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const bookTables = async (tableNumbers) => {
  let url = baseUrl + 'HRPL/table/BookTableGroup';
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tableNumbers),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const reserveTable = async (objReserve) => {
  try {
    const response = await fetch(baseUrl + 'HRPL/Reservation/createReservation', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objReserve),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const selectReservTable = async (objReserve) => {
  try {
    const response = await fetch(baseUrl + 'HRPL/Reservation/bookTable', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objReserve),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const getAllReservations = async () => {
  let url = baseUrl + 'HRPL/Reservation/GetReservation';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const cancelReservation = async (restoDel, ID) => {
  let url = baseUrl + 'HRPL/Reservation/CancelReservation?ID=' + ID;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(restoDel),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const modifyReservationById = async (restoModify, ID) => {
  let url = baseUrl + 'HRPL/Reservation/ModifyReservation?ID=' + ID;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(restoModify),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const getReserveTableDetail = async (objIsResered) => {
  try {
    const response = await fetch(baseUrl + 'HRPL/Reservation/ModifyReservation', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objIsResered),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const releaseTable = async (tableNumber) => {
  let url = baseUrl + 'HRPL/table/ReleaseTable?id=' + tableNumber;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const ReduceItemQuantity = async (obj) => {
  try {
    const response = await fetch(baseUrl + 'orderdetails/ReduceQuantity', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const getFeedbackQuestions = async () => {
  let url = baseUrl + 'HRPL/Feedback/getQuestions';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const getRemarks = async () => {
  let url = baseUrl + 'orderdetails/RemarksList';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const postFeedbackQuesAns = async (objFeedback, orderID) => {
  try {
    const response = await fetch(baseUrl + 'HRPL/Feedback/InsertEntry', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objFeedback),
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

export const getEligibleOrders = async () => {
  let url = baseUrl + 'HRPL/Feedback/OrdersWithNoFeedback';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const responseJson = await response.json();
    return responseJson;
  }
  catch (err) {
    return err;
  }
}

//  export async function  createOrder (objOrder){
//   try {
//     debugger;
//     let response= await fetch(baseUrl + 'orderdetails/CreateOrder', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(objOrder),
//       timeout: 2000
//     });
//    return await response.json();
//   } catch (error) {
//     throw error;
//   }
// }
// export function  createOrder (objOrder){
//   return new Promise((resolve, reject) => {
//     console.log('fetching');
//     fetch(baseUrl + 'orderdetails/CreateOrder', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//        'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(objOrder)
//     })
//       .then((response) => {
//       console.log('first then')
//       return response.json();
//       }).then(responseJson => {
//       debugger; 
//       resolve(responseJson);
//       }).catch(err => {
//       console.log('in catch')
//       reject(err)
//       debugger;
//       throw err;
//       });
//   });
// }