import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, TextInput, ActivityIndicator, Dimensions, Alert } from 'react-native'
import { Toast, Card, Label } from 'native-base';
import comStyles from '../Styles/CommonStyles';
import ReduxActions from "../../Redux/ActionTypes/Action";
import SagaActions from "../../Sagas/ActionTypes/Action";
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import GuestScreen from '../Modal/GuestScreen';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import __ from "lodash";
import { defaultColor, supportingColor } from '../Styles/CommonStyles';
import NavBar from '../CommonComponents/NavBar';
import { NavigationActions } from 'react-navigation';
import InteractionProvider from 'react-native-interaction-provider'
import MergeTableModal from "../Modal/MergeTableScreen";

class TableScreen extends Component {

  componentWillMount() {  
    if (this.props.connectionStatus === 'Online') {
      this.props.dispatch({ type: ReduxActions.RESET_FLOOR_DATA });
      this.props.dispatch({ type: SagaActions.GET_FLOOR_DETAILS, user: this.props.userID, section: this.props.selectedSection.m_Item1,Pricegroup:this.props.selectedSection.m_Item3 });
      this.props.dispatch({type: SagaActions.GET_MENU_ITEMS,Pricegroup:this.props.selectedSection.m_Item3}); 
      this.props.dispatch({ type: ReduxActions.RESET_MENU_REDUCER });
      this.props.dispatch({ type: ReduxActions.RESET_TABLE_DATA });
      this.props.dispatch({ type: ReduxActions.RESET_REVIEW_REDUCER });
      this.props.dispatch({ type: ReduxActions.RESET_USER_REDUCER });
      this.props.dispatch({ type: ReduxActions.RESET_CHECKOUT_REDUCER });
      this.props.dispatch({ type: ReduxActions.SET_NAV_STATE, navState: 'table' });
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
  }
    componentDidMount(){
      this._interval = setInterval(() => {
        this.props.dispatch({ type: SagaActions.GET_FLOOR_DETAILS, user: this.props.userID, section: this.props.selectedSection.m_Item1,Pricegroup:this.props.selectedSection.m_Item3 });
      }, 10000);
    }

    componentWillUnmount() {
      clearInterval(this._interval);
    }

  autodirectDashboard() {
    if(this.props.navState=== "table"){
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
  }
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

  componentDidUpdate(prevProps, prevState) {
    if(this.props.navState !== "table"){
      clearInterval(this._interval);
    }

    if (this.props.isTableReservedSuccessfully) {
      this.props.navigation.navigate("SearchReservation")
      this.props.dispatch({ type: ReduxActions.RESET_TABLE_DATA })
    }
    if (this.props.releasedSuccessfully) {
      const resetAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: "TableStack" })
        ]
      });
      this.props.navigation.dispatch(resetAction);
    }
    
    if(prevProps.TableStatus!==this.props.TableStatus && prevProps.TableStatus ==='' && this.props.TableStatus==="UNBLOCKED")
    { 
      if(this.props.ReleasingTable===true)
        {
          this.props.dispatch({ type: SagaActions.RELEASE_TABLE, id: this.props.ReleaseTableID,Captain:this.props.userID,orderExistAndEmpty:this.props.ReleaseOrder? !this.HasValidSuborder(this.props.ReleaseOrder):false })
          this.props.dispatch({ type: ReduxActions.RESET_RELEASING_TABLE }); 
          this.props.dispatch({ type: ReduxActions.RESET_TABLE_BLOCK_STATUS }); 
        }
    }
    else if(prevProps.TableStatus!==this.props.TableStatus && 
      prevProps.TableStatus ==='' && this.props.TableStatus==="BLOCKED"){
      Toast.show({
        text: 'Someone is taking order for this table.',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 3000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "danger"
      });   
      this.props.dispatch({ type: ReduxActions.RESET_TABLE_BLOCK_STATUS });
    }

    if(prevProps.istableBlocked!==this.props.istableBlocked && prevProps.istableBlocked ==='' && this.props.istableBlocked==="BLOCKED"){
      this.proceedTableSelection();
      this.props.dispatch({ type: ReduxActions.RESET_BOLCKING_STATUS }); 
    }
    else if(prevProps.istableBlocked!==this.props.istableBlocked && 
      prevProps.istableBlocked ==='' && this.props.istableBlocked==="FAILED_TO_BLOCK"){         
      Toast.show({
          text: 'Someone is taking order for this table.',
          textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
          duration: 3000,
          buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
          buttonText: "Okay",
          type: "danger"
        });      
      this.props.dispatch({ type: ReduxActions.RESET_SELECTED_TABLE }); 
      this.props.dispatch({ type: SagaActions.GET_FLOOR_DETAILS, user: this.props.userID, section: this.props.selectedSection.m_Item1,Pricegroup:this.props.selectedSection.m_Item3 });
      this.props.dispatch({ type: ReduxActions.RESET_BOLCKING_STATUS }); 
    }
    // if((prevProps.RevisedStatus!==this.props.RevisedStatus && this.props.RevisedStatus !=="")
    // || (this.props.RevisedStatus==="" && this.props.CurrentStatus=== "Occupied_Without_Order")||
    // this.props.RevisedStatus==="" && this.props.CurrentStatus=== "Table_Reserved"){
    //   this.checkTablestatus();
    // }
    if (this.props.isBookingFailed === "FAILED") {
      this.props.dispatch({ type: SagaActions.GET_FLOOR_DETAILS, user: this.props.userID, section: this.props.selectedSection.m_Item1,Pricegroup:this.props.selectedSection.m_Item3 });
      this.props.dispatch({ type: ReduxActions.RESET_SELECTED_TABLE });
      this.props.dispatch({ type: ReduxActions.RESET_BOOKING_STATUS });
      this.props.dispatch({type:ReduxActions.RESET_CHILD_TABLES});
      Toast.show({
        text: 'Table already booked by another captain !',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "danger"
      });
    }
    else if (this.props.isBookingFailed === "SUCCESS") {
      this.props.dispatch({ type: ReduxActions.SET_NAV_STATE, navState: 'menu' });
      this.props.dispatch({ type: ReduxActions.RESET_BOOKING_STATUS });
      this.props.dispatch({type:ReduxActions.SET_PARENT_TABLE,tableID:this.props.selectedtable.TableID,tableName:this.props.selectedtable.TableName});
     const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: "OrderStack" })
      ]
    });
    this.props.navigation.dispatch(resetAction);
    }
}

  fillTable(tableData) {    
    if (this.props.connectionStatus === 'Online') {
      if (!this.props.isResOpen) {
        if(!tableData.IsOccupied){
        if (this.props.NoOfPerson > 0) {
          this.props.dispatch({ type: SagaActions.BLOCK_TABLE, id:tableData.TableID,LockOrCheck:true }); 
          this.props.dispatch({ type: ReduxActions.SELECTED_TABLE, SelectedtableData:tableData });
        }
        else {
          Toast.show({
            text: "Number of person cannot be blank.",
            textStyle: { fontSize: 25, fontFamily: 'Avenir-Black' },
            duration: 2000,
            position: "bottom",
            buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
            buttonText: "Ok",
            type: "danger"
          })
        }
      }
      else
      {
        if(tableData.OrderDetails===null){
          if (this.props.NoOfPerson > 0) {
            this.props.dispatch({ type: SagaActions.BLOCK_TABLE, id:tableData.TableID,LockOrCheck:true }); 
            //let SelectedtableData = Object.assign({}, tableData);
            this.props.dispatch({ type: ReduxActions.SELECTED_TABLE, SelectedtableData:tableData });
          }
          else {
            Toast.show({
              text: "Number of person cannot be blank.",
              textStyle: { fontSize: 25, fontFamily: 'Avenir-Black' },
              duration: 2000,
              position: "bottom",
              buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
              buttonText: "Ok",
              type: "danger"
            })
          }
        }
        else if(tableData.IsCheckedout === true){
          Toast.show({
            text: 'Table due for payment of previous order.',
            textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
            duration: 2000,
            buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
            buttonText: "Okay",
            type: "danger"
          });
        }
        else { 
        this.props.dispatch({ type: SagaActions.BLOCK_TABLE, id:tableData.TableID,LockOrCheck:true });        
        //let SelectedtableData = Object.assign({}, tableData);
        this.props.dispatch({ type: ReduxActions.SELECTED_TABLE, SelectedtableData:tableData });
        }
      }
      }
      else {
        if (this.props.noOfGuest > 0) {
          let objResrvTable = {
            "ID": this.props.reservationID,
            "TableID": tableData.TableID
          }
          this.props.dispatch({ type: SagaActions.SAVE_TABLE_RESERVATION, objResrvTable });
        }       
        else {
          Toast.show({
            text: "Number of person cannot be blank.",
            textStyle: { fontSize: 25, fontFamily: 'Avenir-Black' },
            duration: 2000,
            position: "bottom",
            buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
            buttonText: "Ok",
            type: "danger"
          })
        }
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
  }

  proceedTableSelection(){ 
    if (!this.props.selectedtable.IsOccupied) {
      if (this.props.NoOfPerson > 0) {
        if(this.props.mergeTable){
          this.props.dispatch({type:ReduxActions.SHOW_MERGE_TABLE_MODAL,showMergeModal:true});
          this.props.dispatch({type:ReduxActions.SET_PARENT_TABLE,tableID:this.props.selectedtable.TableID,tableName:this.props.selectedtable.TableName});
        }
        else{
        this.props.dispatch({ type: SagaActions.BOOK_TABLE, id: this.props.selectedtable.TableID });
        this.props.dispatch({ type: ReduxActions.SELECTED_TABLE, SelectedtableData:this.props.selectedtable });
        }
      }
      else {
        Toast.show({
          text: "Number of person cannot be blank.",
          textStyle: { fontSize: 25, fontFamily: 'Avenir-Black' },
          duration: 2000,
          position: "bottom",
          buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
          buttonText: "Ok",
          type: "danger"
        })
      }
    }
    else {
      this.props.dispatch({ type: ReduxActions.RESET_MENU_REDUCER });
      const resetAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: "OrderStack" })
        ]
      });
      if (this.props.selectedtable.OrderDetails !== null && this.props.selectedtable.IsCheckedout === false) {          
        let OrderID = this.props.selectedtable.OrderDetails.OrderID;
        let SubOrderNumber = this.props.selectedtable.OrderDetails.subOrder.length;
        let CustomerID = this.props.selectedtable.OrderDetails.customer === null ? "" : this.props.selectedtable.OrderDetails.customer.CustomerID;
        let CustomerName = this.props.selectedtable.OrderDetails.customer === null ? "" : this.props.selectedtable.OrderDetails.customer.CustomerName;
        this.props.dispatch({ type: ReduxActions.SET_EXISTING_ORDER_ID, OrderID, SubOrderNumber });
        this.props.dispatch({ type: ReduxActions.SET_EXISTING_CUSTOMER, CustomerID, CustomerName });
        this.props.dispatch({ type: ReduxActions.SET_NOOFPERSON, noofperson: this.props.selectedtable.OrderDetails.noofPerson }); 
      if(this.props.selectedtable.IsMergedTable)
      this.props.dispatch({type:ReduxActions.SET_CHILD_TABLES,tables:[this.props.selectedtable.TableName],childTables:this.props.selectedtable.OrderDetails.ChildTablesName});
      else
      this.props.dispatch({type:ReduxActions.SET_PARENT_TABLE,tableID:this.props.selectedtable.TableID,tableName:this.props.selectedtable.TableName});   
      this.props.dispatch({ type: ReduxActions.SET_NAV_STATE, navState: 'menu' });
      this.props.navigation.dispatch(resetAction);  
    }
      else if (this.props.selectedtable.IsOccupied === true && this.props.selectedtable.IsCheckedout === true) {
        Toast.show({
          text: 'Table due for payment of previous order.',
          textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
          duration: 2000,
          buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
          buttonText: "Okay",
          type: "danger"
        });
      }
      else {
        if (this.props.selectedtable.Customer !== null) {   
          this.props.dispatch({ type: ReduxActions.SET_USER_NAME, userName: this.props.selectedtable.Customer.CustomerName });
          this.props.dispatch({ type: ReduxActions.SET_USER_MOBILE_NO, mobileNumber: this.props.selectedtable.Customer.CustomerID });
          this.props.dispatch({ type: ReduxActions.SET_NOOFPERSON, noofperson: this.props.selectedtable.NoOfPersons });  
          this.props.dispatch({type:ReduxActions.SET_PARENT_TABLE,tableID:this.props.selectedtable.TableID,tableName:this.props.selectedtable.TableName}); 
          this.props.dispatch({ type: ReduxActions.SET_NAV_STATE, navState: 'menu' });
          this.props.navigation.dispatch(resetAction);
        } else {
          if (this.props.NoOfPerson > 0) {
            this.props.dispatch({type:ReduxActions.SET_PARENT_TABLE,tableID:this.props.selectedtable.TableID,tableName:this.props.selectedtable.TableName}); 
            this.props.dispatch({ type: ReduxActions.SET_NAV_STATE, navState: 'menu' });
            this.props.navigation.dispatch(resetAction);
          } else {
            Toast.show({
              text: "Number of person cannot be blank.",
              textStyle: { fontSize: 25, fontFamily: 'Avenir-Black' },
              duration: 2000,
              position: "bottom",
              buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
              buttonText: "Ok",
              type: "danger"
            })
          }
        }
      }
    }
  }

  changeFloor(val) {
    if (this.props.connectionStatus === 'Online') {
      this.props.totalSection.forEach(element => {
        if(val === element.m_Item2){
          this.props.dispatch({ type:ReduxActions.SET_SELECTED_SECTION, section:element }); 
          this.props.dispatch({ type: SagaActions.GET_FLOOR_DETAILS, user: this.props.userID, section: element.m_Item1,Pricegroup:element.m_Item3 });
          this.props.dispatch({type: SagaActions.GET_MENU_ITEMS,Pricegroup:element.m_Item3}); 
        }
      });
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

  }

  changeField(noofperson) {
    if (!this.props.isResOpen) {
      this.props.dispatch({ type: ReduxActions.SET_NOOFPERSON, noofperson });
    }
  }

  autodirectDashboard() {
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

  releaseTable(tableID,orderDetails) {
    if (this.props.connectionStatus === 'Online') {
      this.props.dispatch({ type: SagaActions.BLOCK_TABLE, id:tableID,LockOrCheck:false}); 
      this.props.dispatch({ type: ReduxActions.SET_RELEASING_TABLE,ReleaseTableID:tableID,ReleaseOrder:orderDetails });
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
  }

  undoCheckout(tableID,TableName,orderID){
    if (this.props.connectionStatus === 'Online') {
      Alert.alert('Confirmation', 'Do you want to undo checkout ' +TableName+' ?',
      [{ text: 'No', onPress: () => {style: 'cancel'} },
      { text: 'Yes', onPress: ()=>
      {
        this.props.dispatch({ type: SagaActions.UNDO_CHECKOUT_TABLE, id: tableID,orderiD:orderID});
        this.props.dispatch({ type: SagaActions.UNBLOCK_TABLE, id:tableID });
      }  }],
      { cancelable: false });
      
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
  }

  changeCard(value) {
    this.props.dispatch({ type: ReduxActions.SET_SEARCH_VALUE, searchedVal: value });
    if (value !== '') {
      let searchedArray = [];
      searchedArray = this.props.floorDetails[0].Tables.filter(element => element.TableName.toLowerCase().includes(value.toLowerCase()));
      if(searchedArray.length>0)
      {
      this.props.dispatch({ type: ReduxActions.SET_SEARCH_RESULTS, searchedArr: searchedArray });
      }      
    }
    else {
      this.props.dispatch({ type: ReduxActions.SET_SEARCH_VALUE, searchedVal: null });
      this.props.dispatch({ type: ReduxActions.SET_SEARCH_RESULTS, searchedArr: this.props.floorDetails[0].Tables })
    }
  }

  callUserModal() {
    this.props.dispatch({ type: ReduxActions.IS_USER_MODAL_VISIBLE, visible: true })
  }
  exitUserModal() {
    this.props.dispatch({ type: ReduxActions.IS_USER_MODAL_VISIBLE, visible: false })
  }
  render() {
    let tableArray = [];
    if (this.props.floorDetails.length > 0) {
      if (this.props.searchedVal && this.props.searchedTables.length > 0) {
        this.props.searchedTables.map((tableNo, index) => {
          if (this.props.isResOpen) {
            tableArray.push(
              <View key={index} style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Card>
                  <TouchableOpacity disabled={tableNo.IsOccupied} onPress={this.fillTable.bind(this, tableNo)}
                    style={{
                      backgroundColor: '#fff', opacity: 1, padding: 5, height: Math.min(this.props.width, this.props.height) / 8,
                      width: Math.max(this.props.width, this.props.height) * (2 / 9), shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8, shadowRadius: 2
                    }}>
                    <View containerStyle={[comStyles.backgroundStyle, comStyles.colContainer]}>
                      <View style={{
                        width: 100 + '%', height: 25, flexDirection: 'column', justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: this.getBackgroundColor(tableNo.IsOccupied, tableNo.OrderDetails, tableNo.IsCheckedout, tableNo.TableID)
                      }}>
                        <Text style={{ color: 'black', fontSize: tableNo.IsMergedTable?this.getFontSize(12):this.getFontSize(17), fontFamily: 'Avenir-Book', fontWeight: 'bold' }}>Table : {tableNo.IsMergedTable?(tableNo.OrderDetails?tableNo.OrderDetails.ChildTablesName.join(","):tableNo.TableName):tableNo.TableName}</Text>
                      </View>
                      <View style={{ width: 100 + '%', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 2 }}>
                        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: 100 + '%' }}>
                          <Text style={{ color: 'black', fontSize: this.getFontSize(17), fontFamily: 'Avenir-Book', fontWeight: 'bold' }}>Capacity: {tableNo.Capacity}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Card>
              </View>
            )
          }
          else if (!this.props.isResOpen) {

            tableArray.push(
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Card>
                  <TouchableOpacity onPress={this.fillTable.bind(this, tableNo)}
                    style={{
                      backgroundColor: '#fff', opacity: 1, padding: 5, height: Math.min(this.props.width, this.props.height) / 4.5,
                      width: Math.max(this.props.width, this.props.height) * (2 / 9), shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8, shadowRadius: 2
                    }}>
                    <View containerStyle={[comStyles.backgroundStyle, comStyles.colContainer]}>
                      <View style={{
                        width: 100 + '%', height: 25, flexDirection: 'column', justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: this.getBackgroundColor(tableNo.IsOccupied, tableNo.OrderDetails, tableNo.IsCheckedout, tableNo.TableID)
                      }}>
                        <Text style={{ color: 'black', fontSize: tableNo.IsMergedTable?this.getFontSize(12):this.getFontSize(17), fontFamily: 'Avenir-Book', fontWeight: 'bold' }}>Table : {tableNo.IsMergedTable?(tableNo.OrderDetails?tableNo.OrderDetails.ChildTablesName.join(","):tableNo.TableName):tableNo.TableName}</Text>
                      </View>
                      <View style={{ width: 100 + '%', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 2 }}>
                        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: 100 + '%' }}>
                          <Text style={{ color: 'black', fontSize: this.getFontSize(17), fontFamily: 'Avenir-Book', fontWeight: 'bold' }}>Capacity: {tableNo.Capacity}</Text>
                        </View>
                      </View>
                      {(tableNo.OrderDetails !== null && tableNo.IsOccupied && tableNo.OrderDetails.customer) &&
                        <View style={{
                          width: 100 + '%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
                          alignContent: 'flex-start', alignSelf: 'flex-start'
                        }}>
                          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: 100 + '%', marginLeft: -5 }}>
                            <Text style={{ color: 'black', fontSize: this.getFontSize(17), fontFamily: 'Avenir-Book', fontWeight: 'bold' }}> Name:
                          {tableNo.OrderDetails.customer.CustomerName}
                            </Text>
                          </View>
                          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: 100 + '%' }}>
                            <Text style={{ color: 'black', fontSize: this.getFontSize(17), fontFamily: 'Avenir-Book', fontWeight: 'bold' }}>Mobile No:
                           {tableNo.OrderDetails.customer.CustomerID}
                            </Text>
                          </View>
                          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: 100 + '%' }}>
                            <Text style={{ color: 'black', fontSize: this.getFontSize(17), fontFamily: 'Avenir-Book', fontWeight: 'bold' }}>Billed Amount:
                          {tableNo.OrderDetails.TotalPrice}
                            </Text>
                          </View>
                        </View>}
                      {(tableNo.Customer !== null && tableNo.IsOccupied === true) &&
                        <View style={{
                          width: 100 + '%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
                          alignContent: 'flex-start', alignSelf: 'flex-start'
                        }}>
                          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: 100 + '%', marginBottom: 10, marginLeft: -5 }}>
                            <Text style={{ color: 'black', fontSize: this.getFontSize(17), fontFamily: 'Avenir-Book', fontWeight: 'bold' }}> Name:
                          {tableNo.Customer.CustomerName}
                            </Text>
                          </View>
                          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: 100 + '%' }}>
                            <Text style={{ color: 'black', fontSize: this.getFontSize(17), fontFamily: 'Avenir-Book', fontWeight: 'bold' }}>Mobile No:
                           {tableNo.Customer.CustomerID}
                            </Text>
                          </View>
                        </View>}
                    </View>
                  </TouchableOpacity>
                  {this.getBackgroundColor(tableNo.IsOccupied, tableNo.OrderDetails, tableNo.IsCheckedout, '') === '#FDFF00' &&
                    <TouchableOpacity style={{
                      width: 100 + '%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'baseline',
                      alignContent: 'flex-start', alignSelf: 'flex-start', backgroundColor: defaultColor, height: 40,
                      borderWidth: 3, borderColor: '#fff'
                    }} onPress={this.releaseTable.bind(this, tableNo.TableID,tableNo.OrderDetails)}>
                      <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: this.getFontSize(25), color: '#fff' }}>Release Table</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <Icon1 name="remove" style={{ fontSize: 30, color: '#fff' }}> </Icon1>
                      </View>
                    </TouchableOpacity>}
                    {this.getBackgroundColor(tableNo.IsOccupied, tableNo.OrderDetails, tableNo.IsCheckedout, '') === 'green' &&
                    <TouchableOpacity style={{
                      width: 100 + '%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'baseline',
                      alignContent: 'flex-start', alignSelf: 'flex-start', backgroundColor: defaultColor, height: 40,
                      borderWidth: 3, borderColor: '#fff'
                    }} onPress={this.undoCheckout.bind(this,tableNo.TableID,tableNo.TableName,tableNo.OrderDetails.OrderID?tableNo.OrderDetails.OrderID:"")}>
                      <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: this.getFontSize(25), color: '#fff' }}>Undo Checkout</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <Icon name="undo-variant" style={{ fontSize: 30, color: '#fff' }}> </Icon>
                      </View>
                    </TouchableOpacity>}
                </Card>
              </View>
            )
          }
        })
      }
      else if (this.props.searchedVal && this.props.searchedTables.length === 0) {
        tableArray.push(
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Label>Table you searched for is not on this floor. Please try other floors.</Label>
          </View>
        )
      }
      else {
        this.props.floorDetails[0].Tables.map((tableNo, index) => {
          if (this.props.isResOpen) {
            tableArray.push(
              <View key={index} style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Card>
                  <TouchableOpacity disabled={tableNo.IsOccupied} onPress={this.fillTable.bind(this, tableNo)}
                    style={{
                      backgroundColor: '#fff', opacity: 1, padding: 5, height: Math.min(this.props.width, this.props.height) / 8,
                      width: Math.max(this.props.width, this.props.height) * (2 / 9), shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8, shadowRadius: 2
                    }}>
                    <View containerStyle={[comStyles.backgroundStyle, comStyles.colContainer]}>
                      <View style={{
                        width: 100 + '%', height: 25, flexDirection: 'column', justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: this.getBackgroundColor(tableNo.IsOccupied, tableNo.OrderDetails, tableNo.IsCheckedout, tableNo.TableID)
                      }}>
                        <Text style={{ color: 'black', fontSize: tableNo.IsMergedTable?this.getFontSize(12):this.getFontSize(17), fontFamily: 'Avenir-Book', fontWeight: 'bold' }}>Table : {tableNo.IsMergedTable?(tableNo.OrderDetails?tableNo.OrderDetails.ChildTablesName.join(","):tableNo.TableName):tableNo.TableName}</Text>
                      </View>
                      <View style={{ width: 100 + '%', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 2 }}>
                        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: 100 + '%' }}>
                          <Text style={{ color: 'black', fontSize: this.getFontSize(17), fontFamily: 'Avenir-Book', fontWeight: 'bold' }}>Capacity: {tableNo.Capacity}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Card>
              </View>
            )
          }
          else if (!this.props.isResOpen) {
            tableArray.push(
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Card style={{ flexDirection: 'column', backgroundColor: '#fff', opacity: 1 }}>
                  <TouchableOpacity onPress={this.fillTable.bind(this, tableNo)}
                    style={{
                      backgroundColor: '#fff', opacity: 1, padding: 5, height: Math.min(this.props.width, this.props.height) / 4.5,
                      width: Math.max(this.props.width, this.props.height) * (2 / 9), shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8, shadowRadius: 2
                    }}>
                    <View containerStyle={[comStyles.backgroundStyle, comStyles.colContainer]}>
                      <View style={{
                        width: 100 + '%', height: 25, flexDirection: 'column', justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: this.getBackgroundColor(tableNo.IsOccupied, tableNo.OrderDetails, tableNo.IsCheckedout, tableNo.TableID)
                      }}>
                        <Text style={{ color: 'black', fontSize:tableNo.IsMergedTable?this.getFontSize(12):this.getFontSize(17), fontFamily: 'Avenir-Book', fontWeight: 'bold' }}>Table : {tableNo.IsMergedTable?(tableNo.OrderDetails?tableNo.OrderDetails.ChildTablesName.join(","):tableNo.TableName):tableNo.TableName}</Text>
                      </View>
                      <View style={{ width: 100 + '%', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 2 }}>
                        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: 100 + '%' }}>
                          <Text style={{ color: 'black', fontSize: this.getFontSize(17), fontFamily: 'Avenir-Book', fontWeight: 'bold' }}>Capacity: {tableNo.Capacity}</Text>
                        </View>
                      </View>
                      {(tableNo.OrderDetails !== null && tableNo.IsOccupied && tableNo.OrderDetails.customer) &&
                        <View style={{
                          width: 100 + '%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
                          alignContent: 'flex-start', alignSelf: 'flex-start'
                        }}>
                          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: 100 + '%', marginLeft: -5 }}>
                            <Text style={{ color: 'black', fontSize: this.getFontSize(17), fontFamily: 'Avenir-Book', fontWeight: 'bold' }}> Name:
                          {tableNo.OrderDetails.customer.CustomerName}
                            </Text>
                          </View>
                          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: 100 + '%' }}>
                            <Text style={{ color: 'black', fontSize: this.getFontSize(17), fontFamily: 'Avenir-Book', fontWeight: 'bold' }}>Mobile No:
                           {tableNo.OrderDetails.customer.CustomerID}
                            </Text>
                          </View>
                          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: 100 + '%' }}>
                            <Text style={{ color: 'black', fontSize: this.getFontSize(17), fontFamily: 'Avenir-Book', fontWeight: 'bold' }}>Billed Amount:
                          {tableNo.OrderDetails.TotalPrice}
                            </Text>
                          </View>
                        </View>}
                      {(tableNo.Customer !== null && tableNo.IsOccupied === true) &&
                        <View style={{
                          width: 100 + '%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
                          alignContent: 'flex-start', alignSelf: 'flex-start'
                        }}>
                          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: 100 + '%', marginBottom: 10, marginLeft: -5 }}>
                            <Text style={{ color: 'black', fontSize: this.getFontSize(17), fontFamily: 'Avenir-Book', fontWeight: 'bold' }}> Name:
                          {tableNo.Customer.CustomerName}
                            </Text>
                          </View>
                          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: 100 + '%' }}>
                            <Text style={{ color: 'black', fontSize: this.getFontSize(17), fontFamily: 'Avenir-Book', fontWeight: 'bold' }}>Mobile No:
                           {tableNo.Customer.CustomerID}
                            </Text>
                          </View>
                        </View>}
                    </View>
                  </TouchableOpacity>
                  {this.getBackgroundColor(tableNo.IsOccupied, tableNo.OrderDetails, tableNo.IsCheckedout, '') === '#FDFF00' &&
                    <TouchableOpacity style={{
                      width: 100 + '%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'baseline',
                      alignContent: 'flex-start', alignSelf: 'flex-start', backgroundColor: defaultColor, height: 40,
                      borderWidth: 3, borderColor: '#fff'
                    }} onPress={this.releaseTable.bind(this, tableNo.TableID,tableNo.OrderDetails)}>
                      <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: this.getFontSize(25), color: '#fff' }}>Release Table</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <Icon1 name="remove" style={{ fontSize: this.getFontSize(30), color: '#fff' }}> </Icon1>
                      </View>
                    </TouchableOpacity>}
                    {this.getBackgroundColor(tableNo.IsOccupied, tableNo.OrderDetails, tableNo.IsCheckedout, '') === 'green' && tableNo.OrderDetails &&
                    <TouchableOpacity style={{
                      width: 100 + '%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'baseline',
                      alignContent: 'flex-start', alignSelf: 'flex-start', backgroundColor: defaultColor, height: 40,
                      borderWidth: 3, borderColor: '#fff'
                    }} onPress={this.undoCheckout.bind(this,tableNo.TableID,tableNo.TableName,tableNo.OrderDetails.OrderID?tableNo.OrderDetails.OrderID:"")}>
                      <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: this.getFontSize(22), color: '#fff' }}>Undo Checkout</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <Icon name="undo-variant" style={{ fontSize: 25, color: '#fff' }}> </Icon>
                      </View>
                    </TouchableOpacity>}
                </Card>
              </View>
            )
          }
        })
      }
    }
    let floors = [];
    this.props.totalSection.forEach(element => {
      floors.push({
        value: element.m_Item2
      });
    });
    // 
    return (
      // <View style={{flex: 1, flexDirection: 'column', height: 85 + '%'}}>
<InteractionProvider  timeout={600 * 1000}  onActive={() => {}} onInactive={() => this.autodirectDashboard()}>
      <View style={{ width: 100 + '%', flexDirection: 'column', height: 100 + '%', justifyContent: 'flex-start' }} onLayout={this.onLayout.bind(this)}>
        {this.props.floorDetails.length === 0 && <View style={{
          height: 100 + '%', width: 100 + '%', position: 'absolute', zIndex: 100, backgroundColor: '#fff',
          justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center', opacity: 1
        }}>
          <ActivityIndicator size="large" color={'orange'} /></View>}
        <View style={{
          width: 100 + '%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          height: 90 + '%', borderWidth: 0.5, borderColor: 'black'
        }}>
          <View style={{
            backgroundColor: 'white', height: 100 + '%',
            width: 98 + '%', flexDirection: 'column', zIndex: 2, opacity: 0.8,
            justifyContent: 'flex-start', alignItems: 'flex-start', padding: this.getFontSize(20), marginTop: this.getFontSize(1 + '%')
          }}>
            <View style={{
              flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'flex-start',
              marginLeft: this.getFontSize(10), height: 10 + '%'
            }}>
              <View style={{ width: 18 + '%', justifyContent: 'flex-start' }}>
                <Text style={{ color: 'black', fontSize: this.getFontSize(25) }}>Select section</Text>
              </View>
              <View style={{ height: this.getFontSize(40), width: 18 + '%', justifyContent: 'flex-start',marginTop: -30 }}>
                <Dropdown style={{
                  borderColor: 'black', borderWidth: 0.3,
                  borderRadius: this.getFontSize(10), backgroundColor: '#fff', opacity: 1, height: this.getFontSize(40), borderRadius: 0,
                  borderColor: 'black', borderWidth: 1
                }} fontSize={this.getFontSize(25)} labelFontSize={0}
                  onChangeText={this.changeFloor.bind(this)} dropdownPosition={0} value={this.props.selectedSection.m_Item2}
                  data={floors} />
              </View>
              <View style={{ width: 15 + '%', justifyContent: 'flex-start', marginLeft: 2 + '%' }}>
                <Text style={{ color: 'black', fontSize: this.getFontSize(25) }}>No of guests</Text>
              </View>
              {/* this.props.isResOpen?this.props.noOfGuest: this.props.NoOfPerson */}
              <View style={{ width: 5 + '%', justifyContent: 'flex-start', borderWidth: 0.5, height: this.getFontSize(40) }}>
                <TextInput itemColor={defaultColor} keyboardType="numeric" editable={!this.props.isResOpen} value={this.props.isResOpen ? this.props.noOfGuest.toString() : this.props.NoOfPerson.toString()}
                  style={{
                    height: this.getFontSize(40), borderColor: 'black', borderWidth: 0.5, backgroundColor: '#fff', color: 'black',
                    opacity: 1, fontSize: this.getFontSize(20), paddingBottom: 5
                  }} onChangeText={(text) => this.changeField(text)} underlineColorAndroid='transparent' />
              </View>
              <View style={{ width: 16 + '%', justifyContent: 'flex-start',marginLeft: 1 + '%' }}>
                <TextInput itemColor={defaultColor} keyboardType="default"
                  style={{ height: this.getFontSize(40), borderColor: 'black', borderWidth: 1, borderRadius: this.getFontSize(20), backgroundColor: '#fff', opacity: 1, fontSize: this.getFontSize(20), paddingBottom: 5, color: 'black', }}
                  onChangeText={(text) => this.changeCard(text)} underlineColorAndroid='transparent' value={this.props.searchedVal} placeholder="Search table no" />
              </View>
              {!this.props.isResOpen && <View style={{ width: 20 + '%', justifyContent: 'flex-start', marginLeft: 1 + '%' }}>
              <TouchableOpacity style={{width: 100 + '%',flexDirection: 'column', justifyContent:'center'}} onPress={()=>this.mergetableClick()}>
                            {!this.props.mergeTable && <View style={{flexDirection: 'row'}}>                              
                              <Icon name="checkbox-blank-outline" style={{fontSize: 25,color: 'black'}}/>
                              <Text style={{fontSize:this.getFontSize(25), color: 'black'}}>Merge Table</Text>
                              </View>}
                                {this.props.mergeTable &&<View style={{flexDirection: 'row'}}>
                                  <Icon name="checkbox-marked"  style={{fontSize: 25,color: 'green'}}/>
                                  <Text style={{fontSize:this.getFontSize(25), color: 'black'}}>Merge Table</Text>
                                  </View>}
                                
              </TouchableOpacity>
              </View>}
              {this.props.isResOpen && <View style={{ width: 6 + '%', justifyContent: 'flex-start', marginLeft: 2 + '%' }}>
                <TouchableOpacity style={{ width: 45, height: 45 }} onPress={this.callUserModal.bind(this)}>
                  <Card style={{ width: this.getFontSize(40), height: this.getFontSize(40), borderRadius: this.getFontSize(45) }}><Icon1 name="user-circle"
                    style={{ fontSize: this.getFontSize(40), opacity: 2, zIndex: 6, color: this.props.isUserRegistered || this.props.isResOpen ? 'green' : defaultColor }}></Icon1>
                  </Card>
                </TouchableOpacity>
              </View>}
            </View>
            <View style={{ flex: 1, flexDirection: 'row', width: 100 + '%', height: 90 + '%', }}>
              <ScrollView style={{ height: 100 + '%', marginTop: 0, alignContent: 'center', }}>
                <View style={{
                  flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start',
                  paddingTop: 10, paddingBottom: 10
                }} >
                  {tableArray}
                </View>
              </ScrollView>
            </View>
          </View>
          {this.props.isUserModalVisible &&
            <Modal backdropColor="black" transparent={true} style={{
              borderRadius: 5, opacity: 0.8,
              alignContent: 'center', alignSelf: 'center', alignContent: 'center'
            }} visible={this.props.isUserModalVisible}
              onBackdropPress={this.exitUserModal.bind(this)} onRequestClose={this.exitUserModal.bind(this)}>
              <GuestScreen></GuestScreen>
            </Modal>}
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

        {this.props.showMergeModal && 
                <Modal backdropColor="black" transparent={true} 
                style={{ borderRadius: 5, opacity: 0.8,
                alignContent: 'center', alignSelf: 'center', alignContent: 'center'}}
                visible={this.props.showMergeModal} onBackdropPress={this.showmergetableModalClick.bind(this)}
                onRequestClose={this.showmergetableModalClick.bind(this)}
                >
                <MergeTableModal navigation={this.props.navigation}></MergeTableModal>
                </Modal>}
      </View>
      </InteractionProvider>
    )
  }

  mergetableClick(){
    if(this.props.mergeTable)
    this.props.dispatch({type:ReduxActions.SET_MERGE_TABLE,ismergeTable:false})
    else
    this.props.dispatch({type:ReduxActions.SET_MERGE_TABLE,ismergeTable:true})
  }

  showmergetableModalClick(){  
    if(this.props.showMergeModal)
    { 
    this.props.dispatch({type:ReduxActions.RESET_PARENT_TABLE});
    this.props.dispatch({type:ReduxActions.RESET_CHILD_TABLES});
    this.props.dispatch({type:ReduxActions.SHOW_MERGE_TABLE_MODAL,showMergeModal:false});
    this.props.dispatch({type:ReduxActions.SET_MERGE_TABLE,ismergeTable:false})
    this.props.dispatch({ type: SagaActions.UNBLOCK_TABLE, id:this.props.selectedtable.TableID });
    }
    else
    this.props.dispatch({type:ReduxActions.SHOW_MERGE_TABLE_MODAL,showMergeModal:true})
  }

  getBackgroundColor(isOccupied, orderDetails, isCheckedOut, tableID) {
    let bgColor;
    if (isOccupied === false)
      bgColor = 'grey';
    else if (isOccupied === true) {
      if (orderDetails !== null && isCheckedOut === false) {
        if (this.props.floorDetails[0].TableByCaptain.indexOf(tableID) > -1) {
          bgColor = '#ff9900';
        } 
         else if(!this.HasValidSuborder(orderDetails)){          
          bgColor = '#FDFF00';
        }
        else
          bgColor = 'red';
      }
      else if (isCheckedOut === true) bgColor = 'green';
      else
        bgColor = '#FDFF00';
    }
    return bgColor;
  }
  HasValidSuborder(orderDetails){  
    let isSubordersValid=false;
    let validSuborderCount=0;
    if(orderDetails && orderDetails.subOrder){ 
    orderDetails.subOrder.forEach(element => {
      if(element.Orders.length>0){
        validSuborderCount=validSuborderCount+1;
      }
    });
    if(validSuborderCount>0)
    isSubordersValid = true;
    else
    isSubordersValid = false;
  }
  else{
     isSubordersValid = false;
  }
    return isSubordersValid;
    }
}

  

