import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Styles from '../Styles/LaunchScreenStyles';
import { Container, Content } from "native-base";
import TextBoxMaterial from "../../Components/TextBox";
import ReduxActions from "../../Redux/ActionTypes/Action";
import SagaActions from "../../Sagas/ActionTypes/Action";
import comStyles from '../Styles/CommonStyles';
import sha256 from 'crypto-js/sha256';
import hmacSHA512  from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import {Toast } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {defaultColor} from '../Styles/CommonStyles';
import * as Keychain from 'react-native-keychain';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions } from 'react-navigation';

class LoginPageComponent extends Component {
   
    changeField(changedText, type) {
        if (type === "userid") {
            this.props.dispatch({ type: ReduxActions.SETADMIN_USERID, userID: changedText });
        }
        else if (type === "password") {
            this.props.dispatch({ type: ReduxActions.SETADMIN_PASSWORD, adminPassword: changedText });
        }
    }
    setUIDPass = async (username,password)=>{
        try {
            await Keychain.setGenericPassword(username, password);
        } catch (error) {
        }
    }
    ResetUIDPass= async ()=>{
        await Keychain.resetGenericPassword();
    }
    onButtonPress() {
        if(this.props.userID.split("#")[0] && this.props.adminPassword)
        {
            if(this.props.adminPassword.length> 7){
            this.props.dispatch({type: ReduxActions.SET_LOGIN_PROGRESSBAR}) 
            let LoginDetails=   {
                    "MobileNo": this.props.userID.split("#")[0],
                    "password": Base64.stringify(hmacSHA512(sha256(this.props.adminPassword), "venom"))
                }
            this.props.dispatch({type:SagaActions.LOGIN_CAPTAIN,loginDetails:LoginDetails});
            } else {
                Toast.show({
                    text: 'Password must be at least 8 characters.',
                    textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
                    duration: 2000,
                    buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
                    buttonText: "Okay",
                    type: "danger"
                });
            }
        }
        else{
            Toast.show({
                text: 'Username and/or password cannot be empty.',
                textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
                duration: 2000,
                buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
                buttonText: "Okay",
                type: "danger"
            });
        }
    }
    componentDidUpdate(){
        if (this.props.loginSuccessfully){
            if(this.props.rememberMe){
                let user = this.props.userID.concat('#', this.props.ip.concat(':', this.props.port));
                this.setUIDPass(user,this.props.adminPassword); 
            }
            else{
                let user = " ".concat('#', this.props.ip.concat(':', this.props.port));
                this.setUIDPass(user," "); 
            }
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
    onRememberMeClick(){
        if(this.props.rememberMe)
        this.props.dispatch({type:ReduxActions.SET_REMEMBER_ME,isChecked:false})
        else
        this.props.dispatch({type:ReduxActions.SET_REMEMBER_ME,isChecked:true})
    }

    
    
    render() {
        return (
            <Container>
                <View style={Styles.mainContainer}>
                {this.props.isLoginPressed && <View style={[comStyles.rowContainer, comStyles.horizontal]}>
                    <ActivityIndicator size="large" color="red" /></View>}
                    {!this.props.isLoginPressed && <Content style={{ marginLeft: 2 + '%', marginRight: 2 + '%' }}>
                    
                    <KeyboardAwareScrollView>
                        <TextBoxMaterial tintColor="#039be5"
                            label="Phone Number"
                            value={this.props.userID.split("#")[0]}
                            changeField={this.changeField.bind(this)}
                            type="userid"
                            keyboardTextType="numeric" />                            
                            </KeyboardAwareScrollView>
                             <KeyboardAwareScrollView>
                        <TextBoxMaterial tintColor="#039be5"
                            label="Password"
                            value={this.props.adminPassword}
                            changeField={this.changeField.bind(this)}
                            type="password" 
                            secureTextEntry={true}/></KeyboardAwareScrollView>
                        <TouchableOpacity style={{width: 100 + '%',flexDirection: 'row', justifyContent:'center',padding:10, margin:10}} onPress={()=>this.onRememberMeClick()}>
                            {/* <View style={{justifyContent:'space-around', alignItems:'center'}}> */}
                                {!this.props.rememberMe && <Icon name="checkbox-blank-outline" style={{fontSize: 25,color: 'black'}}/>}
                                {this.props.rememberMe && <Icon name="checkbox-marked"  style={{fontSize: 25,color: 'green'}}/>}
                                <Text style={{fontSize:20, color: 'black', fontFamily: "Avenir"}}>Remember me</Text>
                            {/* </View> */}
                         </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={()=>this.onButtonPress()}>
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity> 
                    </Content>}
                </View>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer: {
        backgroundColor: defaultColor,
        paddingVertical: 15
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
})
const mapStateToProps = (state) => {
    return {
        userID: state.DashBoardReducer.userID,
        adminPassword: state.DashBoardReducer.adminPassword,
        loginSuccessfully: state.loginReducer.loginSuccessfully,
        isLoginPressed: state.loginReducer.isLoginPressed,
        rememberMe: state.loginReducer.rememberMe,
        ip: state.loginReducer.ip,
        port: state.loginReducer.port,
    };
}

export default connect(mapStateToProps, null)(LoginPageComponent)