import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, Dimensions } from 'react-native'
import {Toast } from 'native-base';
import {defaultColor, supportingColor} from '../Styles/CommonStyles'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import ReduxActions from "../../Redux/ActionTypes/Action";
import { connect } from 'react-redux';
import {NavigationActions } from 'react-navigation';
import SagaActions from "../../Sagas/ActionTypes/Action";
import * as Keychain from 'react-native-keychain';

 class LaunchScreen extends Component {
  componentWillMount(){
    // if(this.props.itemList.length===0)
    // {
    // this.props.dispatch({type: SagaActions.GET_MENU_ITEMS}); 
    // }
    if(this.props.remarksList.length===0)
    {
    this.props.dispatch({ type: SagaActions.GET_REMARKS }); 
    }
    if(this.props.totalSection.length===0){
      this.props.dispatch({ type: SagaActions.GET_TOTAL_FLOORS });
    }
  }
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
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', padding: this.getFontSize(20) }} onLayout={this.onLayout.bind(this)}>
        <View style={{ flex: 1, flexDirection: 'column',
         height: 100 + '%', borderWidth: 0.5, borderColor: 'black' }}>
          <View style={{
            width: 100 + '%', flexDirection: 'row', backgroundColor:defaultColor,
            justifyContent: 'center', alignItems: 'center', height: 10 + '%'
          }}>
            <View style={{width: 30 + '%', flexDirection: 'row', paddingLeft: 1 + '%'}}>
            <Icon name="user-circle-o" style={{fontSize: this.getFontSize(30), color: '#fff'}}/>
            <Text>{'  '}</Text>
              <Text style={{ fontSize: this.getFontSize(20), color: 'white', fontWeight: 'bold' }}>
                {this.props.loggedInUser.loggedInUserName}
              </Text>
            </View>
            <View style={{width: 40 + '%', flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{ fontSize: this.getFontSize(40), color: 'white', fontWeight: 'bold' }}>
                Dashboard
              </Text>
            </View>
            <TouchableOpacity onPress={this.Logout.bind(this)} style={{width: 30 + '%', flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 1 + '%'}}>
              <Text style={{ fontSize: this.getFontSize(20), color: 'white', fontWeight: 'bold' }}>
                Logout
              </Text>
              <Text>{'  '}</Text>
              <Icon1 name="logout" style={{fontSize: this.getFontSize(30), color: '#fff'}}/>
            </TouchableOpacity>
          </View>
          <View style={{
            width: 100 + '%', backgroundColor: '#F8FAFC', height: 90 + '%',
            padding: this.getFontSize(30), flexDirection: 'row'
          }}>
            <ScrollView>
              <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: "row", justifyContent: "space-evenly" }}>
                <TouchableOpacity style={{
                  // width: this.props.width< this.props.height?850: this.getFontSize(400), backgroundColor: 'white', height: this.getFontSize(250), margin: 10,
                  //  width: this.props.width< this.props.height?850: this.getFontSize(400),
                  backgroundColor: 'white',
                  //  height: this.getFontSize(250),
                  height: Math.min(this.props.width, this.props.height) / 3,
                  width: this.props.width< this.props.height?Math.max(this.props.width, this.props.height)* 0.9: Math.max(this.props.width, this.props.height)  * 0.4,
                  margin: 10,
                  borderWidth: 0.3, flexDirection: 'column'
                }} onPress={(event) =>this.callNavScreen()}>
               
                  <View style={{ width: 100 + '%', height: this.getFontSize(150), backgroundColor: 'grey' }}>
                  </View>
                  <View style={{
                    width: 100 + '%', height: this.getFontSize(100), opacity: 0.7,
                    justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', zIndex: 2
                  }}>
                    <Text style={{ fontSize: this.getFontSize(40), color: 'black' }}>
                      Order
                </Text>
                  </View>
                  <Image source={require('../../Images/rest2.jpg')}
                  style={{
                    // width:  this.props.width< this.props.height? 850: this.getFontSize(400), 
                    // height: this.getFontSize(250), 
                    height: Math.min(this.props.width, this.props.height) / 3,
                    width: this.props.width< this.props.height?Math.max(this.props.width, this.props.height)* 0.9: Math.max(this.props.width, this.props.height)  * 0.4,
                    position: 'absolute',
                    borderBottomWidth: 2,
                    borderColor: 'black',
                    backgroundColor: '#EEEEEE', zIndex: 1
                  }}
                />  
                </TouchableOpacity>
                <TouchableOpacity style={{
                  //  width: this.props.width< this.props.height?850: this.getFontSize(400),
                  backgroundColor: 'white',
                  //  height: this.getFontSize(250),
                  height: Math.min(this.props.width, this.props.height) / 3,
                  width: this.props.width< this.props.height?Math.max(this.props.width, this.props.height)* 0.9: Math.max(this.props.width, this.props.height) * 0.4,
                  margin: 10,
                  borderWidth: 0.3, flexDirection: 'column'
                }} onPress={(event) =>this.callTableScreen()}>
               
                  <View style={{ width: 100 + '%', height: this.getFontSize(150), backgroundColor: 'grey' }}>
                  </View>
                  <View style={{
                    width: 100 + '%', height: this.getFontSize(100), opacity: 0.7,
                    justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', zIndex: 2
                  }}>
                    <Text style={{ fontSize: this.getFontSize(40), color: 'black' }}>
                      Reservation
                </Text>
                  </View>
                  <Image source={require('../../Images/rest3.jpg')}
                  style={{
                    // width: this.props.width< this.props.height?850: this.getFontSize(400),
                    // height: this.getFontSize(250), 
                    height: Math.min(this.props.width, this.props.height) / 3,
                    width: this.props.width< this.props.height?Math.max(this.props.width, this.props.height)* 0.9: Math.max(this.props.width, this.props.height) * 0.4,
                    position: 'absolute',
                    borderBottomWidth: 2,
                    borderColor: 'black',
                    backgroundColor: '#EEEEEE', zIndex: 1
                  }}
                />  
                </TouchableOpacity>
                <TouchableOpacity style={{
                  // width:  this.props.width< this.props.height?850: this.getFontSize(400),
                  backgroundColor: 'white',
                  height: Math.min(this.props.width, this.props.height) / 3,
                  width: Math.max(this.props.width, this.props.height)* 0.84,
                  // height: this.getFontSize(250),
                  margin: 10,
                  borderWidth: 0.3, flexDirection: 'column'
                }} onPress={(event) =>this.callFeedbackScreen()}>
               
                  <View style={{ width: 100 + '%', height: this.getFontSize(150), backgroundColor: 'grey' }}>
                  </View>
                  <View style={{
                    width: 100 + '%', height: this.getFontSize(100), opacity: 0.7,
                    justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', zIndex: 2
                  }}>
                    <Text style={{ fontSize: this.getFontSize(40), color: 'black' }}>
                      Feedback
                </Text>
                  </View>
                  <Image source={require('../../Images/rest4.jpg')}
                  style={{
                    height: Math.min(this.props.width, this.props.height) / 3,
                    width: Math.max(this.props.width, this.props.height)* 0.84,
                    position: 'absolute',
                    borderBottomWidth: 2,
                    borderColor: 'black',
                    backgroundColor: '#EEEEEE', zIndex: 1
                  }}
                />  
                </TouchableOpacity>
                {/* <TouchableOpacity style={{
                  width:  this.props.width< this.props.height?850: this.getFontSize(400), backgroundColor: 'white', height: this.getFontSize(250), margin: 10,
                  borderWidth: 0.3, flexDirection: 'column'
                }} onPress={(event) =>this.callSettingScreen()}>
               
                  <View style={{ width: 100 + '%', height: this.getFontSize(150), backgroundColor: 'grey' }}>
                  </View>
                  <View style={{
                    width: 100 + '%', height: this.getFontSize(100), opacity: 0.7,
                    justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', zIndex: 2
                  }}>
                    <Text style={{ fontSize: this.getFontSize(40), color: 'black' }}>
                      Settings
                </Text>
                  </View>
                  <Image source={require('../Images/rest5.jpg')}
                  style={{
                    width:  this.props.width< this.props.height?850: this.getFontSize(400), height: this.getFontSize(250), 
                    position: 'absolute',
                    borderBottomWidth: 2,
                    borderColor: 'black',
                    backgroundColor: '#EEEEEE', zIndex: 1
                  }}
                />  
                </TouchableOpacity> */}
                {/* <TouchableOpacity style={{
                  width: 400, backgroundColor: 'white', height: 250, margin: 10,
                  borderWidth: 0.3, flexDirection: 'column'
                }} onPress={(event) =>this.callSampleScreen()}>
               
                  <View style={{ width: 100 + '%', height: 150, backgroundColor: 'grey' }}>
                  </View>
                  <View style={{
                    width: 100 + '%', height: 100, opacity: 0.7,
                    justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', zIndex: 2
                  }}>
                    <Text style={{ fontSize: 40, color: 'black' }}>
                      Settings
                </Text>
                  </View>
                  <Image source={require('../Images/rest4.jpg')}
                  style={{
                    width: 400, height: 250, 
                    position: 'absolute',
                    borderBottomWidth: 2,
                    borderColor: 'black',
                    backgroundColor: '#EEEEEE', zIndex: 1
                  }}
                />  
                </TouchableOpacity> */}
              </View>
            </ScrollView>
          </View>

        </View>
      </View>
    )
  }

  getUIDPass=async () => {
    try {
      // Retreive the credentials
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        if(credentials.password !== " ") {        
        this.props.dispatch({ type: ReduxActions.SETADMIN_PASSWORD, adminPassword: credentials.password });
        this.props.dispatch({ type: ReduxActions.SETADMIN_USERID, userID: credentials.username.split("#")[0] });
        this.props.dispatch({type:ReduxActions.SET_REMEMBER_ME,isChecked:true});
        }
        this.props.dispatch({ type: ReduxActions.SET_IP_ADDRESS, ip: credentials.username.split("#")[1].split(":")[0] });
        this.props.dispatch({ type: ReduxActions.SET_PORT, port: credentials.username.split("#")[1].split(":")[1] });        
      } else {
        this.props.dispatch({type:ReduxActions.SET_REMEMBER_ME,isChecked:false});
      }
    } catch (error) {
      
    }
  }

  Logout(){
    if(this.props.connectionStatus==='Online'){
      this.getUIDPass();
      this.props.dispatch({type:ReduxActions.RESET_LOGIN_REDUCER});
      this.props.dispatch({type:ReduxActions.RESET_DASHBOARD_REDUCER});
      const resetAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
        NavigationActions.navigate({routeName: "LoginScreen"})
        ]
        });
        this.props.navigation.dispatch(resetAction);
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


  callNavScreen() {
    if(this.props.connectionStatus==='Online'){
      const resetAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
        NavigationActions.navigate({routeName: "TableStack"})
        ]
        });
        this.props.navigation.dispatch(resetAction);
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
  callTableScreen() {
    if(this.props.connectionStatus==='Online'){
      this.props.navigation.navigate('ReservationStack');
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
  callFeedbackScreen() {
    if(this.props.connectionStatus==='Online'){
      this.props.navigation.navigate('FeedBackStack');
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
  callSettingScreen() {
    this.props.navigation.navigate('SettingStack');
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser:state.loginReducer.captainloginDetils,
    itemList:state.menuReducer.itemList,
    remarksList:state.menuReducer.remarksList,
    feedbackQuestions: state.FeedbackReducer.FeedbackQuestions,
    height: state.DashBoardReducer.height,
    width: state.DashBoardReducer.width,
    connectionStatus: state.loginReducer.connectionStatus,
    totalSection: state.floorReducer.totalSection
  }
}
export default connect(mapStateToProps, null)(LaunchScreen)