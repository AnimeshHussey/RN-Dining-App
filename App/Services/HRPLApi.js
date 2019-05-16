
const baseUrl = '';
//http://10.31.101.118:8080
//http://192.168.1.3:8080
//192.168.1.5
//192.168.137.1
export const globalUrl= (ip, port) => {
  baseUrl = 'http://' + ip + ':' + port+ '/';
  //baseUrl = 'http://pwcappdemo.azurewebsites.net/';
  return baseUrl;
}

export const KOTPrinting = (kotData) => {
  return fetch(baseUrl + 'orderdetails/ReprintKOT', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(kotData),
  }).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}
export const LoginCaptain = (loginDetails) => {
  let url = baseUrl + 'HRPL/User/Validate';
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginDetails),
  }).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
  });
}

export const RegisterCaptain = (objUser) => {
  return fetch(baseUrl + 'HRPL/User/createUser', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objUser),
  }).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
  });
}

export const createOrder = (objOrder) => {
  return fetch(baseUrl + 'orderdetails/CreateOrder', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objOrder),
  }).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

    export const clearReservations = (listofIDs) => {
      return fetch(baseUrl+'HRPL/Reservation/ClearTable', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(listofIDs),
          }).then((response) => {
            return response.json();
          }).then(responseJson => {
            return responseJson;     
          }).catch(err => {
            
          });
        }

      export const occupyTable = (id) => {
        return fetch(baseUrl+'HRPL/table/BookTable?id='+id, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(id),
            }).then((response) => {
              return response.json();
            }).then(responseJson => {
              return responseJson;     
            }).catch(err => {
              
            });
          }

export const tableRelease = (id,orderExistAndEmpty,captain) => {
  return fetch(baseUrl + 'HRPL/table/ReleaseTable?id=' + id+'&orderExistAndEmpty='+orderExistAndEmpty+'&Captain='+captain, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  }).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {    
  });
}

export const undoCheckout = (id,orderiD) => {
  return fetch(baseUrl + 'orderdetails/UndoCheckOut?OrderID='+orderiD+'&TableID='+id, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  }).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {    
  });
}

export const approveOrder = (objUser) => {
  return fetch(baseUrl + 'orderdetails/ApprovedOrder', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objUser),
  }).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const getAllItems = (priceGr) => {
  let url = baseUrl + 'hrpl/item/all?UOM='+priceGr;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  ).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const getCustomer = (mobileNumber) => {
  let url = baseUrl + 'HRPL/customer/SearchbyMobile?mobile=' + mobileNumber;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  ).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const getTableStatus = (tableID) => {
  let url = baseUrl + 'orderdetails/GetLastOrderStatus?tableID=' + tableID;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  ).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const createUser = (objUser) => {
  return fetch(baseUrl + 'HRPL/customer/create', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objUser),
  }).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const saveFloors = (mobile, section,pricegroup) => {
  return fetch(baseUrl + 'HRPL/floor/FloorsWithOrderDetails?phone='+mobile+'&section='+section+'&Pricegroup='+pricegroup)
    .then(response => {
      return response.json()
    })
    .then(res => {
      return res;
    }).catch(err => {
      
    });
}

export const getTotalNoOfFloors = () => {
  return fetch(baseUrl + 'HRPL/floor/FloorsWithPriceGroup')
    .then(response => {
      return response.json()
    })
    .then(res => {
      return res;
    }).catch(err => {
      
    });
}


export const saveOrder = (orderdata) => {
  return fetch(baseUrl + 'api/OrderDetails', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderdata),
  }).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const swapOrder = (orderdata) => {  
  return fetch(baseUrl + 'orderdetails/CancelOrSwapSubOrder', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderdata),
  }).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const getCustomersbyName = (name) => {
  let url = baseUrl + 'HRPL/customer/SearchbyName?Name=' + name;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const getReviewOrder = (orderID,priceGr) => {
  let url = baseUrl + 'api/OrderDetails?OrderID=' + orderID+"&UOM="+priceGr;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  ).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const getFinalOrder = (orderID) => {
  let url = baseUrl + 'HRPL/orderdetails/FinalOrder?OrderID=' + orderID;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  ).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const DeleteCustomer = (CustomerID) => {
  return fetch(baseUrl + 'HRPL/customer/DeleteCustomer?mobile=' + CustomerID, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const tableDetails = () => {
  let url = baseUrl + 'HRPL/floor/FloorsWithOrderDetails';
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  ).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const ModifyCustomer = (objUserModified) => {
  return fetch(baseUrl + 'HRPL/customer/ModifyCustomer', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objUserModified),
  }).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const bookTable = (tableNumber) => {
  let url = baseUrl + 'HRPL/table/BookTable?id=' + tableNumber;
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  ).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const blockTable = (tableNumber,LockOrCheck) => {
  let url = baseUrl + 'HRPL/table/BlockTable?id=' + tableNumber+'&LockOrCheck='+LockOrCheck;
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  ).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const unblockTable = (tableNumber) => {
  let url = baseUrl + 'HRPL/table/UnblockTable?id=' + tableNumber;
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  ).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const blockTables = (tableNumbers,LockOrCheck) => {
  let url = baseUrl + 'HRPL/table/BlockTableGroup?LockOrCheck='+LockOrCheck;
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tableNumbers),
  }
  ).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const unblockTables = (tableNumbers) => {
  let url = baseUrl + 'HRPL/table/UnBlockTableGroup';
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tableNumbers),
  }
  ).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const bookTables = (tableNumbers) => {
  let url = baseUrl + 'HRPL/table/BookTableGroup';
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tableNumbers),
  }
  ).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const reserveTable = (objReserve) => {
  return fetch(baseUrl + 'HRPL/Reservation/createReservation', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objReserve),
  }).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const selectReservTable = (objReserve) => {
  return fetch(baseUrl + 'HRPL/Reservation/bookTable', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objReserve),
  }).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const getAllReservations = () => {
  let url = baseUrl + 'HRPL/Reservation/GetReservation';
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  ).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const cancelReservation = (restoDel, ID) => {
  let url = baseUrl + 'HRPL/Reservation/CancelReservation?ID=' + ID;
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(restoDel),
  }
  ).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const modifyReservationById = (restoModify, ID) => {
  let url = baseUrl + 'HRPL/Reservation/ModifyReservation?ID=' + ID;
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(restoModify),
  }
  ).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const getReserveTableDetail = (objIsResered) => {
  return fetch(baseUrl + 'HRPL/Reservation/ModifyReservation', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objIsResered),
  }).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const releaseTable = (tableNumber) => {
  let url = baseUrl + 'HRPL/table/ReleaseTable?id=' + tableNumber;
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  ).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const ReduceItemQuantity = (obj) => {
  return fetch(baseUrl + 'orderdetails/ReduceQuantity', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  }).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {    
  });
}

export const getFeedbackQuestions = () => {
  let url = baseUrl + 'HRPL/Feedback/getQuestions';
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  ).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const getRemarks = () => {
  let url = baseUrl + 'orderdetails/RemarksList';
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  ).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const postFeedbackQuesAns = (objFeedback, orderID) => {
  return fetch(baseUrl + 'HRPL/Feedback/InsertEntry', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objFeedback),
  }).then((response) => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  }).catch(err => {
    
  });
}

export const getEligibleOrders = () => {
    let url = baseUrl + 'HRPL/Feedback/OrdersWithNoFeedback';
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    ).then((response) => {
      return response.json();
    }).then(responseJson => {
      return responseJson;
    }).catch(err => {
      
    });
  }
