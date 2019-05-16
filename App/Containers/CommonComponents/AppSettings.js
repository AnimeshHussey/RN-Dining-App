import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextBoxMaterial from "../../Components/TextBox";
import { connect } from "react-redux";
import { Content } from 'native-base';
import ReduxActions from "../../Redux/ActionTypes/Action";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationActions } from 'react-navigation';
import { Toast } from 'native-base';
import { TouchableOpacity } from 'react-native'
import {globalUrl} from '../../Services/HRPLApi';
import { defaultColor,supportingColor } from '../Styles/CommonStyles';

class AppSettingsComponent extends React.Component {

    changeField(changedText, type) {
        if (type === "ip") {
            this.props.dispatch({ type: ReduxActions.SET_IP_ADDRESS, ip: changedText });
        }
        else if (type === "port") {
            this.props.dispatch({ type: ReduxActions.SET_PORT, port: changedText });
        }
    }

    onButtonPress() {
        if (this.props.ip && this.props.port) {
            let regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            if (regex.test(this.props.ip)) {                
                globalUrl(this.props.ip,this.props.port);
                Toast.show({
                    text: 'IP Address & Port saved successfully',
                    textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
                    duration: 2000,
                    buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
                    buttonText: "Okay",
                    type: "success"
                });
                const resetAction = NavigationActions.reset({
                    index: 0,
                    key: null,
                    actions: [
                    NavigationActions.navigate({routeName: "LoginScreen"})
                    ]
                });
                this.props.navigation.dispatch(resetAction);
            }
            else {
                Toast.show({
                    text: 'Please provide valid ip address!',
                    textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
                    duration: 2000,
                    buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
                    buttonText: "Okay",
                    type: "danger"
                });
            }
        }
        else {
            Toast.show({
                text: 'IP and/or Port cannot be empty.',
                textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
                duration: 2000,
                buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
                buttonText: "Okay",
                type: "danger"
            });
        }
    }

    render() {
        return (
            <View style={{flex:1, flexDirection: 'column',justifyContent: 'center',alignItems: 'center',backgroundColor: '#fff', padding: 10+ '%'}}>
            <Content style={{flex:1, flexDirection: 'column',width: 100 + '%', height: 30 + '%', marginLeft: 2 + '%', borderWidth: 1,borderColor: 'black',padding: 2+ '%' }}>
            <KeyboardAwareScrollView>
                        <TextBoxMaterial
                            tintColor={defaultColor}
                            label="IP Address"
                            value={this.props.ip}
                            changeField={this.changeField.bind(this)}
                            type="ip" />
                    </KeyboardAwareScrollView>
                    <KeyboardAwareScrollView>
                        <TextBoxMaterial tintColor={defaultColor}
                            label="Port"
                            value={this.props.port}
                            changeField={this.changeField.bind(this)}
                            type="port" />
                    </KeyboardAwareScrollView>
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row',width: 80 + '%',height:50,margin: 10, borderRadius: 50, justifyContent: 'center', backgroundColor: defaultColor, alignContent: 'center', alignItems: 'center', alignSelf: 'center' }} onPress={this.onButtonPress.bind(this)}>
                        <Icon active name="content-save-all" size={24} color="#fff" />
                        <Text style={{color: '#fff', fontSize: 20}}>Save</Text>
                    </TouchableOpacity>
                </Content>
            </View>
        )
    }
}

const stylesDrawer = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Avenir-Black',
        color: 'white'
    }
})

const mapStateToProps = (state) => {

    return {
        ip: state.loginReducer.ip,
        port: state.loginReducer.port
        // rememberMyIP: state.loginReducer.rememberMyIP
    }
}

export default connect(mapStateToProps, null)(AppSettingsComponent)