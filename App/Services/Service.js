import fetch from "react-native-fetch-polyfill";
import { Toast} from 'native-base';

let headers = new Headers();
headers.set("Accept", "application/json");
headers.set("Content-Type", "application/json");
headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
headers.set("Pragma", "no-cache");
headers.set("Expires", "0");

let headersUrlEncoded = new Headers();
headersUrlEncoded.set("Accept", "application/json");
headersUrlEncoded.set("Content-Type", "application/json");
headersUrlEncoded.set("Cache-Control", "no-cache, no-store, must-revalidate");
headersUrlEncoded.set("Pragma", "no-cache");
headersUrlEncoded.set("Expires", "0");

const NetworkError=()=> Toast.show({
  text: "Failed to place order for network issue.",
  textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
  duration: 2000,
  buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
  buttonText: "Okay",
  type: "danger"
});

class api {
  static post(endpoint, data) {
    return new Promise((resolve, reject) => {      
            return fetch(endpoint, {
              method: "POST",
              headers: headers,
              body: JSON.stringify(data),
              timeout: 10000
            })
              .then(response => {
                let status = response.status;
                let json = response.json();                
                if (status === 200) {
                  json
                    .then(res => {
                      resolve(res);
                    })
                    .catch(err => {   
                      NetworkError();                   
                      reject(err);
                    });
                } else {
                  json
                    .then(res => {
                      reject(res);
                    })
                    .catch(err => {       
                      NetworkError();               
                      reject(err);
                    });
                }
              })
              .catch(error => {  
                NetworkError();              
                reject(error);
              });
          })
        }

  static put(endpoint, data) {
    return new Promise((resolve, reject) => {
          return fetch(endpoint, {
              method: "PUT",
              headers: headers,
              body: JSON.stringify(data),
              timeout: 10000
            })
              .then(response => {
                let status = response.status;
                let json = response.json();
                if (status === 200) {
                  json
                    .then(res => {
                      resolve(res);
                    })
                    .catch(err => {
                      reject(err);
                    });
                } else {
                  json
                    .then(res => {
                      reject(res);
                    })
                    .catch(err => {
                      reject(err);
                    });
                }
              })
              .catch(error => {
                reject(error);
              });
          })
        }

  static get(endpoint) {
    return new Promise((resolve, reject) => {            
            return fetch(endpoint, {
              method: "GET",
              headers: headers,
              timeout: 10000
            })
              .then(response => {
                let status = response.status;
                let json = response.json();
                if (status === 200) {
                  json
                    .then(res => {
                      resolve(res);
                    })
                    .catch(err => {
                      reject(err);
                    });
                } else {
                  json
                    .then(res => {
                      reject(res);
                    })
                    .catch(err => {
                      reject(err);
                    });
                }
              })
              .catch(error => {
                reject(error);
              });
          })
  }

  static delete(endpoint) {
    return new Promise((resolve, reject) => {            
            return fetch(endpoint, {
              method: "DELETE",
              headers: headers,
              timeout: 10000
            })
              .then(response => {
                let status = response.status;
                let json = response.json();
                if (status === 200) {
                  json
                    .then(res => {
                      resolve(res);
                    })
                    .catch(err => {
                      reject(err);
                    });
                } else {
                  json
                    .then(res => {
                     reject(res);
                    })
                    .catch(err => {
                      reject(err);
                    });
                }
              })
              .catch(error => {
                reject(error);
              });
          })
  }

}

export default api;