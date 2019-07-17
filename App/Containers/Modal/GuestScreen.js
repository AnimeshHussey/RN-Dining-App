import React, { Component } from 'react'
import ReactNative, { ScrollView, Text, Image, View, TouchableOpacity, TextInput, Alert,Dimensions  } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {  Toast,Card } from 'native-base';
import ReduxActions from "../../Redux/ActionTypes/Action";
import { connect } from 'react-redux';
import SagaActions from "../../Sagas/ActionTypes/Action";
import {defaultColor, supportingColor} from '../Styles/CommonStyles';

class GuestScreen extends Component {
  onLayout(e) {
    const {width, height} = Dimensions.get('window');
    this.props.dispatch({ type: ReduxActions.SCREEN_WIDTH, width: width });
    this.props.dispatch({ type: ReduxActions.SCREEN_HEIGHT, height: height });
    }
  getFontSize(size) {
    if((this.props.height > 800 && this.props.width > 1200)||(this.props.width > 800 && this.props.height > 1200)) {
      if(this.props.width < this.props.height) {
        return (this.props.height/this.props.width)* size ; 
        } else {
          return (this.props.width/this.props.height)* size; 
      }
    } else {
      if(this.props.width < this.props.height) {
        return (this.props.height/this.props.width)* size*0.5;
      } else {
        return (this.props.width/this.props.height)* size*0.5;
      }
    }
  }  
  componentWillMount(){   
    if(this.props.savedCustomer!==null &&(this.props.alreadyExists || this.props.isUserRegistered)){
      this.mobNoValidation(this.props.savedCustomer.toString())
    }
    if(this.props.mobileNo!==0 && this.props.CustomerName!==""){
      this.props.dispatch({type:ReduxActions.SET_BUTTON_PRESS, set: true})
    }
    // else{
    //   //this.props.dispatch({ type: ReduxActions.RESET_USER})
    // }
  }

  componentDidUpdate() {
    if(this.props.isResOpen) {     
      this.props.dispatch({ type: ReduxActions.SET_USER_MOBILE_NO,  mobileNumber: this.props.mobileNumder });
      this.props.dispatch({ type: ReduxActions.SET_USER_NAME,  userName: this.props.bookingName });
      this.setRegistered();
    }
    
  }

