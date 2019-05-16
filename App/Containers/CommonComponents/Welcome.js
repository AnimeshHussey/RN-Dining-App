import React, { Component } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import ReduxActions from "../../Redux/ActionTypes/Action";
import { connect } from 'react-redux';
import {defaultColor, supportingColor} from '../Styles/CommonStyles';
import * as Keychain from 'react-native-keychain';
import {NavigationActions } from 'react-navigation';
import {globalUrl} from '../../Services/HRPLApi';

class WelcomeHRPL extends Component {
  getUIDPass=async () => {
    try {
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

  componentWillMount(){
    this.getUIDPass();
  }

  render() {
    this.timerID = setTimeout(
      () => this.findIPStatus(),
      2000
    );
    const {width, height} = Dimensions.get('window');
    return (
      <View style={{ flex: 1, flexDirection: 'column', height: 100 + '%', width: 100 + '%',
      backgroundColor: supportingColor
      }}>
        <View style={{
          flex: 1, flexDirection: 'row', marginTop: width> height? 10 + '%':45 + '%',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
          <Image source={require('../../Images/rest0.png')}
            style={{
              width: width/2, height:width/4, 
              position: 'absolute',
              // borderBottomWidth: 2,
              borderColor: defaultColor,
              backgroundColor: supportingColor
            }}
          />
        </View>
        <View style={{
          flex: 1, flexDirection: 'row', justifyContent: 'center',
          alignContent: 'center', marginTop: width> height? 15 + '%':10 + '%',
        }}>
          <Text style={{ fontSize: width> height?25:15, color: '#232020', fontWeight: 'bold',
           fontFamily: 'GujaratiSangamMN-Bold' }}>Welcome to HRPL</Text>
        </View>
      </View>
    );
   
   }
   findIPStatus() {
        if(this.props.ip && this.props.port){
        globalUrl(this.props.ip,this.props.port);
        const resetAction = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
          NavigationActions.navigate({routeName: "LoginScreen"})
          ]
          });
          this.props.navigation.dispatch(resetAction);
        }
        else{
          const resetAction = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
            NavigationActions.navigate({routeName: "SettingStack"})
            ]
            });
            this.props.navigation.dispatch(resetAction);
        }
   }
}


const mapStateToProps = (state) => {
  return {
      ip: state.loginReducer.ip,
      port: state.loginReducer.port
  };
}

export default connect(mapStateToProps, null)(WelcomeHRPL)