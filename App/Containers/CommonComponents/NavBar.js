import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, TextInput, Alert, Dimensions } from 'react-native'
import { Toast, Card } from 'native-base';
import ReduxActions from "../../Redux/ActionTypes/Action";
import SagaActions from "../../Sagas/ActionTypes/Action";
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { defaultColor, supportingColor } from '../Styles/CommonStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import __ from "lodash";

class NavBar extends Component {
    onLayout(e) {
        const { width, height } = Dimensions.get('window');
        this.props.dispatch({ type: ReduxActions.SCREEN_WIDTH, width: width });
        this.props.dispatch({ type: ReduxActions.SCREEN_HEIGHT, height: height });
    }
    getFontSize(size) {
        if ((this.props.height > 800 && this.props.width > 1200) || (this.props.width > 800 && this.props.height > 1200)) {
            if (this.props.width < this.props.height) {
                return (this.props.height / this.props.width) * size;
            } else {
                return (this.props.width / this.props.height) * size;
            }
        } else {
            if (this.props.width < this.props.height) {
                return (this.props.height / this.props.width) * size * 0.5;
            } else {
                return (this.props.width / this.props.height) * size * 0.5;
            }
        }
    }
    render() {
        return (
            <View style={{
                flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                height: this.getFontSize(70)
            }} onLayout={this.onLayout.bind(this)}>
                {!this.props.isResOpen && <View style={{
                    flex: 1, flexDirection: 'row', height: this.getFontSize(70),
                }}>
                    <TouchableOpacity style={{
                        flex: 2, height: this.getFontSize(70), padding: this.getFontSize(10), borderBottomWidth: this.getFontSize(5), borderBottomColor: this.props.navState == 'table' ? 'white' : defaultColor,
                        borderLeftColor: defaultColor, borderRightColor: 'white', borderTopColor: defaultColor, justifyContent: 'center',
                        borderLeftWidth: 0.5, borderRightWidth: 0.5, borderTopWidth: 0.5,
                        alignContent: 'center', alignSelf: 'center', alignItems: 'center', backgroundColor: defaultColor
                    }}
                        onPress={this.tabChange.bind(this, "table")}
                    >
                        <Text style={{ color: '#fff', fontSize: this.getFontSize(30) }}>Table</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flex: 2, height: this.getFontSize(70), padding: this.getFontSize(10), borderBottomWidth: this.getFontSize(5), borderBottomColor: this.props.navState == 'menu' ? 'white' : defaultColor,
                        borderLeftColor: defaultColor, borderRightColor: 'white', borderTopColor: defaultColor, justifyContent: 'center',
                        borderLeftWidth: 0.5, borderRightWidth: 0.5, borderTopWidth: 0.5,
                        alignContent: 'center', alignSelf: 'center', alignItems: 'center', backgroundColor: defaultColor
                    }}
                        onPress={this.tabChange.bind(this, "menu")}
                    >
                        <Text style={{ color: '#fff', fontSize: this.getFontSize(30) }}>Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flex: 2, height: this.getFontSize(70), padding: this.getFontSize(10), borderBottomWidth: this.getFontSize(5), borderBottomColor: this.props.navState == 'review' ? 'white' : defaultColor,
                        borderLeftColor: defaultColor, borderRightColor: 'white', borderTopColor: defaultColor, justifyContent: 'center',
                        borderLeftWidth: 0.5, borderRightWidth: 0.5, borderTopWidth: 0.5,
                        alignContent: 'center', alignSelf: 'center', alignItems: 'center', backgroundColor: defaultColor
                    }}
                        onPress={this.tabChange.bind(this, "review")}
                    >
                        <Text style={{ color: '#fff', fontSize: this.getFontSize(30) }}>Review</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flex: 2, height: this.getFontSize(70), padding: this.getFontSize(10), borderBottomWidth: this.getFontSize(5), borderBottomColor: this.props.navState == 'checkout' ? 'white' : defaultColor,
                        borderLeftColor: defaultColor, borderRightColor: 'white', borderTopColor: defaultColor, justifyContent: 'center',
                        borderLeftWidth: 0.5, borderRightWidth: 0.5, borderTopWidth: 0.5,
                        alignContent: 'center', alignSelf: 'center', alignItems: 'center', backgroundColor: defaultColor
                    }}
                        onPress={this.tabChange.bind(this, "checkout")}
                    >
                        <Text style={{ color: '#fff', fontSize: this.getFontSize(30) }}>Checkout</Text>
                    </TouchableOpacity>
                    <View style={{
                        flex: 1, height: 100 + '%', backgroundColor: defaultColor,
                        borderBottomWidth: this.getFontSize(5), borderBottomColor: defaultColor, padding: this.getFontSize(5), margin: 0
                    }}>
                        <TouchableOpacity style={{
                            padding: this.getFontSize(10), width: 96 + '%', height: this.getFontSize(60),
                            borderColor: '#fff', borderWidth: 3,
                            justifyContent: 'center', borderRadius: this.getFontSize(60), flexDirection: 'row',
                            alignContent: 'center', alignSelf: 'center', alignItems: 'center', backgroundColor: defaultColor
                        }}
                            onPress={this.tabChange.bind(this, "dashboard")}
                        >
                            {/* <Text style={{color: '#fff', fontSize: 25}}>Back</Text> */}
                            <Icon name='md-home' style={{ fontSize: this.getFontSize(50), color: '#fff', fontWeight: 'bold' }}></Icon>
                        </TouchableOpacity>
                    </View>
                </View>}
                {this.props.isResOpen && <View style={{ flex: 1, flexDirection: 'row', height: this.getFontSize(70) }}>
                    <TouchableOpacity onPress={this.tabChange.bind(this, "back")} style={{
                        width: 100 + '%', height: this.getFontSize(70), padding: this.getFontSize(10), borderBottomWidth: 1, borderBottomColor: 'white',
                        borderLeftColor: defaultColor, borderRightColor: 'white', borderTopColor: defaultColor, justifyContent: 'center',
                        borderLeftWidth: 0.5, borderRightWidth: 0.5, borderTopWidth: 0.5,
                        alignContent: 'center', alignSelf: 'center', alignItems: 'center', backgroundColor: defaultColor
                    }}>
                        <Text style={{ color: '#fff', fontSize: this.getFontSize(30) }}>Back</Text>
                    </TouchableOpacity>
                </View>}
            </View>
        )
    }
    checkoutConfirmation() {
        Alert.alert('Confirmation', 'Do you want to go to Dashboard?',
            [{ text: 'No', onPress: () => { style: 'cancel' } },
            { text: 'Yes', onPress: this.gotoDasborad.bind(this) }],
            { cancelable: false });
    }
    gotoDasborad() {        
        this.unblockTables();
        this.props.dispatch({ type: SagaActions.UNBLOCK_TABLE, id:this.props.selectedtable.TableID }); 
        this.props.dispatch({ type: ReduxActions.RESET_REVIEW_REDUCER });
        this.props.dispatch({ type: ReduxActions.RESET_FLOOR_DATA });
        this.props.dispatch({ type: ReduxActions.RESET_MENU_REDUCER });
        this.props.dispatch({ type: ReduxActions.RESET_TABLE_DATA });
        this.props.dispatch({ type: ReduxActions.RESET_NAV_REDUCER });
        this.props.dispatch({ type: ReduxActions.RESET_USER_REDUCER });
        this.props.dispatch({ type: ReduxActions.RESET_CHECKOUT_REDUCER });
        const resetAction = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({ routeName: "LaunchScreen" })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }
    gotoTable() {
        this.props.dispatch({ type: ReduxActions.SET_NAV_STATE, navState: 'table' });
        const resetAction = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({ routeName: "TableStack" })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }
    unblockTables=()=>{
        if(!__.isEmpty(this.props.childTables)){
            let tables = [...this.props.childTables];
            tables.push(this.props.selectedtable.TableID);
            this.props.dispatch({ type: SagaActions.UNBLOCK_TABLES, TableIds:tables });
        }
        else{
            this.props.dispatch({ type: SagaActions.UNBLOCK_TABLE, id:this.props.selectedtable.TableID });
         }
    }
    tabChange(val, type) {

        switch (val) {
            case "dashboard":
                this.checkoutConfirmation(this);
                break;

            case "back":
                if (this.props.isResOpen) {
                    this.props.navigation.navigate('SearchReservation')
                    this.props.dispatch({ type: ReduxActions.SET_RES_STATE, isResOpen: false });
                }
                break;

            case "table":
                if (this.props.connectionStatus === 'Online') {
                    this.unblockTables();
                    if (!__.isEmpty(this.props.orders)) {
                        Alert.alert('Confirmation', 'Do you want to go to table screen, your curent selections will be lost?',
                            [{ text: 'No', onPress: () => { style: 'cancel' } },
                            { text: 'Yes', onPress: this.gotoTable.bind(this) }],
                            { cancelable: false });
                    } else {
                        if (!this.props.isResOpen) {
                            this.props.dispatch({ type: ReduxActions.RESET_USER_REDUCER });
                        }
                        this.gotoTable();
                    }
                } else {
                    Toast.show({
                        text: 'You are offline. Please check internet connection.',
                        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
                        duration: 3000,
                        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
                        buttonText: "Okay",
                        type: "danger"
                    })
                }

                break;
            case "menu":
            if (this.props.connectionStatus === 'Online') {
                if (!__.isEmpty(this.props.selectedtable)) {
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        key: null,
                        actions: [
                            NavigationActions.navigate({ routeName: "OrderStack" })
                        ]
                    });
                    this.props.navigation.dispatch(resetAction);
                    this.props.dispatch({ type: ReduxActions.SET_NAV_STATE, navState: 'menu' });
                }
                else {
                    Toast.show({
                        text: 'Please select a table.',
                        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
                        duration: 2000,
                        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
                        buttonText: "Okay",
                        type: "danger"
                    });
                    this.props.dispatch({ type: ReduxActions.SET_NAV_STATE, navState: 'table' });
                }
              } else {
                Toast.show({
                    text: 'You are offline. Please check internet connection.',
                    textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
                    duration: 3000,
                    buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
                    buttonText: "Okay",
                    type: "danger"
                })
            }
                break;
            case "review":
            if (this.props.connectionStatus === 'Online') {
                if (this.props.orderNumber === "") {
                    if (__.isEmpty(this.props.selectedtable)) {
                        Toast.show({
                            text: 'Please select a table.',
                            textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
                            duration: 2000,
                            buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
                            buttonText: "Okay",
                            type: "danger"
                        });
                        this.props.dispatch({ type: ReduxActions.SET_NAV_STATE, navState: 'table' });
                    }
                    else {
                        Toast.show({
                            text: 'No orders for review.',
                            textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
                            duration: 2000,
                            buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
                            buttonText: "Place Order",
                            type: "danger"
                        });
                        this.props.dispatch({ type: ReduxActions.SET_NAV_STATE, navState: 'menu' });
                    }
                }
                else {
                    this.props.dispatch({ type: ReduxActions.SET_NAV_STATE, navState: 'review' });
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        key: null,
                        actions: [
                            NavigationActions.navigate({ routeName: "ReviewStack" })
                        ]
                    });
                    this.props.navigation.dispatch(resetAction);
                }
              } else {
                Toast.show({
                    text: 'You are offline. Please check internet connection.',
                    textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
                    duration: 3000,
                    buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
                    buttonText: "Okay",
                    type: "danger"
                })
            }
                break;
            case "checkout":
            if (this.props.connectionStatus === 'Online') {
                if (this.props.orderNumber === "") {
                    if (__.isEmpty(this.props.selectedtable)) {
                        Toast.show({
                            text: 'Please select a table.',
                            textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
                            duration: 2000,
                            buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
                            buttonText: "Okay",
                            type: "danger"
                        });
                        this.props.dispatch({ type: ReduxActions.SET_NAV_STATE, navState: 'table' });
                    }
                    else {
                        Toast.show({
                            text: 'No orders to checkout.',
                            textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
                            duration: 2000,
                            buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
                            buttonText: "Place Order",
                            type: "danger"
                        });
                        this.props.dispatch({ type: ReduxActions.SET_NAV_STATE, navState: 'menu' });
                    }
                }
                else {
                    this.props.dispatch({ type: ReduxActions.SET_NAV_STATE, navState: 'checkout' });
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        key: null,
                        actions: [
                            NavigationActions.navigate({ routeName: "CheckOutStack" })
                        ]
                    });
                    this.props.navigation.dispatch(resetAction);
                }
              } else {
                Toast.show({
                    text: 'You are offline. Please check internet connection.',
                    textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
                    duration: 3000,
                    buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
                    buttonText: "Okay",
                    type: "danger"
                })
            }
                break;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        navState: state.navReducer.navState,
        IsorderCheckedOut: state.checkOutReducer.isCheckoutOrderSuccessfully,
        selectedtable: state.floorReducer.selectedtable,
        isResOpen: state.navReducer.isResOpen,
        NoOfPerson: state.tableReducer.NoOfPerson,
        orderNumber: state.menuReducer.orderNumber,
        orders: state.menuReducer.Orders,
        height: state.DashBoardReducer.height,
        width: state.DashBoardReducer.width,
        connectionStatus: state.loginReducer.connectionStatus,
        childTables: state.tableReducer.childTables
    };
}

export default connect(mapStateToProps, null)(NavBar)
