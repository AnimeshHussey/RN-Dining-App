import React, { Component } from 'react'
import ReactNative, { ScrollView, Text, Image, View, TouchableOpacity, TextInput, Alert,Dimensions  } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {  Toast,Card } from 'native-base';
import ReduxActions from "../../Redux/ActionTypes/Action";
import { connect } from 'react-redux';
import SagaActions from "../../Sagas/ActionTypes/Action";
import {defaultColor, supportingColor} from '../Styles/CommonStyles';

class ReduceQuantityScreen extends Component {
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

  componentDidUpdate() {
    if(this.props.successfullyReducedQuantity){
      this.props.dispatch({type:ReduxActions.SHOW_QUANTITY_MODAL,showhideModal:false});
      this.props.dispatch({type:ReduxActions.SET_CHANGED_QUANTITY,newQuantity:''});       
      Toast.show({
        text: 'Reduced quantity successfully.',
        textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
        duration: 3000,
        buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
        buttonText: "Okay",
        type: "success"
      }) 
      this.props.dispatch({type:ReduxActions.RESET_CHANGED_QUANTITY});
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
          justifyContent: 'center', alignItems: 'center', height: this.getFontSize(40), zIndex: 2
          }}>
          <Text style={{ fontSize: this.getFontSize(35), color: 'white', fontWeight: 'bold' }}>{this.props.itemName}</Text>
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
              Current Quantity:
              </Text>
            </View>
            <View style={{ width: 50 + '%', flexDirection: "row", justifyContent: 'flex-start' }}>
              <KeyboardAwareScrollView>
                <View style={{ width: 80 + '%', justifyContent: 'flex-start' }}>
                <Text style={{ fontSize: this.getFontSize(30), color: 'black' }}>{this.props.itemQuantity.toString()}</Text>
                </View>
              </KeyboardAwareScrollView>
            </View>
          </View>  
          <View style={{ flex: 1, flexDirection: 'row', marginBottom: this.getFontSize(10) }}>
            <View style={{ width: 50 + '%', flexDirection: "row", justifyContent: 'flex-start' }}>
              <Text style={{ fontSize: this.getFontSize(30), color: 'black' }}>
                New Quantity:
              </Text>
            </View>
            <View style={{ width: 50 + '%', flexDirection: "row", justifyContent: 'flex-start' }}>
              <KeyboardAwareScrollView>
                <View style={{ width: 80 + '%', justifyContent: 'flex-start' }}>
                  <TextInput underlineColorAndroid='transparent' keyboardType='numeric' onChangeText={(text) => this.chagedItemQuantity(text)}
                    style={{ height: this.getFontSize(40), borderColor: 'black', borderWidth: 0.5, paddingBottom: 2,color: 'black',
                     paddingTop: 2, fontSize: this.getFontSize(25), backgroundColor: '#fff', opacity: 1 }}
                    pattern="[1-9]{1}[0-9]{9}" value={this.props.changeditemQuantity} />
                </View>
              </KeyboardAwareScrollView>
            </View>
          </View>            
           <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ width: 50 + '%', flexDirection: "row", justifyContent: 'flex-start' }}>
            </View>
            <View style={{ width: 50 + '%', flexDirection: "row", justifyContent: 'flex-start' }}>
              <TouchableOpacity style={{backgroundColor: defaultColor, height: this.getFontSize(50), padding: 10}}
              onPress={this.setRegistered.bind(this)}>
              <Text style={{color: 'white', fontSize: this.getFontSize(20) }}>Change Quantity</Text>
              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
        </View>
       </Card>
      </View>
    )
  }
  chagedItemQuantity(inputtxt) {
   this.props.dispatch({type:ReduxActions.SET_CHANGED_QUANTITY,newQuantity:inputtxt}); 
  }
  guestNameValidation(inputtxt) {
    this.props.dispatch({ type: ReduxActions.SET_USER_NAME,  userName: inputtxt })
  }
  setRegistered() {
    if(this.props.connectionStatus==='Online'){
      if(parseInt(this.props.itemQuantity)>parseInt(this.props.changeditemQuantity) && parseInt(this.props.changeditemQuantity)>0){
        let obj={
          "OrderID": this.props.orderNumber,
          "ItemID": this.props.itemID,
          "Suborder": this.props.suborderNumber,
          "Reduction": parseInt(this.props.itemQuantity)-parseInt(this.props.changeditemQuantity),
          "CaptainID": this.props.mobileNo,
          "UOM": this.props.selectedSection.m_Item3
        }
        this.props.dispatch({type: SagaActions.REDUCE_QUANTITY, obj: obj});        
      }
      else{
        Toast.show({
          text: parseInt(this.props.changeditemQuantity)===0?'Quantity must be greater than 0.':'Reduced quantity must be less than the current quantity.',
          textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
          duration: 3000,
          buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
          buttonText: "Okay",
          type: "danger"
        }) 
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
    mobileNo: state.DashBoardReducer.userID,
    orderNumber: state.menuReducer.orderNumber,
    height: state.DashBoardReducer.height,
    width: state.DashBoardReducer.width,
    connectionStatus: state.loginReducer.connectionStatus,
    changeditemQuantity:state.reviewReducer.changeditemQuantity,
    successfullyReducedQuantity:state.reviewReducer.successfullyReducedQuantity,
    selectedSection:state.floorReducer.selectedSection
  };
}

export default connect(mapStateToProps, null)(ReduceQuantityScreen)

