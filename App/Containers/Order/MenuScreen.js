import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, TextInput, Dimensions, ActivityIndicator } from 'react-native'
import { Card, Toast, Label } from 'native-base';
import { connect } from 'react-redux';
import ReduxActions from "../../Redux/ActionTypes/Action";
import SagaActions from "../../Sagas/ActionTypes/Action";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions } from 'react-navigation';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modal";
import RemarksScreen from './RemarksScreen';
import Draggable from 'react-native-draggable';
import PlaceOrder from './PlaceOrder'
import comStyles from '../Styles/CommonStyles';
import { defaultColor, plusMinusIconColor, defaultTxtColor } from '../Styles/CommonStyles';
import NavBar from '../CommonComponents/NavBar';
import GuestScreen from '../Modal/GuestScreen';
import Header from '../CommonComponents/Header';
import InteractionProvider from 'react-native-interaction-provider';
import __ from "lodash";

class MenuScreen extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = { pressStatus: false };
  // }
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
  componentDidUpdate() {
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
          NavigationActions.navigate({ routeName: "TableStack" })
      ]
  });
    if (this.props.isOrderPlaced==="SUCCESS") {   
      if(!__.isEmpty(this.props.childTables)){
        let tables = [...this.props.childTables];
        tables.push(this.props.selectedtable.TableID);
        this.props.dispatch({ type: SagaActions.UNBLOCK_TABLES, TableIds:tables });
    }
    else{
        this.props.dispatch({ type: SagaActions.UNBLOCK_TABLE, id:this.props.selectedtable.TableID });
        }
    this.props.navigation.dispatch(resetAction);
    }
    else if (this.props.isOrderPlaced==="FAILED"){
      Toast.show({
        text: "Table's status has been changed.",
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "danger"
    });
    this.props.navigation.dispatch(resetAction);
    }
  }
 
  _onHideUnderlay() {
    this.setState({ pressStatus: false });
  }
  _onShowUnderlay() {
    this.setState({ pressStatus: true });
  }

  autodirectDashboard() {
    if(this.props.navState=== "menu"){
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

  showItems(index) {
    if (this.props.searchedVal && this.props.searchedArr.length > 0) {
      this.props.dispatch({ type: ReduxActions.SET_SELECTED_ITEMS, items: this.props.searchedArr[index], selectedIndex: index })
    } else
      this.props.dispatch({ type: ReduxActions.SET_SELECTED_ITEMS, items: this.props.itemList[index], selectedIndex: index })
  }
  updateIndex(item, add, ind) {
    this.props.dispatch({ type: ReduxActions.UPDATE_QUANTITY, itemDetails: item, toAdd: add, itemIndex: ind })
  }
  callRemarksModal(item) {
    if (item.quantity > 0) {
      this.props.dispatch({ type: ReduxActions.SELECTED_ITEM_FOR_REMARKS, ItemID: item.ItemID });
      this.props.dispatch({ type: ReduxActions.IS_REMARKS_MODAL_VISIBLE, remarksVisible: true });
      this.props.dispatch({ type: ReduxActions.RESET_REMARKSLIST });
      //this.props.dispatch({ type: SagaActions.GET_REMARKS });  
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
  exitRemarksModal() {
    this.props.dispatch({ type: ReduxActions.IS_REMARKS_MODAL_VISIBLE, remarksVisible: false });
    this.props.dispatch({ type: ReduxActions.IS_KEYBOARD_OPEN, isKeyboardOpen: false });
  }
  callOrderModal() {
    this.props.dispatch({ type: ReduxActions.IS_ORDER_MODAL_OPEN, isOrderModalOpen: true });
  }
  exitOrderModal() {
    this.props.dispatch({ type: ReduxActions.IS_ORDER_MODAL_OPEN, isOrderModalOpen: false });
  }

  showComment(elementID) {
    let isVisible = false;
    this.props.orders.map((item) => {
      if (elementID === item.ItemID && item.Comments)
        isVisible = true;
    })
    return isVisible;
  }
  comment(elementID) {
    let comment = '';
    this.props.orders.map((item) => {
      if (elementID === item.ItemID && item.Comments)
        comment = item.Comments;
    })
    return comment;
  }
  RemoveComment(elementID) {
    this.props.orders.map((item) => {
      if (elementID === item.ItemID && item.Comments)
        item.Comments = null;
    })
    let removedCommentFromObj = Object.assign([], this.props.orders);
    this.props.dispatch({ type: ReduxActions.COMMENT_REMOVED, newObj: removedCommentFromObj });
  }
  changeCard(value) {
    // Alert.alert("1>>>" + this.props.searchedVal);
    if (value !== '') {
      this.props.dispatch({ type: ReduxActions.SET_SEARCH_VALUE_MENU, searchedVal: value });
      let searchedArray = Object.assign([], this.props.itemList);
      let temp1 = [];
      searchedArray.map(el => {
        let temp = [];
        el.Items.map(item => {
          if (item.ItemName.toLowerCase().includes(value.toLowerCase())) {
            temp.push(item)
          }
        })
        if (temp.length > 0) {
          temp1.push({"CategoryName": el.CategoryName, "Items": temp});
        }
      })
      //temp1 =searchedArray.filter(a => a.Items.some(u => u.ItemName.toLowerCase().includes(value.toLowerCase())));
      this.props.dispatch({ type: ReduxActions.SET_SEARCH_RESULTS_MENU, searchedArr: temp1 })
      this.props.dispatch({ type: ReduxActions.SET_SELECTED_ITEMS, items: this.props.searchedArr[0], selectedIndex: 0 })
    }
    else {
      this.props.dispatch({ type: ReduxActions.RESET_SEARCH_DATA_MENU_REDUCER});
    }
  }

  render() {
    let ItemArr = [];
    if (this.props.searchedVal && this.props.searchedArr.length > 0) {
      {        
        this.props.searchedArr.map((each, index) => {
          ItemArr.push(
            <Card key={index} style={index === this.props.selectedIndex ? comStyles.cardSelectedBGStyle : comStyles.cardBGStyle}>
              <TouchableOpacity style={{ width: this.getFontSize(180), backgroundColor: 'black', height: this.getFontSize(45), margin: this.getFontSize(7), flexDirection: 'column' }}
                onHideUnderlay={this._onHideUnderlay.bind(this)}
                onShowUnderlay={this._onShowUnderlay.bind(this)}
                onPress={() => this.showItems(index)} >
                <View style={{
                  flexDirection: 'row',
                  width: 100 + '%', height: 100 + '%', opacity: 1,
                  justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', zIndex: 2
                }}>
                  <View style={{ flex: 1, paddingLeft: this.getFontSize(3) }}>
                    <Icon name='food' style={{ fontSize: this.getFontSize(30), color: defaultColor }} />
                  </View>
                  <View style={{ flex: 5 }}>
                    <Text style={{ fontSize: this.getFontSize(18), color: 'black' }}>
                      {each.CategoryName}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Card>
          )
        })
      }
    }
    else if (this.props.searchedVal && this.props.searchedArr.length === 0) {
      ItemArr.push(
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Label>No Item found.</Label>
        </View>
      )
    }
    else {
      this.props.itemList.map((each, index) => {
        ItemArr.push(
          <Card key={index} style={index === this.props.selectedIndex ? comStyles.cardSelectedBGStyle : comStyles.cardBGStyle}>
            <TouchableOpacity style={{ width: this.getFontSize(180), backgroundColor: 'black', height: this.getFontSize(45), margin: this.getFontSize(7), flexDirection: 'column' }}
              onHideUnderlay={this._onHideUnderlay.bind(this)}
              onShowUnderlay={this._onShowUnderlay.bind(this)}
              onPress={() => this.showItems(index)} >
              <View style={{
                flexDirection: 'row',
                width: 100 + '%', height: 100 + '%', opacity: 1,
                justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', zIndex: 2
              }}>
                <View style={{ flex: 1, paddingLeft: this.getFontSize(3) }}>
                  <Icon name='food' style={{ fontSize: this.getFontSize(30), color: defaultColor }} />
                </View>
                <View style={{ flex: 5 }}>
                  <Text style={{ fontSize: this.getFontSize(18), color: 'black' }}>
                    {each.CategoryName}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Card>
        )
      })
    }
    return (
      //{...this._panResponder.panHandlers}
      <InteractionProvider  timeout={600 * 1000} // idle after 1m
  onActive={() => {}}
  onInactive={() => this.autodirectDashboard()}>
        <View style={{ width: 100 + '%', flexDirection: 'column', height: 100 + '%', justifyContent: 'flex-start' }} onLayout={this.onLayout.bind(this)} >
        {this.props.isOrderPlaced === "PLACING" && <View style={{
          height: 100 + '%', width: 100 + '%', position: 'absolute', zIndex: 100, backgroundColor: '#fff',
          justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center', opacity: 1
        }}>
          <ActivityIndicator size="large" color={'orange'} /></View>}
          <Header></Header>
          {this.props.searchVisable === true && <View style={{
            width: 100 + '%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
            height: 35, borderWidth: 0.5, borderColor: 'black', paddingLeft: 2 + '%', paddingRight: 2 + '%'
          }} >
            <TextInput itemColor={defaultColor}
              style={{
                height: 35, width: 95 + '%', borderColor: 'black', borderWidth: 1, borderRadius: 35, backgroundColor: '#fff', opacity: 1, fontSize: this.getFontSize(20), paddingBottom: 5, color: 'black',
                paddingLeft: 10
              }}
              onChangeText={(text) => this.changeCard(text)} underlineColorAndroid='transparent' placeholder="Search item" />
          </View>}
          <View style={{
            width: 100 + '%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
            height: this.props.searchVisable === true ? (73 + '%') : 80 + '%', borderWidth: 0.5, borderColor: 'black'
          }} >
            <View style={{
              height: 97 + '%',
              width: 98 + '%', flexDirection: 'row', zIndex: 2, opacity: 0.8,
              justifyContent: 'space-between', alignItems: 'center',
            }}>
              <View style={{
                width: 30 + '%', height: 100 + '%', backgroundColor: 'white',
                opacity: 1, justifyContent: 'flex-start', flexDirection: 'row', padding: 4
              }}>
                <ScrollView>
                  <View style={{
                    flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly',
                    paddingTop: 1, paddingBottom: this.getFontSize(10)
                  }} >
                    {ItemArr}
                  </View>
                </ScrollView>
              </View>
              <View style={{ width: 69 + '%', height: 100 + '%', backgroundColor: 'white' }}>
                <ScrollView>
                  {this.props.selectedCategory.length > 0 && ((this.props.searchedVal && this.props.searchedArr.length !== 0) || (this.props.searchedVal === null)) && this.props.selectedCategory.map((element, index) => {
                    return (
                      <Card key={index} style={[false ? comStyles.cardSelectedBGStyle : comStyles.cardBGStyle, this.showComment(element.ItemID) ? comStyles.borderNRStyleCust : comStyles.borderNRStyle]}>
                        {/* <CardItem style={{margin: 5}}> */}
                        <View style={{ flex: 1, flexDirection: 'column', margin: 0, padding: 0 }}>
                          <View style={{
                            flex: 1, flexDirection: 'row', justifyContent: 'center',
                            alignItems: 'center', margin: 0, padding: 0
                          }}>
                            <View style={{
                              width: 30 + '%', justifyContent: 'center', alignContent: 'flex-start',
                              alignItems: 'flex-start', alignSelf: 'flex-start', margin: 0, paddingLeft: this.getFontSize(5)
                            }}>
                              <Text style={{ color: 'black' }}>{element.ItemName}</Text>
                            </View>
                            <View style={{
                              width: 30 + '%', justifyContent: 'center', alignContent: 'center',
                              alignItems: 'center', alignSelf: 'center', margin: 0, padding: 0
                            }}>
                              <Text style={{ color: 'black' }}>Rs. {element.ItemPrice}</Text>
                            </View>
                            <View style={{
                              width: 30 + '%', flexDirection: 'row', justifyContent: 'center',
                              alignContent: 'center', alignItems: 'center', alignSelf: 'center', margin: 0, padding: 0
                            }}>
                              <TouchableOpacity onPress={() => this.updateIndex(element, false, index)} style={{ padding: this.getFontSize(10) }}>
                                <Icon name="minus-circle" size={this.getFontSize(35)} color={plusMinusIconColor} />
                              </TouchableOpacity>
                              <Text style={{ marginVertical: 18, fontSize: this.getFontSize(20), color: defaultTxtColor }}>{element.quantity}</Text>
                              <TouchableOpacity onPress={() => this.updateIndex(element, true, index)} style={{ padding: this.getFontSize(10) }}>
                                <Icon name="plus-circle" size={this.getFontSize(35)} color={plusMinusIconColor} />
                              </TouchableOpacity>
                            </View>
                            <View style={{
                              justifyContent: 'center', alignContent: 'center', alignItems: 'center',
                              alignSelf: 'center', width: this.getFontSize(35), height: this.getFontSize(45)
                            }}>
                              <TouchableOpacity style={{ justifyContent: 'center', width: this.getFontSize(45), height: this.getFontSize(45) }}
                                onPress={this.callRemarksModal.bind(this, element)}
                              >
                                <Card style={{ justifyContent: 'center', width: this.getFontSize(45), height: this.getFontSize(45) }}>
                                  <Icon name="message-text" style={{ fontSize: this.getFontSize(45), color: defaultColor }}></Icon>
                                </Card>
                              </TouchableOpacity>
                            </View>

                          </View>
                          {/* </CardItem> */}
                          {this.showComment(element.ItemID) && <View style={{
                            flex: 1, width: 100 + '%', height: this.getFontSize(50), flexDirection: 'row', justifyContent: 'center', alignContent: 'center',
                            alignItems: 'center', alignSelf: 'center', marginTop: 5, borderColor: '#bfbfbf',
                            borderTopWidth: 1
                          }}>
                            <View style={{ width: 90 + '%', justifyContent: 'flex-start' }}>
                            <ScrollView>
                              <Text style={{ color: 'black', fontSize: this.getFontSize(15) }}>{this.comment(element.ItemID)}</Text>
                              </ScrollView>
                            </View>
                            <TouchableOpacity onPress={() => this.RemoveComment(element.ItemID)}>
                              <Icon2 name="clear" style={{ color: 'black', alignSelf: 'flex-end', justifyContent: 'center', fontSize: this.getFontSize(25), paddingRight: this.getFontSize(15) }}></Icon2>
                            </TouchableOpacity>
                          </View>}
                        </View>
                      </Card>
                    )
                  })}
                </ScrollView>
              </View>
              <View style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignContent: 'center' }}>
                {this.props.isRemarksModalVisible &&
                  <Modal backdropColor="black" backdropOpacity="0.4" transparent={true} style={{
                    borderRadius: this.getFontSize(5), opacity: 0.8,
                    alignContent: 'center', alignSelf: 'center', alignContent: 'center'
                  }}
                    visible={this.props.isRemarksModalVisible}
                    //  onBackdropPress={() =>{ this.callUserModal.bind(false)}}
                    onBackdropPress={this.exitRemarksModal.bind(this)}
                    // onRequestClose={() => {this.callUserModal.bind(false)}}
                    onRequestClose={this.exitRemarksModal.bind(this)}
                  >
                    <RemarksScreen></RemarksScreen>

                  </Modal>}
                {this.props.isOrderModalOpen &&
                  <Modal backdropColor="black" backdropOpacity="0.4" transparent={true}
                    style={{
                      borderRadius: this.getFontSize(5), opacity: 0.8,
                      alignContent: 'center', alignSelf: 'center', alignContent: 'center'
                    }}
                    visible={this.props.isOrderModalOpen}
                    // onBackdropPress={() =>{ this.callUserModal.bind(false)}}
                    onBackdropPress={this.exitOrderModal.bind(this)}
                    // onRequestClose={() => {this.callUserModal.bind(false)}}
                    onRequestClose={this.exitOrderModal.bind(this)}
                  >
                    <PlaceOrder navigation={this.props.navigation}></PlaceOrder>
                  </Modal>}
                {this.props.isUserModalVisible &&
                  <Modal backdropColor="black" backdropOpacity="0.4" transparent={true} style={{
                    borderRadius: this.getFontSize(5), opacity: 0.8,
                    alignContent: 'center', alignSelf: 'center', alignContent: 'center'
                  }} visible={this.props.isUserModalVisible}
                    onBackdropPress={this.exitUserModal.bind(this)} onRequestClose={this.exitUserModal.bind(this)}>
                    <GuestScreen></GuestScreen>
                  </Modal>}
              </View>
              <Draggable reverse={false} renderColor={defaultColor} offsetX={(this.props.width || this.props.height) <= 800 ? (this.props.width < this.props.height ? -130 : -190) : (this.props.width < this.props.height ? -70 : -215)} offsetY={0}
                renderSize={43} renderText='Place Order' pressDrag={this.callOrderModal.bind(this)} />
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
          <View style={{ flex: 1, height: 70 }}>
            <NavBar navigation={this.props.navigation} />
          </View>
        </View>
        </InteractionProvider>
    )
  }

  exitUserModal() {
    this.props.dispatch({ type: ReduxActions.IS_USER_MODAL_VISIBLE, visible: false });
  }
}
const mapStateToProps = (state) => {
  return {
    selectedCategory: state.menuReducer.selectedCategory,
    selectedtable: state.floorReducer.selectedtable,
    NoOfPerson: state.tableReducer.NoOfPerson,
    isRemarksModalVisible: state.UserReducer.isRemarksModalVisible,
    itemList: state.menuReducer.itemList,
    selectedIndex: state.menuReducer.selectedIndex,
    isOrderModalOpen: state.menuReducer.isOrderModalOpen,
    isOrderPlaced: state.menuReducer.isOrderPlaced,
    selectedIndex: state.menuReducer.selectedIndex,
    orderNumber: state.menuReducer.orderNumber,
    orders: state.menuReducer.Orders,
    isUserModalVisible: state.UserReducer.isUserModalVisible,
    height: state.DashBoardReducer.height,
    width: state.DashBoardReducer.width,
    searchedVal: state.menuReducer.searchedVal,
    searchedArr: state.menuReducer.searchedArr,
    searchVisable: state.menuReducer.searchVisable,
    navState:state.navReducer.navState,
    isKeyBoardOpen:state.menuReducer.isKeyBoardOpen,
    childTables: state.tableReducer.childTables
  };
}

export default connect(mapStateToProps, null)(MenuScreen)



  // _panResponder = {};
  // timer = 0;
  // componentWillMount() {
  //   this._panResponder = PanResponder.create({
      
  //     onStartShouldSetPanResponder: () => {
  //       this.resetTimer()
  //       return true
  //     },
  //     onMoveShouldSetPanResponder: () => true,
  //     onStartShouldSetPanResponderCapture: () => { this.resetTimer() ; return false},
  //     onMoveShouldSetPanResponderCapture: () => false,
  //     onPanResponderTerminationRequest: () => true,
  //     onShouldBlockNativeResponder: () => false,
  //   });
  //   if(this.props.navState=== "menu"){
  //   this.timer = setTimeout(()=>this.callFac(),300000);
  //   }
  // }
  
  // resetTimer(){
  //   if(this.props.navState=== "menu"){
  //   clearTimeout(this.timer);
  //   this.timer = 0;
  //   if(this.props.inactive)
  //   this.props.dispatch({type: ReduxActions.SET_INACTIVITY_STATE, inactive: false});
  //   this.timer = setTimeout(()=>this.callFac(),300000)
  //   }
  // }
  // callFac() {
  //   if(this.props.navState=== "menu"){
  //   this.props.dispatch({type: ReduxActions.SET_INACTIVITY_STATE, inactive: true});
  //   this.props.dispatch({ type: ReduxActions.SET_NAV_STATE, navState: 'table' });
  //   this.autodirectDashboard();
  //   clearTimeout(this.timer);
  //   this.timer = 0;}
  // }