  render() {
    return (
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        borderWidth: 0.5, borderColor: 'black', height: this.getFontSize(230), width: this.props.width< this.props.height ?this.getFontSize(650):this.getFontSize(800), backgroundColor:supportingColor, opacity: 1
          }}  onLayout={this.onLayout.bind(this)}>
          <Card>
        <View style={{
          width: 100 + '%', backgroundColor: defaultColor, position: 'absolute', top: 0, left: 0,
          justifyContent: 'center', alignItems: 'center', height: this.getFontSize(50), zIndex: 2
          }}>
          <Text style={{ fontSize: this.getFontSize(35), color: 'white', fontWeight: 'bold' }}>
            Search Guest
          </Text>
        </View>
        <View style={{
           height: 90 + '%',
          width: 100 + '%', flexDirection: 'column', zIndex: 2, opacity: 1,
          justifyContent: 'center', alignItems: 'center', padding: this.getFontSize(20), marginTop:  this.getFontSize(50)   
        }}>
        <ScrollView>
          <View style={{ flex: 1, flexDirection: 'row', marginBottom: this.getFontSize(10) }}>
            <View style={{ width: 50 + '%', flexDirection: "row", justifyContent: 'flex-start' }}>
              <Text style={{ fontSize: this.getFontSize(30), color: 'black' }}>
                Enter Mobile Number:
              </Text>
            </View>
            <View style={{ width: 50 + '%', flexDirection: "row", justifyContent: 'flex-start' }}>
              <KeyboardAwareScrollView>
                <View style={{ width: 80 + '%', justifyContent: 'flex-start' }}>
                  <TextInput underlineColorAndroid='transparent' onChangeText={(text) => this.mobNoValidation(text)} editable={!(this.props.isResOpen||(this.props.CustomerName!=="" && this.props.isButtonClicked))}
                    style={{ height: this.getFontSize(40), borderColor: 'black', borderWidth: 0.5, paddingBottom: 2,color: 'black',
                     paddingTop: 2, fontSize: this.getFontSize(25), backgroundColor: '#fff', opacity: 1 }}
                    pattern="[1-9]{1}[0-9]{9}" value={this.props.isResOpen? this.props.mobileNumber.toString(): this.props.mobileNo.toString()} />
                </View>
              </KeyboardAwareScrollView>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', marginBottom: this.getFontSize(10) }}>
            <View style={{ width: 50 + '%', flexDirection: "row", justifyContent: 'flex-start' }}>
              <Text style={{ fontSize: this.getFontSize(30), color: 'black' }}>
                Guests' Name:
              </Text>
            </View>
            <View style={{ width: 50 + '%', flexDirection: "row", justifyContent: 'flex-start' }}>
              <KeyboardAwareScrollView>
                <View style={{ width: 80 + '%', justifyContent: 'flex-start' }}>
                  <TextInput underlineColorAndroid='transparent' editable={!(this.props.isResOpen||(this.props.CustomerName!=="" && this.props.isButtonClicked))}
                    style={{ height: this.getFontSize(40), borderColor: 'black', borderWidth: 0.5, paddingBottom: 2,
                     paddingTop: 2, fontSize: this.getFontSize(25), backgroundColor: '#fff', color: 'black',
                     opacity: 1  }} onChangeText={(text) => this.guestNameValidation(text)} 
                    value={this.props.isResOpen?this.props.bookingName: this.props.CustomerName}
                  />
                </View>
              </KeyboardAwareScrollView>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ width: 50 + '%', flexDirection: "row", justifyContent: 'flex-start' }}>
            </View>
            <View style={{ width: 50 + '%', flexDirection: "row", justifyContent: 'flex-start' }}>
              {!(this.props.isResOpen||(this.props.CustomerName!=="" && this.props.isButtonClicked)) && <TouchableOpacity style={{backgroundColor: defaultColor, height: this.getFontSize(50), padding: 10}}
              onPress={this.setRegistered.bind(this)}>
              <Text style={{color: 'white', fontSize: this.getFontSize(20) }}>{this.props.CustomerName===""?'Register':this.props.alreadyExists?'Select': 'Register'}</Text>
              </TouchableOpacity>}
            </View>
          </View>
          </ScrollView>
        </View>
       </Card>
      </View>
    )
  }
  mobNoValidation(inputtxt) {
    this.props.dispatch({ type: ReduxActions.SET_USER_MOBILE_NO,  mobileNumber: inputtxt });
    if(inputtxt.length === 10 && /^[0-9]{1,10}$/.test(inputtxt)){
      this.props.dispatch({ type: SagaActions.GET_USER_DETAILS,  mobileNumber: inputtxt, isResOpen: false });
    }
  }
  guestNameValidation(inputtxt) {
    this.props.dispatch({ type: ReduxActions.SET_USER_NAME,  userName: inputtxt })
  }
  setRegistered() {
    if(this.props.connectionStatus==='Online'){
      if(!this.props.orderNumber && !this.props.alreadyExists){
        this.props.dispatch({type: SagaActions.REGISTER_USER, customer: this.props.CustomerDetails})
      }
      else if(this.props.orderNumber){
          this.props.dispatch({type:ReduxActions.SET_BUTTON_PRESS, set: true})
          let obj={
            "OrderID": this.props.orderNumber,
            "customer": this.props.CustomerDetails,
            "custID": this.props.CustomerDetails.CustomerID,
            "tableID": this.props.selectedtable.TableID,
            "noofPerson": this.props.NoOfPerson,
            "finalCheckout": false,
            "TotalPrice": 0,
            "subOrder": []
          } 
          this.props.dispatch({ type: SagaActions.PLACE_ORDER, Obj: obj });
        } 
        
      else if(this.props.alreadyExists){
        this.props.dispatch({ type: ReduxActions.IS_USER_REGISTERED, response: this.props.mobileNo})
      }
    } else {
      Toast.show({
        text: 'You are offline. Please check internet connection.',
        textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
        duration: 3000,
        buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
        buttonText: "Okay",
        type: "danger"
      })
    }
    
  // else{
  //   this.props.dispatch({type: SagaActions.REGISTER_USER, customer: this.props.CustomerDetails})}
  }

  // checkUSer(){
  //   if(this.props.mobileNumber.length === 10 && /^[0-9]{1,10}$/.test(this.props.mobileNumber)){
  //     this.props.dispatch({ type: SagaActions.GET_USER_DETAILS,  mobileNumber: this.props.mobileNumber });
  //   }
  //   else{
  //     Toast.show({
  //           text: 'Please give a valid mobile number.',
  //           textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
  //           duration: 2000,
  //           buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
  //           buttonText: "Okay",
  //           type: "danger"
  //           });
  //   }
  // }
}



const mapStateToProps = (state) => {
  
  return {
    isUserModalVisible:state.UserReducer.isUserModalVisible,
    CustomerName: state.UserReducer.CustomerDetails.CustomerName,
    mobileNo: state.UserReducer.CustomerDetails.CustomerID,
    isUserRegistered: state.UserReducer.isUserRegistered,
    alreadyExists: state.UserReducer.alreadyExists,
    CustomerDetails:state.UserReducer.CustomerDetails,
    savedCustomer: state.UserReducer.savedCustomer,
    mobileNumber: state.ReservationReducer.mobileNumber,
    bookingName: state.ReservationReducer.bookingName,
    isResOpen: state.navReducer.isResOpen,
    orderNumber: state.menuReducer.orderNumber,
    NoOfPerson:state.tableReducer.NoOfPerson,
    selectedtable: state.floorReducer.selectedtable,
    isButtonClicked:state.UserReducer.isButtonClicked,
    height: state.DashBoardReducer.height,
    width: state.DashBoardReducer.width,
    connectionStatus: state.loginReducer.connectionStatus
  };
}

export default connect(mapStateToProps, null)(GuestScreen)

