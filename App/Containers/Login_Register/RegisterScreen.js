import React, { Component } from 'react';
import SagaActions from "../../Sagas/ActionTypes/Action";
import ReduxActions from "../../Redux/ActionTypes/Action";
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { View, Container, Content } from "native-base";
import TextBoxMaterial from "../../Components/TextboxMaterial";
import { connect } from 'react-redux';
import * as Keychain from 'react-native-keychain';
import comStyles from '../Styles/CommonStyles';
import sha256 from 'crypto-js/sha256';
import hmacSHA512  from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64'
import {defaultColor} from '../Styles/CommonStyles';

class RegisterScreen extends Component{
    constructor(){
        super()
    }
    changeCaptainId(input){
        if(this.props.captainDetails.MOBILENO.length === 10 && /^[0-9]{1,10}$/.test(this.props.captainDetails.MOBILENO)){
            this.props.dispatch({type: ReduxActions.SET_COLOR_ID, color: "#039be5"})  
        }
        let tempObj=Object.assign({},this.props.captainDetails);
        tempObj.MOBILENO=input;
        this.props.dispatch({type: ReduxActions.SET_LOGIN_ID, tempObj: tempObj})
    }
    changeName(input){
        let tempObj=Object.assign({},this.props.captainDetails);
        tempObj.USERNAME=input;
        this.props.dispatch({type: ReduxActions.SET_LOGIN_ID, tempObj: tempObj})
    }
    setUIDPass = async (username,password)=>{
        try {
            await Keychain.setGenericPassword(username, password);
        } catch (error) {
        }
    }
    registerCaptain(){ 
        try{
            if(this.props.captainDetails.MOBILENO.length === 10 && /^[0-9]{1,10}$/.test(this.props.captainDetails.MOBILENO)){
                if(this.props.captainDetails.USERNAME.length>0 && /^[A-Za-z0-9 ]+$/.test(this.props.captainDetails.USERNAME)){
                    if(this.props.captainDetails.PASSWORD.length>=8){
                        if(this.props.confPass===this.props.captainDetails.PASSWORD){
                            let loginId=Object.assign({},this.props.captainDetails)
                            loginId.PASSWORD=Base64.stringify(hmacSHA512(sha256(loginId.PASSWORD), "venom"));
                            this.props.dispatch({type:SagaActions.CREATE_CAPTAIN, loginId});
                            this.props.dispatch({type: ReduxActions.SET_REGISTER_PRESSED});
                        }else{
                            Alert.alert('Invalid', 'Passwords do not match.',
                            [{ text: 'Ok', onPress: ()=>{}, style: 'cancel' }],
                            { cancelable: true });
                            this.props.dispatch({type:ReduxActions.SET_COLOR_CONFPASS, isCorrect: false})}
                    }else{
                        Alert.alert('Invalid', 'Password should be at least 8 characters long.',
                        [{ text: 'Ok', onPress: ()=>{}, style: 'cancel' }],
                        { cancelable: true });
                        this.props.dispatch({type:ReduxActions.SET_COLOR_PASS, isCorrect: false})}
                }else{
                    Alert.alert('Invalid', 'Please check the user name you entered.',
                    [{ text: 'Ok', onPress: ()=>{}, style: 'cancel' }],
                    { cancelable: true });
                    this.props.dispatch({type:ReduxActions.SET_COLOR_NAME, isCorrect: false})}
            }else{
                Alert.alert('Invalid', 'Please check the mobile number you entered.',
                [{ text: 'Ok', onPress: ()=>{}, style: 'cancel' }],
                { cancelable: true });
                this.props.dispatch({type:ReduxActions.SET_COLOR_ID, isCorrect: false})}
                if(this.props.adminPassword === '' && this.props.userID==='')
                {
                    let user = " ".concat('#', this.props.ip.concat(':', this.props.port));
                    this.setUIDPass(user," ");    
                }
                else{
                    let user = this.props.userID.concat('#', this.props.ip.concat(':', this.props.port));
                    this.setUIDPass(user,this.props.adminPassword); 
                }    
        }
        catch(err){
            this.props.dispatch({type:ReduxActions.FAILED_TO_REGISTER});
        }
    }
    changePassword(input){

        let tempObj=Object.assign({},this.props.captainDetails);
        tempObj.PASSWORD=input;
        this.props.dispatch({type: ReduxActions.SET_LOGIN_ID, tempObj: tempObj})
    }
    changeConfirmPassword(input){
        this.props.dispatch({type:ReduxActions.SET_CONFIRM_PASS, input: input })
    }
    
