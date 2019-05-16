import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native'
import { Card,Toast } from 'native-base';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from "moment";
import ReduxActions from "../../Redux/ActionTypes/Action";
import SagaActions from "../../Sagas/ActionTypes/Action";
import Icon from 'react-native-vector-icons/FontAwesome';
import {defaultColor, supportingColor} from '../Styles/CommonStyles';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {NavigationActions } from 'react-navigation';

class Reservation extends Component {
  _showDateTimePicker = () => 
  {if(!this.props.isDateTimePickerVisible)
  this.props.dispatch({type:ReduxActions.IS_RESRV_DATETIME_VISIBLE, isVisible: true })};

  _hideDateTimePicker = () => {
    if(this.props.isDateTimePickerVisible)
    this.props.dispatch({type:ReduxActions.IS_RESRV_DATETIME_VISIBLE, isVisible: false })};

  _handleDatePicked = (date) => {
    var submittedTime = moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss'+'.000Z');
    this.changeField(submittedTime,"BookedDate");
    this._hideDateTimePicker();
  };
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
  changeField(value,type) {
    switch(type)
    {
      case "Mobile":
      this.props.dispatch({ type: ReduxActions.SET_MOBILE_NUMBER, mobileNumber:value});
      if(value.length === 10 && /^[0-9]{1,10}$/.test(value)){
        this.props.dispatch({ type: SagaActions.GET_USER_DETAILS,  mobileNumber: value, isResOpen: true });
      }
      break;
      case "Name":
      this.props.dispatch({ type: ReduxActions.SET_BOOKING_NAME, bookingName:value.toString() });
      break;
      case "Guests":
      this.props.dispatch({ type: ReduxActions.SET_NO_OF_GUEST, noOfGuest:value });
      break;
      case "BookedDate":
      this.props.dispatch({ type: ReduxActions.SET_DATE_TIME, dateTime:value });
      break;
      default:
      break;
    }
    this.isSubmit();
  }
  isSubmit() {
    if(this.props.mobileNumber !== '' && this.props.bookingName !== '' && this.props.noOfGuest !== '' && this.props.dateTime !== '') {
      this.props.dispatch({type:ReduxActions.IS_RESRV_FIELDS_VERIFIED,isVerified: false});
    } else {
      this.props.dispatch({type:ReduxActions.IS_RESRV_FIELDS_VERIFIED,isVerified: true});
    }
  }

