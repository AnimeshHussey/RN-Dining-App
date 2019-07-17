import React, { Component } from 'react'
import ReactNative, { ScrollView, Text,  View, TouchableOpacity, Dimensions, Navigator } from 'react-native'
import { Card, CardItem, Left, Toast } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import ReduxActions from "../../Redux/ActionTypes/Action";
import {NavigationActions } from 'react-navigation';
import SagaActions from "../../Sagas/ActionTypes/Action";
import comStyles, { defaultColor , supportingColor, plusMinusIconColor, defaultTxtColor} from '../Styles/CommonStyles';

class PlaceOrder extends Component {
  // componentWillMount() {
  //   this.props.dispatch({ type: ReduxActions.SET_ORDER_FOR_PLACING, tableID: this.props.selectedtable.TableID, noOfPerson: this.props.NoOfPerson});
  // }

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
    callRemarksModal(item) {
      if (item.quantity > 0) {
        this.props.dispatch({ type: ReduxActions.SELECTED_ITEM_FOR_REMARKS, ItemID: item.ItemID });
        this.props.dispatch({ type: ReduxActions.IS_REMARKS_MODAL_VISIBLE, remarksVisible: true });
        this.props.dispatch({ type: ReduxActions.RESET_REMARKSLIST });
      }
      else {
        Toast.show({
          text: 'To give remarks for this item, You need to update the quantity.',
          textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
          duration: 2000,
          buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
          buttonText: "Okay",
          type: "danger"
        });
      }
    }   