    render(){
        if(this.props.captainDetails.MOBILENO.length === 10 && /^[0-9]{1,10}$/.test(this.props.captainDetails.MOBILENO)){
            captainIdColor="#039be5";
        }
        else if(this.props.captainDetails.MOBILENO.length ===0){
            captainIdColor="#039be5";
        }
        else{
            captainIdColor='#D50000';
        }
        if(this.props.captainDetails.PASSWORD.length===0 || this.props.captainDetails.PASSWORD.length>=8){
            passColor="#039be5";
        }
        else{
            passColor="#D50000";
        }
        if (this.props.confPass.length===0 || this.props.captainDetails.PASSWORD===this.props.confPass){
            confPassColor="#039be5";
        }
        else{
            confPassColor="#D50000";
        }
        return(
            <Container>
            {this.props.isRegisterPressed && <View style={[comStyles.rowContainer, comStyles.horizontal]}>
                    <ActivityIndicator size="large" color="red" /></View>}
            {!this.props.isRegisterPressed && <Content style={{ marginLeft: 2 + '%', marginRight: 2 + '%' }}>    
            
                <TextBoxMaterial tintColor={captainIdColor} baseColor={this.props.captainIdValid?"#039be5":"#D50000"} keyboardTextType="numeric"  value= {this.props.captainDetails.MOBILENO} changeField = {this.changeCaptainId.bind(this)} placeholder='Mobile Number'/>
               
                <TextBoxMaterial tintColor={"#039be5"} baseColor={this.props.nameValid?"#039be5":"#D50000"}keyboardTextType="default" value= {this.props.captainDetails.USERNAME} changeField = {this.changeName.bind(this)} placeholder='Name'/>
                
                
                <TextBoxMaterial tintColor={this.props.passValid?passColor:"#D50000"} baseColor={this.props.passValid?passColor:"#D50000"} value= {this.props.captainDetails.PASSWORD} changeField = {this.changePassword.bind(this)} placeholder='Password (Min. 8 characters)' secureTextEntry={true}/>
                
                <TextBoxMaterial tintColor={this.props.confPassValid?confPassColor:"#D50000"} baseColor={this.props.confPassValid?confPassColor:"#D50000"} value= {this.props.captainDetails} changeField = {this.changeConfirmPassword.bind(this)} placeholder='Confirm Password' secureTextEntry={true}/>
                <TouchableOpacity style={styles.buttonContainer}
                onPress={this.registerCaptain.bind(this)}>
                <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                </Content>}
            {/* </KeyboardAvoidingView> */}
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

const mapStateToProps = (state) =>{
    return{
        captainDetails: state.loginReducer.captainDetails,
        confPass:state.loginReducer.confPass,
        captainIdValid:state.loginReducer.captainIdValid,
        nameValid:state.loginReducer.nameValid,
        passValid:state.loginReducer.passValid,
        confPassValid:state.loginReducer.confPassValid,
        isRegisterPressed: state.loginReducer.isRegisterPressed,
        ip: state.loginReducer.ip,
        port: state.loginReducer.port,
        userID: state.DashBoardReducer.userID,
        adminPassword: state.DashBoardReducer.adminPassword,        
    };
}

export default connect(mapStateToProps, null)(RegisterScreen)