const mapStateToProps = (state) => {
  return {
    floorDetails: state.floorReducer.floorList,
    selectedSection:state.floorReducer.selectedSection,
    totalSection: state.floorReducer.totalSection,
    selectedtable: state.floorReducer.selectedtable,
    NoOfPerson: state.tableReducer.NoOfPerson,
    isUserModalVisible: state.UserReducer.isUserModalVisible,
    isUserRegistered: state.UserReducer.isUserRegistered,
    searchedVal: state.tableReducer.searchedVal,
    searchedTables: state.tableReducer.searchedTables,
    isResOpen: state.navReducer.isResOpen,
    mobileNumder: state.ReservationReducer.mobileNumder,
    bookingName: state.ReservationReducer.bookingName,
    noOfGuest: state.ReservationReducer.noOfGuest,
    reservationID: state.ReservationReducer.ReservationID,
    isTableReservedSuccessfully: state.tableReducer.isTableReservedSuccessfully,
    allReservations: state.ReservationReducer.allReservations,
    reservedDateTime: state.ReservationReducer.dateTime,
    releasedSuccessfully: state.tableReducer.releasedSuccessfully,
    height: state.DashBoardReducer.height,
    width: state.DashBoardReducer.width,
    userID: state.DashBoardReducer.userID,
    isBookingFailed: state.tableReducer.isBookingFailed,
    connectionStatus: state.loginReducer.connectionStatus,
    RevisedStatus:state.tableReducer.RevisedStatus,
    CurrentStatus:state.tableReducer.CurrentStatus,
    navState:state.navReducer.navState,
    mergeTable:state.tableReducer.mergeTable,
    showMergeModal:state.tableReducer.showMergeModal,
    istableBlocked:state.tableReducer.IstableBlocked,
    ReleasingTable:state.tableReducer.ReleasingTable,
    ReleaseTableID:state.tableReducer.ReleaseTableID,
    ReleaseOrder:state.tableReducer.ReleaseOrder,
    TableStatus:state.tableReducer.tableStatus
  };
}

