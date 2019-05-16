import React, { Component } from 'react';
import { Container,Header, Tab, Tabs, TabHeading } from 'native-base';
import {View,Text,StyleSheet, NetInfo,TouchableOpacity} from 'react-native';
import LoginPageComponent from './LoginTab';
import RegisterScreen from './RegisterScreen';
import ReduxActions from "../../Redux/ActionTypes/Action";
import { connect } from 'react-redux';
import {defaultColor} from '../Styles/CommonStyles';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';

class LoginRegisterTab extends React.Component {
    componentDidMount() { 
      NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectivityChange);     
      NetInfo.isConnected.fetch().done((isConnected) => {   
        if(isConnected == true)
        {
          this.props.dispatch({ type: ReduxActions.SET_CONNECTION_STATUS, connectionStatus: "Online" });
        }
        else
        {
          this.props.dispatch({ type: ReduxActions.SET_CONNECTION_STATUS, connectionStatus: "Offline" });
        }   
      });
    }
    
    _handleConnectivityChange = (isConnected) => {
      if(isConnected == true)
        {
          this.props.dispatch({ type: ReduxActions.SET_CONNECTION_STATUS, connectionStatus: "Online" });
        }
        else
        {
          this.props.dispatch({ type: ReduxActions.SET_CONNECTION_STATUS, connectionStatus: "Offline" });
        }
    };

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

    callAppsettingsModal(){
      const resetAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
        NavigationActions.navigate({routeName: "SettingStack"})
        ]
        });
        this.props.navigation.dispatch(resetAction);
    }  

  render() {
    return (
      <Container>
         
         <Header style={{width: 100+ '%', flexDirection: 'row', backgroundColor: defaultColor, justifyContent: 'flex-end'}} hasTabs>
           <TouchableOpacity 
                    style={{ width:  10 + '%', height:  this.getFontSize(45), justifyContent: 'center', alignContent: 'center',alignItems: 'center', alignSelf: 'center'}} onPress={this.callAppsettingsModal.bind(this)}>
                      <Icon1 name="gears" style={{ fontSize: 25, color: "#fff" }}></Icon1>   
          </TouchableOpacity>
        </Header>  
        {this.props.connectionStatus === "Online" &&      
        <Tabs>
        
          <Tab heading={ <TabHeading style={{backgroundColor: defaultColor}}><Text style={{fontSize: 20, color: '#fff'}}>Login</Text></TabHeading>}>
            <LoginPageComponent navigation={this.props.navigation}/>
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor: defaultColor}}><Text style={{fontSize: 20, color: '#fff'}}>Register</Text></TabHeading>}>
            <RegisterScreen />
    </Tab>          
        </Tabs>
        }
        {this.props.connectionStatus === "Offline" && <View  style={styles.offlineContainer}>
        <Text style={styles.offlineText}>No Internet Connection Available</Text>
        </View>}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
      backgroundColor: '#b52424',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
      },
      onlineContainer: {
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row'
          },
      offlineText: { fontSize:30,color: '#fff' }});

const mapStateToProps = (state) => {
  return {
    connectionStatus: state.loginReducer.connectionStatus,
    height: state.DashBoardReducer.height,
    width: state.DashBoardReducer.width
  }
}

export default connect(mapStateToProps, null)(LoginRegisterTab)