  afterModify(){
    if(this.props.noOfGuest === '0') {
      Toast.show({
        text: 'Number of guest would not be zero!',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "danger"
        });
      } else {
        if(this.props.connectionStatus==='Online'){
          let temp =Object.assign({},this.props.ResToModify);
          let objModify = {
            "ID": temp.ID,
            "CUSTOMERID": this.props.mobileNumber,
            "BOOKINGNAME": this.props.bookingName,
            "NOOFPERSONS": this.props.noOfGuest,
            "BOOKINGDATETIME": this.props.dateTime,
            "STATUS": 0,
            "CREATEDBY": "string",
            "MODIFIEDBY": "string"
          };       
             this.props.dispatch({ type: SagaActions.MODIFY_RESERVATION_DETAILS, objModify });
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
  }
  }
  afterSubmit() {
    if(this.props.mobileNumber.length !== 10) {
      Toast.show({
        text: 'Mobile number should be 10 digits!',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "danger"
        });
      } else if(this.props.noOfGuest === '0') {
        Toast.show({
          text: 'Number of guest would not be zero!',
          textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
          duration: 2000,
          buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
          buttonText: "Okay",
          type: "danger"
          });
        } else {
          if(this.props.connectionStatus==='Online'){
            let objReservation = {
              "ID": 0,
              "CUSTOMERID": parseInt(this.props.mobileNumber),
              "BOOKINGNAME": this.props.bookingName,
              "NOOFPERSONS": parseInt(this.props.noOfGuest),
              "BOOKINGDATETIME": this.props.dateTime.toString(),
              "STATUS": 0,
              "CREATEDBY": "string",
              "MODIFIEDBY": "string"
            };       
            
            this.props.dispatch({ type: SagaActions.SET_RESERVATION_DETAILS, objReservation });
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
    }
  }

  componentDidUpdate(prevProps, prevState){
    // this.props.dispatch({type: ReduxActions.SET_RES_STATE, isResOpen: true});
    if (this.props.isResModified){
      this.props.dispatch({type: ReduxActions.RESET_RESERVATION});
      const resetAction = NavigationActions.navigate({
        routeName: 'SearchReservation',
        type: 'PopPreviousScreen'
    });
      this.props.navigation.dispatch(resetAction);
      // const resetAction = NavigationActions.reset({
      //   index: 0,
      //   key: null,
      //   actions: [
      //   NavigationActions.navigate({routeName: "SearchReservation"})
      //   ]
      //   });
      //   this.props.navigation.dispatch(resetAction);
    }
    else {
      if (this.props.registeredSuccessfully){
        this.props.dispatch({type: ReduxActions.RESET_RESERVATION})
      const resetAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
        NavigationActions.navigate({routeName: "LaunchScreen"})
        ]
        });
        this.props.navigation.dispatch(resetAction);
      }
    }
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', padding: 20 }} onLayout={this.onLayout.bind(this)}>
        <View style={{
          flex: 1, flexDirection: 'column',
          height: 100 + '%', borderWidth: 0.5, borderColor: 'black'
        }}>
          <View style={{
            width: 100 + '%',flexDirection: 'row', backgroundColor: defaultColor, zIndex: 6,
            justifyContent: 'flex-start', alignItems: 'center', height: 70
            }}>
            <TouchableOpacity style={{width: 20 + '%', height: 70, justifyContent: 'flex-start', padding: this.getFontSize(15)}}
            onPress={this.backBtn.bind(this)}
            >
              <Icon2 name="arrow-back" style={{fontSize: this.getFontSize(40), color: 'white'}}/>
            </TouchableOpacity>
            <View style={{width: 60 + '%', height: 70, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{ fontSize: this.getFontSize(40), color: 'white', fontWeight: 'bold' }}>
                Reservation
              </Text>
            </View>
            <View style={{width: 20 + '%',height: 70,}}></View>            
          </View>
          <View style={{
            width: 100 + '%', backgroundColor: '#F8FAFC', height: 100 + '%',
            padding: 10, flexDirection: 'row', zIndex: 2, opacity: 0.8
          }}>
            <ScrollView style={{ height: 500, flex: 1 }}>
              <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: "row", justifyContent: "flex-start", marginBottom: 10 }}>
                <Card style={{
                  width: 98 + '%', backgroundColor: 'white', height: 65, margin: 10,
                  borderWidth: 0.3, flexDirection: 'column', padding: 10,opacity: 1, zIndex: 5
                  }}>
                  <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 95 + '%', justifyContent: 'center',  height: 41 }}>
                      <TouchableOpacity itemColor={defaultColor}  placeholder='Search'
                        style={{
                          height: 40, borderColor: 'black', borderRadius: 30,borderWidth: 0.5, backgroundColor: '#fff',
                          opacity: 1, fontSize: 25, paddingBottom: 5,  paddingLeft: 10
                        }} underlineColorAndroid='transparent' onPress={this.searchCall.bind(this)} 
                      >
                        <Icon name="search" style={{position: 'absolute',
                         alignSelf: 'flex-end', justifyContent: 'center', fontSize: 35,  paddingRight:15}}></Icon>
                        <Text style={{
                          height: 40,  backgroundColor: '#fff', borderRadius: 30,
                          opacity: 1, fontSize: 25, paddingBottom: 5, marginLeft: 10, marginRight: 10
                        }}> Search
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card>
              </View>
              <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: "row", justifyContent: "flex-start" }}>
                <Card style={{
                  width: 98 + '%', backgroundColor: 'white', height: 100 + '%', margin: 10,
                  borderWidth: 0.3, flexDirection: 'column', padding: 10,opacity: 1, zIndex: 5
                }}>
                  <View style={{ flexDirection: 'row', marginBottom: 10 }}>                  
                    <View style={{ width: 40 + '%', justifyContent: 'flex-start', marginLeft: 2 + '%' }}>
                      <Text style={{ color: 'black', fontSize: 25 }}>Mobile Number</Text>
                    </View>
                    <View style={{ width: 50 + '%', justifyContent: 'flex-start', borderWidth: 0.5, height: 41 }}>   
                      <TextInput itemColor={defaultColor} keyboardType="numeric" value={this.props.mobileNumber.toString()}
                        style={{
                          height: 40, borderColor: 'black', borderWidth: 0.5, backgroundColor: '#fff',
                          opacity: 1, fontSize: 25, paddingBottom: 5
                        }} underlineColorAndroid='transparent' onChangeText={(text)=>this.changeField(text,"Mobile")}
                        editable={this.props.resState == 'modify'?false:true}
                      />                      
                    </View>                    
                  </View>
                  <View style={{ flexDirection: 'row', marginBottom: 10 }}>                  
                    <View style={{ width: 40 + '%', justifyContent: 'flex-start', marginLeft: 2 + '%' }}>
                      <Text style={{ color: 'black', fontSize: 25 }}>Booking Name</Text>
                    </View>
                    <View style={{ width: 50 + '%', justifyContent: 'flex-start', borderWidth: 0.5, height: 41 }}>              
                      <TextInput itemColor={defaultColor} value={this.props.bookingName}
                        style={{
                          height: 40, borderColor: 'black', borderWidth: 0.5, backgroundColor: '#fff',
                          opacity: 1, fontSize: 25, paddingBottom: 5
                        }} 
                        editable={this.props.resState == 'modify'?false:true}
                        underlineColorAndroid='transparent' onChangeText={(text)=>this.changeField(text,"Name")} />   
                    </View>                    
                  </View>
                  <View style={{ flexDirection: 'row', marginBottom: 10 }}>                  
                    <View style={{ width: 40 + '%', justifyContent: 'flex-start', marginLeft: 2 + '%' }}>
                      <Text style={{ color: 'black', fontSize: 25 }}>No of Guest</Text>
                    </View>
                    <View style={{ width: 50 + '%', justifyContent: 'flex-start', borderWidth: 0.5, height: 41 }}>
                      <TextInput itemColor={defaultColor} keyboardType="numeric" value={this.props.noOfGuest.toString()}
                        style={{
                          height: 40, borderColor: 'black', borderWidth: 0.5, backgroundColor: '#fff',
                          opacity: 1, fontSize: 25, paddingBottom: 5
                        }} underlineColorAndroid='transparent' onChangeText={(text)=>this.changeField(text,"Guests")}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <View style={{ width: 40 + '%', justifyContent: 'flex-start', marginLeft: 2 + '%' }}>
                      <Text style={{ color: 'black', fontSize: 25 }}>Date &amp; Time</Text>
                    </View>
                    <View style={{ width: 50 + '%', justifyContent: 'flex-start', borderWidth: 0.5, height: 41 }}>
                      <TouchableOpacity itemColor={defaultColor} 
                      onPress={this._showDateTimePicker.bind(this)}
                        style={{
                          height: 40, borderColor: 'black', borderWidth: 0.5, backgroundColor: '#fff',
                          opacity: 1, fontSize: 25, paddingBottom: 5
                        }} >
                        <Text style={{ color: 'black', fontSize: 25 }}>{this.props.dateTime===''?this.props.dateTime.toString(): moment(this.props.dateTime).format('MMM DD YYYY h:mm A')}</Text>
                        <DateTimePicker mode={'datetime'}
                          minimumDate= {new Date()}
                          isVisible={this.props.isDateTimePickerVisible}
                          onConfirm={this._handleDatePicked}
                          onCancel={this._hideDateTimePicker}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ paddingStart: 42 + '%', justifyContent: 'flex-start',
                      alignItems: 'flex-start' }}>
                    {this.props.resState == 'new' && <TouchableOpacity style={{width: 86.2 + '%', height: 40, backgroundColor: defaultColor, 
                      color: '#fff', padding: 5, marginBottom: 10, borderRadius: 10 , justifyContent: 'center',
                      alignItems: 'center' }} onPress={this.afterSubmit.bind(this)}>
                      <Text style={{ color: 'white', fontSize: 25 }} >Submit</Text>
                    </TouchableOpacity>}
                    {this.props.resState == 'modify' && <TouchableOpacity style={{width: 86.2 + '%', height: 40, backgroundColor: defaultColor, 
                      color: '#fff', padding: 5, marginBottom: 10, borderRadius: 10 , justifyContent: 'center',
                      alignItems: 'center' }} 
                      onPress={this.afterModify.bind(this)}
                      >
                      <Text style={{ color: 'white', fontSize: 25 }} >Modify</Text>
                    </TouchableOpacity>}
                    {this.props.resState == 'delete' && <TouchableOpacity style={{width: 86.2 + '%', height: 40, backgroundColor: defaultColor, 
                      color: '#fff', padding: 5, marginBottom: 10, borderRadius: 10 , justifyContent: 'center',
                      alignItems: 'center' }} 
                      // onPress={this.afterDelete.bind(this)}
                      >
                      <Text style={{ color: 'white', fontSize: 25 }} >Delete</Text>
                    </TouchableOpacity>}
                  </View>
                </Card>
              </View>
              
            </ScrollView>
          </View>
          <Image source={require('../../Images/rest2.jpg')}
          style={{
            width: 100 + '%', height: 100 + '%',
            position: 'absolute',
            borderBottomWidth: 2,
            borderColor: 'black',
            backgroundColor: '#EEEEEE', zIndex: 1
          }}
        />
        </View>
      </View>
    )
  }
  searchCall() {
    if(this.props.connectionStatus==='Online'){
      this.props.dispatch({type:ReduxActions.SET_ACTIVITY_INDICATOR});   
      this.props.navigation.navigate('SearchReservation');
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
  }

  backBtn() {
    this.props.dispatch({type: ReduxActions.SET_RES_STATE, isResOpen: false});
    this.props.dispatch({type: ReduxActions.RESET_RESERVATION});
    if(this.props.resState == 'modify'){
      this.props.navigation.navigate('SearchReservation')}
    else {
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
      NavigationActions.navigate({routeName: "LaunchScreen"})
      ]
      });
      this.props.navigation.dispatch(resetAction);}
    // this.props.navigation.navigate('LaunchScreen');
  }
}

const mapStateToProps = (state) =>{
  return{
      mobileNumber: state.ReservationReducer.mobileNumber,
      bookingName: state.ReservationReducer.bookingName,
      noOfGuest: state.ReservationReducer.noOfGuest,
      dateTime: state.ReservationReducer.dateTime,
      isVerified:state.ReservationReducer.isResvfieldsVerified,
      isDateTimePickerVisible:state.ReservationReducer.isDateTimePickerVisible,
      registeredSuccessfully:state.ReservationReducer.registeredSuccessfully,
      resState: state.ReservationReducer.stateOfReservation,
      allReservations:state.ReservationReducer.allReservations,
      ResToModify: state.ReservationReducer.ResToModify,
      isResModified: state.ReservationReducer.isResModified,
      isResOpen: state.navReducer.isResOpen,
      height: state.DashBoardReducer.height,
      width: state.DashBoardReducer.width,
      connectionStatus: state.loginReducer.connectionStatus

  };
}

export default connect(mapStateToProps, null)(Reservation)