export default connect(mapStateToProps, null)(TableScreen)


 //   let isValidSelection=false;
        //   if(this.props.allReservations && this.props.reservedDateTime){
        //     this.props.allReservations.forEach((item)=>{
        //       
        //       if(item.TABLEID!==0 && this.props.reservationID !==item.ID && 
        //         Math.abs(moment(item.BOOKINGDATETIME).diff(moment(this.props.reservedDateTime), 'minutes'))<=60){
        //         isValidSelection =true;
        //       }
        //     })       
        //   }
        //   if(!isValidSelection){
        //   this.props.dispatch({ type: ReduxActions.SELECTED_TABLE, tableData });
        //   let objResrvTable = {
        //     "ID": this.props.reservationID,
        //     "TableID": tableData.TableID
        //   }
        //   this.props.dispatch({ type: SagaActions.SAVE_TABLE_RESERVATION, objResrvTable });
        // }
        // else{
        //   Toast.show({
        //     text: "Table already reserved for another guest.",
        //     textStyle: { fontSize: 25, fontFamily: 'Avenir-Black' },
        //     duration: 2000,
        //     position: "bottom",
        //     buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        //     buttonText: "Ok",
        //     type: "danger"
        //   });
        // }
        //}

            // this._panResponder = PanResponder.create({
      
    //   onStartShouldSetPanResponder: () => {
    //     this.resetTimer()
    //     return true
    //   },
    //   onMoveShouldSetPanResponder: () => true,
    //   onStartShouldSetPanResponderCapture: () => { this.resetTimer() ; return false},
    //   onMoveShouldSetPanResponderCapture: () => false,
    //   onPanResponderTerminationRequest: () => true,
    //   onShouldBlockNativeResponder: () => false,
    // });
    // if(this.props.navState=== "table"){
    // this.timer = setTimeout(()=>this.callFac(),300000);
    // }
  // resetTimer(){
  //   if(this.props.navState=== "table"){
  //   clearTimeout(this.timer);
  //   this.timer = 0;
  //   if(this.props.inactive)
  //   this.props.dispatch({type: ReduxActions.SET_TABLE_INACTIVITY_STATE, inactive: false});
  //   this.timer = setTimeout(()=>this.callFac(),300000)
  //   }
  // }
  // callFac() {
  //   if(this.props.navState=== "table"){
  //   this.props.dispatch({type: ReduxActions.SET_TABLE_INACTIVITY_STATE, inactive: true});
  //   this.props.dispatch({ type: ReduxActions.SET_NAV_STATE, navState: 'table' });
  //   this.autodirectDashboard();
  //   clearTimeout(this.timer);
  //   this.timer = 0;}
  // }