    componentDidCatch(error, info) {
      // Display fallback UI
      //this.setState({ hasError: true });
      // You can also log the error to an error reporting service
      alert("Detectd");
    }
  render() {
    return (
      <Card onLayout={this.onLayout.bind(this)}>
      <View style={{
        flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        borderWidth: 0.5, borderColor: 'black', height: this.props.height* 0.8, width: this.props.width* 0.8, backgroundColor: supportingColor, opacity: 1
      }}>
        <Card style={{
          width: 100 + '%', backgroundColor: defaultColor, position: 'absolute', top: 0, left: 0,
          justifyContent: 'center', alignItems: 'center', height: this.getFontSize(50), zIndex: 2, opacity: 1
            }}>
          <Text style={{ fontSize: this.getFontSize(35), color: '#fff', fontWeight: 'bold' }}>
            Place order
          </Text>
        </Card>
        <View style={{
          height: 90 + '%',
          width: 100 + '%', flexDirection: 'column', opacity: 1,
          justifyContent: 'center', alignItems: 'center', padding: this.getFontSize(20), marginTop: this.getFontSize(20), 
        }}>
        <View style={{
            flex: 1, flexDirection: 'row', marginBottom: this.getFontSize(10), justifyContent: 'center',alignItems: 'flex-start'}}>
          <ScrollView >
              {this.props.Orders.length > 0 && this.props.Orders.map((element, index) => {
                return (
                  <Card key={index} style={{ backgroundColor: 'white', borderWidth: 0.5, borderColor: 'black', height: this.getFontSize(element.Comments !== null?(element.Comments.length*0.7 + 60):60), margin: 0, padding: 0}}>
                    <CardItem style={{ margin: 5, height: this.getFontSize(element.Comments !== null?(element.Comments.length*0.6 + 60):60) }}>
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', }}>
                        <Left style={{ flex:1, flexDirection: 'column' ,height: this.getFontSize(element.Comments !== null?(element.Comments.length*0.5 + 60):60), padding: 0 }}>
                        <ScrollView>
                          <Text style={{ color: 'black', fontSize: this.props.width>this.props.height?this.getFontSize(20): this.getFontSize(15)}}>{element.ItemName}</Text>
                          {element.Comments !== null && <Text style={{ color: 'black', fontSize: this.props.width>this.props.height?this.getFontSize(15): this.getFontSize(10)}}>{'Remarks: '}{element.Comments}</Text>}
                          </ScrollView>
                        </Left>
                        <Left style={{ flexWrap: 'wrap', flexDirection: 'column' }}>
                          <Text style={{ color: 'black', fontSize: this.props.width>this.props.height?this.getFontSize(20): this.getFontSize(15) }}>Rs. {element.ItemPrice}</Text>
                        </Left>
                        <TouchableOpacity onPress={() => this.updateIndex(element, false, index)} style={{ padding: 10 }}>
                          <Icon name="minus-circle" size={this.getFontSize(40)} color={plusMinusIconColor} />
                        </TouchableOpacity>
                          <Text style={{ marginVertical: 18, fontSize: this.props.width>this.props.height?this.getFontSize(25): this.getFontSize(20),fontWeight:'bold',color: defaultTxtColor }}>{element.quantity}</Text>
                        <TouchableOpacity onPress={() => this.updateIndex(element, true, index)} style={{ padding: 10}}>
                          <Icon name="plus-circle" size={this.getFontSize(40)} color={plusMinusIconColor} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.callRemarksModal.bind(this, element)}>
                        <Card style={{ justifyContent: 'center', width: this.getFontSize(45), height: this.getFontSize(45) }}>
                        <Icon1 name="message-text" style={{ fontSize: this.getFontSize(40), color: defaultColor }}></Icon1>
                        </Card>
                        </TouchableOpacity>
                      </View>
                    </CardItem>
                  </Card>
                )
              })}
          </ScrollView>
          </View>          
      
          <View style={{ width: 100 + '%', flexDirection: "row", justifyContent: 'center', alignItems: 'center',
           alignSelf: 'center', marginBottom: this.getFontSize(10) }}>
            <TouchableOpacity style={{ backgroundColor: defaultColor, height: this.getFontSize(50), padding: this.getFontSize(10), opacity: 1 }}
              onPress={this.submitOrder.bind(this)}>
              <Text style={{ color: '#fff', fontSize: 20 }}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
        </Card>
    )
  }
  // componentDidUpdate() {
  //   const resetAction = NavigationActions.reset({
  //     index: 0,
  //     key: null,
  //     actions: [
  //         NavigationActions.navigate({ routeName: "TableStack" })
  //     ]
  // });
  //   if (this.props.isOrderPlaced==="SUCCESS") {   
  //   this.props.navigation.dispatch(resetAction);
  //   }
  //   else if (this.props.isOrderPlaced==="FAILED"){
  //     Toast.show({
  //       text: "Table's status has been changed.",
  //       textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
  //       duration: 2000,
  //       buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
  //       buttonText: "Okay",
  //       type: "danger"
  //   });
  //   this.props.navigation.dispatch(resetAction);
  //   }
  // }
  closePopup() {
    this.props.dispatch({ type: ReduxActions.IS_ORDER_MODAL_OPEN, isOrderModalOpen: false })
  }
  updateIndex(item, add, ind) {
    this.props.dispatch({ type: ReduxActions.CHANGE_QUANTITY_FROM_MODAL, itemDetails: item, toAdd: add, itemIndex: ind });
  }
  submitOrder() {
    try {
    if(this.props.connectionStatus==='Online'){

  if(this.props.Orders.length!==0){
    this.props.dispatch({ type: ReduxActions.IS_ORDER_MODAL_OPEN, isOrderModalOpen: false });
    let checkQuantity=[];
    checkQuantity=this.props.Orders.filter(item=>item.quantity===0)
    if(checkQuantity.length !== this.props.Orders.length){
      
      this.props.dispatch({type:ReduxActions.PLACING_ORDER});
      let tempOrder=Object.assign({},this.props.orderObj);
      tempOrder.customer=this.props.customer;
      tempOrder.tableID= this.props.selectedtable.TableID?this.props.selectedtable.TableID:this.props.masterTableID;
      tempOrder.noofPerson=this.props.NoOfPerson;
      tempOrder.CaptainNumber=this.props.userID;
      let Obj={
        "SubOrderNumber":this.props.subOrderNo+1,
        "isApproved": true,
        "submittedTime": "2018-10-26T11:54:53.679Z",
        "Orders": []
      }
      Obj.Orders=this.props.Orders;
      let tempArr=[];
      tempArr.push(Obj);
      tempOrder.subOrder=tempArr;
      tempOrder.PriceGroup=this.props.selectedSection.m_Item3;
      if(this.props.childTables.length>0)
      { 
        let childTables= [...this.props.childTables];
        if(this.props.masterTableID>0)
        childTables.push(this.props.masterTableID);
        tempOrder.ChildTables=childTables.reverse();
      } 
      else{
        tempOrder.ChildTables=[this.props.masterTableID];
      }
      this.props.dispatch({ type: SagaActions.PLACE_ORDER, Obj: tempOrder });
      this.props.dispatch({type:ReduxActions.RESET_ITEM_QUANTITY,itemList:this.props.itemList});
      this.props.dispatch({type:ReduxActions.SET_MERGE_TABLE,ismergeTable:false})
      if(!this.props.isResOpen){
        this.props.dispatch({type:ReduxActions.RESET_USER_REDUCER});
      }
    }
      else{
        Toast.show({
          text: 'Please check the quantity of the items you are trying to order.',
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
      text: 'No items are selected for order.',
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
      text: 'You are offline. Please check internet connection.',
      textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
      duration: 3000,
      buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
      buttonText: "Okay",
      type: "danger"
    })
  }
} catch (error) {
  this.props.dispatch({type:ReduxActions.FAILED_TO_PLACE_ORDER});       
}
}

}

const mapStateToProps = (state) => {
  return {
    selectedCategory: state.menuReducer.selectedCategory,
    Orders: state.menuReducer.Orders,
    itemList: state.menuReducer.itemList,
    orderObj: state.menuReducer.orderObj,
    isOrderModalOpen: state.menuReducer.isOrderModalOpen,
    customer:state.UserReducer.CustomerDetails,
    selectedtable: state.floorReducer.selectedtable,
    NoOfPerson:state.tableReducer.NoOfPerson,
    subOrderNo:state.menuReducer.SubOrderNumber,
    height: state.DashBoardReducer.height,
    width: state.DashBoardReducer.width,
    userID: state.DashBoardReducer.userID,
    floorDetails: state.floorReducer.floorList,
    connectionStatus: state.loginReducer.connectionStatus,
    selectedSection:state.floorReducer.selectedSection,
    masterTableID: state.tableReducer.masterTableID,
    isOrderPlaced: state.menuReducer.isOrderPlaced,
    childTables: state.tableReducer.childTables
  };
}

export default connect(mapStateToProps, null)(PlaceOrder)
