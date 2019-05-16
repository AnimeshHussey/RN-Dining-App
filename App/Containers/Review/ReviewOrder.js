import React from 'react';
import { Text, View, ScrollView, Alert, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import ReviewItems from "./ReviewItems";
import moment from "moment";
import { Toast } from 'native-base';
import { Card, Badge } from 'react-native-elements';
import { connect } from 'react-redux';
import ReduxActions from "../../Redux/ActionTypes/Action";
import SagaActions from "../../Sagas/ActionTypes/Action";
import Modal from "react-native-modal";
import __ from "lodash";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import comStyles, { customerIconColor, supportingColor } from '../Styles/CommonStyles';
import NavBar from '../CommonComponents/NavBar';
import SwapModal from '../Modal/SwapTableModal';
import ReduceQuantityModal from '../Modal/ReduceQuantity';
import Header from '../CommonComponents/Header';
import InteractionProvider from 'react-native-interaction-provider'

class ReviewOrderScreen extends React.Component {
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
    componentWillMount() {
        if(this.props.connectionStatus==='Online'){
            if (this.props.orderNumber) {
                this.props.dispatch({ type: SagaActions.GET_ORDER_DETAILS, OrderID: this.props.orderNumber, priceGroup:this.props.selectedSection.m_Item3});
            }
            this.props.dispatch({ type: ReduxActions.RESET_FLOOR });
        }
        else {
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

    componentDidUpdate(prevProps, prevState){
        if(this.props.connectionStatus==='Online'){
            if ((prevProps.CanceledRound !== this.props.CanceledRound || this.props.isItemCancelled) && this.props.orderNumber) {
                this.props.dispatch({ type: SagaActions.GET_ORDER_DETAILS, OrderID: this.props.orderNumber,priceGroup:this.props.selectedSection.m_Item3 });
            } 
        }
        else {
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
    

    activateSwap(subOrderNumber){
        if(this.props.connectionStatus==='Online'){
            this.props.dispatch({type: ReduxActions.ACTIVATE_SWAP_TABLE, subOrderNumber: subOrderNumber});
        }
        else {
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

    render() {
        let btns = [];
        if (!__.isEmpty(this.props.ReviewOrderDetails)) {
            let order = Object.assign({}, this.props.ReviewOrderDetails);
            if(order.subOrder){
            order.subOrder.map((item) => {
                let myOrders = [];
                item.Orders.map((data,i) => {
                    myOrders.push(<ReviewItems key={i} items={data} changeQuatity={this.changeQuatity.bind(this,item.SubOrderNumber)} cancelItem={this.cancelItem.bind(this,item.SubOrderNumber)} />);
                });
                var submittedTime = moment(item.submittedTime).format('MMM DD h:mm A');
                let roundTitle = ' Round: ' + item.SubOrderNumber + "   " + submittedTime;
                btns.push(
                    <Card>
                        <View style={{
                            flex: 1, flexDirection: "row", justifyContent: 'flex-start', height: this.getFontSize(45), backgroundColor:item.isApproved?'black':'#800000',
                            alignContent: 'flex-start', borderRadius: this.getFontSize(45)
                            }}>
                             <TouchableOpacity disabled={!item.isApproved} style={{ width: 10 + '%', height: this.getFontSize(30),
                                justifyContent: 'center', alignContent: 'center',
                                alignItems: 'center', alignSelf: 'center',
                                }}onPress={this.deleteRound.bind(this, order.OrderID, item.SubOrderNumber)}>
                                <Icon2 name="cancel" style={{ fontSize: this.getFontSize(30), color: '#fff' }}></Icon2>
                            </TouchableOpacity>
                            <View style={{
                                width: 70 + '%', flexDirection: 'row', justifyContent: 'center',
                                alignContent: 'center', alignItems: 'center', alignSelf: 'center'
                                }}>
                                <Text style={{ color: '#fff', fontSize: this.getFontSize(25) }}>{roundTitle}</Text>
                            </View>
                            <TouchableOpacity disabled={!item.isApproved} style={{ width: 10 + '%', height: this.getFontSize(30),
                                justifyContent: 'center', alignContent: 'center',
                                alignItems: 'center', alignSelf: 'center',
                                 borderColor: '#fff', borderWidth: 1, borderRadius: this.getFontSize(30)
                                }}
                                onPress={this.kotPrint.bind(this, order.OrderID, item.SubOrderNumber)}>
                                <Icon name="print" style={{ fontSize: this.getFontSize(30), color: '#fff' }}></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={!item.isApproved} style={{ width: 10 + '%', height: this.getFontSize(30),
                                justifyContent: 'center', alignContent: 'center',
                                alignItems: 'center', alignSelf: 'center',
                                //  borderColor: '#fff', borderWidth: 1, borderRadius: 30
                                }}
                                onPress={this.activateSwap.bind(this,item.SubOrderNumber)}>
                                <Icon1 name="swap-horizontal" style={{ fontSize: this.getFontSize(30), color: '#fff' }}></Icon1>
                            </TouchableOpacity>
                        </View>
                        {myOrders}
                    </Card>
                );
            });
        }
        }
        return (
            <InteractionProvider  timeout={600 * 1000} // idle after 1m
            onActive={() => {}}
            onInactive={() => this.autodirectDashboard()}>
            <View style={{ width: 100 + '%', flexDirection: 'column', height: 100 + '%', justifyContent: 'flex-start' }} onLayout={this.onLayout.bind(this)}>
                {/* <View style={{ width: 100 + '%', height: 8 + '%' }}> */}
                     <Header></Header>
                {/* </View> */}
                <View style={{ width: 100 + '%', height: 80 + '%' }}>
                {__.isEmpty(this.props.ReviewOrderDetails) && <View style={{height: 100 + '%', width: 100 + '%',position: 'absolute', zIndex: 100, backgroundColor:'#fff',
                justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center', opacity: 0.8}}>
                <ActivityIndicator size="large" color={'orange'} /></View>}

                    {!__.isEmpty(this.props.ReviewOrderDetails) && <View style={{ flex: 1, flexDirection: 'column' }}>
                        <ScrollView>{btns}</ScrollView>
                        <Badge containerStyle={{ backgroundColor: supportingColor, height: this.getFontSize(40) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'baseline', paddingLeft: this.getFontSize(20), width: 95 + '%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text h1 style={{ justifyContent: 'flex-start', fontWeight: 'bold', fontSize: this.getFontSize(25), color: customerIconColor, float: 'left' }}>Total Price: </Text>
                                <Icon name="rupee" style={{ justifyContent: 'flex-end', fontWeight: 'bold', fontSize: this.getFontSize(25), color: customerIconColor, float: 'left' }}>
                                    <Text h1 style={comStyles.whiteTxtStyle}> {this.props.ReviewOrderDetails.TotalPrice}</Text>
                                </Icon>
                            </View>
                        </Badge>
                    </View>}
                </View>
                <View style={{ flex: 1, height: 70 }}>
                    <NavBar navigation={this.props.navigation} />
                </View>
                {this.props.swap && 
                <Modal backdropColor="black" backdropOpacity="0.4" transparent={true} 
                style={{ borderRadius: 5, opacity: 0.8,
                alignContent: 'center', alignSelf: 'center', alignContent: 'center'}}
                visible={this.props.swap} onBackdropPress={this.activateSwap.bind(this,"")}
                onRequestClose={this.activateSwap.bind(this,"")}
                >
                <SwapModal></SwapModal>
                </Modal>}
                {this.props.showQuantityModal && <Modal backdropColor="black" backdropOpacity="0.4" transparent={true} 
                style={{ borderRadius: 5, opacity: 0.8,
                alignContent: 'center', alignSelf: 'center', alignContent: 'center'}}
                visible={this.props.showQuantityModal} onBackdropPress={this.showhidequantityMOdal.bind(this,"")}
                onRequestClose={this.showhidequantityMOdal.bind(this,"")}
                >
                <ReduceQuantityModal suborderNumber={this.props.rqsubOrderNumber} itemName={this.props.rqItemName} itemQuantity={this.props.rqItemQuantity} itemID={this.props.rqItemID}></ReduceQuantityModal>
                </Modal>}
            </View>
            </InteractionProvider>
        )
    }
    autodirectDashboard() {
        //clearTimeout(this.timer);
        if(this.props.navState=== "review"){
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
            NavigationActions.navigate({ routeName: "TableStack" })
          ]
        });
        this.props.navigation.dispatch(resetAction);
      }
      }
kotPrint(orderID, subOrderNumber) {
    if(this.props.connectionStatus==='Online'){
    var KOTObj = {
        "OrderID": orderID,
        "BOOKINGNAME": "string",
        "suborderNumber": subOrderNumber,
        "category": "string",
        "PriceGroup": this.props.selectedSection.m_Item3
        }
    this.props.dispatch({type:SagaActions.KOT_PRINTING, KOTObj});
    }else {
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

deleteRound(orderID, subOrderNumber){
    if(this.props.connectionStatus==='Online'){
        var cancelObj = {
            "CurrOrderID": orderID,
            "ChangedOrderID": "string",
            "CancelOnly": true,
            "TargetTableID": 0,
            "Suborder": subOrderNumber,
            "CustID": 0,
            "OrderExists": true,
            "NoOfPersons": 0,
            "CurrPriceGroup":this.props.selectedSection.m_Item3,
            "CaptainNumber":this.props.userID
          }
        Alert.alert('Confirmation', 'Do you want to cacel order for this round ?',
        [{ text: 'No', onPress: () => {style: 'cancel'} },
        { text: 'Yes', onPress: ()=>this.props.dispatch({type: SagaActions.SWAP_SUBORDER, obj: cancelObj})}],
        { cancelable: false });
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

  cancelItem(subOrderNumber,ItemID,ItemName){
    if(this.props.connectionStatus==='Online'){
        var cancelObj = {
            "CurrOrderID": this.props.orderNumber,
            "ChangedOrderID": "string",
            "CancelOnly": true,
            "TargetTableID": 0,
            "Suborder": subOrderNumber,
            "ItemID": ItemID,
            "CustID": 0,
            "OrderExists": true,
            "NoOfPersons": 0,
            "CurrPriceGroup":this.props.selectedSection.m_Item3,
            "CaptainNumber":this.props.userID
          }
        Alert.alert('Confirmation', 'Do you want to cacel ' +ItemName+ ' ('+ItemID+')'+'?',
        [{ text: 'No', onPress: () => {style: 'cancel'} },
        { text: 'Yes', onPress: ()=>this.props.dispatch({type: SagaActions.SWAP_SUBORDER, obj: cancelObj})}],
        { cancelable: false });
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

  changeQuatity=(subOrderNumber,ItemID,ItemName,itemQuantity)=>{
    this.props.dispatch({type:ReduxActions.SHOW_QUANTITY_MODAL,showhideModal:!this.props.showQuantityModal});
    this.props.dispatch({type:ReduxActions.SET_RQITEM,ItemID:ItemID,ItemName:ItemName,ItemQuantity:itemQuantity,rqsubOrderNumber:subOrderNumber});
  }

  showhidequantityMOdal=()=>{
    if(this.props.connectionStatus==='Online'){
      this.props.dispatch({type:ReduxActions.SHOW_QUANTITY_MODAL,showhideModal:!this.props.showQuantityModal})
    }
    else {
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

const mapStateToProps = (state) => {
    return {
        isItemCancelled:state.reviewReducer.OrderDetails,
        ReviewOrderDetails: state.reviewReducer.OrderDetails,
        orderNumber: state.menuReducer.orderNumber,
        swap: state.reviewReducer.swap,
        CanceledRound: state.reviewReducer.CanceledRound,
        height: state.DashBoardReducer.height,
        width: state.DashBoardReducer.width,
        connectionStatus: state.loginReducer.connectionStatus,
        selectedSection:state.floorReducer.selectedSection,
        userID: state.DashBoardReducer.userID,
        showQuantityModal:state.reviewReducer.showQuantityModal,
        rqItemID:state.reviewReducer.rqItemID,
        rqItemName:state.reviewReducer.rqItemName,
        rqItemQuantity: state.reviewReducer.rqItemQuantity, 
        rqsubOrderNumber:state.reviewReducer.rqsubOrderNumber
    }
}

export default connect(mapStateToProps, null)(ReviewOrderScreen)