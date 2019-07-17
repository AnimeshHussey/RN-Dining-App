import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ActivityIndicator, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Toast, Card, Label } from 'native-base';
import { connect } from 'react-redux';
import ReduxActions from "../../Redux/ActionTypes/Action";
import SagaActions from "../../Sagas/ActionTypes/Action";
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-material-dropdown';
import comStyles, { orderColor, customerIconColor, defaultColor, supportingColor } from '../Styles/CommonStyles';

class SwapModal extends React.Component{
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
    componentWillMount(){
      this.props.dispatch({ type: SagaActions.GET_FLOOR_DETAILS,user: this.props.userID, section: this.props.selectedSection.m_Item1,Pricegroup:this.props.selectedSection.m_Item3 });
      //this.props.dispatch({ type: ReduxActions.SET_NOOFPERSON, noofperson:0 });
    }
    
    componentWillUnmount(){
        this.props.dispatch({ type: SagaActions.GET_ORDER_DETAILS, OrderID: this.props.orderNumber});
    }

  componentDidUpdate(prevProps, prevState) {
    // if(prevProps.TableStatus!==this.props.TableStatus && prevProps.TableStatus ==='' && this.props.TableStatus==="UNBLOCKED")
    if(this.props.TableStatus==="UNBLOCKED")
    { 
      this.proceedTableSelection();
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
      this.props.dispatch({ type: ReduxActions.RESET_SELECTED_TABLE }); 
      this.props.dispatch({ type: SagaActions.GET_FLOOR_DETAILS, user: this.props.userID, section: this.props.selectedSection.m_Item1,Pricegroup:this.props.selectedSection.m_Item3 });
      this.props.dispatch({ type: ReduxActions.RESET_TABLE_BLOCK_STATUS });
    }
      // if(prevProps.istableBlocked!==this.props.istableBlocked && prevProps.istableBlocked ==='' && this.props.istableBlocked==="BLOCKED"){
      //   this.proceedTableSelection();
      //   this.props.dispatch({ type: ReduxActions.RESET_BOLCKING_STATUS }); 
      // }
      // else if(prevProps.istableBlocked!==this.props.istableBlocked && 
      //   prevProps.istableBlocked ==='' && this.props.istableBlocked==="FAILED_TO_BLOCK"){        
      //   Toast.show({
      //       text: 'Someone is taking order for this table.',
      //       textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
      //       duration: 3000,
      //       buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
      //       buttonText: "Okay",
      //       type: "danger"
      //     });      
      //   this.props.dispatch({ type: ReduxActions.RESET_SELECTED_TABLE }); 
      //   this.props.dispatch({ type: SagaActions.GET_FLOOR_DETAILS, user: this.props.userID, section: this.props.selectedSection.m_Item1,Pricegroup:this.props.selectedSection.m_Item3 });
      //   this.props.dispatch({ type: ReduxActions.RESET_BOLCKING_STATUS }); 
      // }
    }

    proceedTableSelection(){
      if(this.props.selectedSwapTable.NoOfPersons!==null || this.props.NoOfPerson>0||this.props.selectedSwapTable.OrderDetails!==null ){
        let obj={
        "CurrOrderID": this.props.orderNumber,
        "ChangedOrderID": this.props.selectedSwapTable.OrderDetails===null?"":this.props.selectedSwapTable.OrderDetails.OrderID,
        "CancelOnly": false,
        "TargetTableID": this.props.selectedSwapTable.TableID,
        "Suborder": this.props.subOrderNumber,
        "CustID": this.props.selectedSwapTable.OrderDetails===null?(this.props.selectedSwapTable.Customer?this.props.selectedSwapTable.Customer.CustomerID:0):0,
        "CustName": this.props.selectedSwapTable.OrderDetails===null?(this.props.selectedSwapTable.Customer?this.props.selectedSwapTable.Customer.CustomerName:""):"",
        "OrderExists": this.props.selectedSwapTable.OrderDetails===null?false:true,
        "NoOfPersons": this.props.selectedSwapTable.OrderDetails!==null?this.props.selectedSwapTable.OrderDetails.noofPerson:this.props.selectedSwapTable.NoOfPersons!==null?this.props.selectedSwapTable.NoOfPersons:this.props.NoOfPerson,
        "TargetChildTables":Array.from([this.props.selectedSwapTable.TableID]),
        "ChangedPriceGroup": this.selectedsection_priceGr(),
        "CaptainNumber":this.props.userID
      }

    this.props.dispatch({type: SagaActions.SWAP_SUBORDER, obj: obj})
    this.props.dispatch({ type: SagaActions.UNBLOCK_TABLE, id:this.props.selectedSwapTable.TableID });
    } 
    else{
        Toast.show({
            text: 'Please enter the number of guests.',
            textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
            duration: 2000,
            buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
            buttonText: "Okay",
            type: "danger"
        });
    }
    }

    fillTable(table){
      if(this.props.selectedtable.TableID !== table.TableID)  {
        if(table.IsOccupied==false && !table.OrderDetails && this.props.NoOfPerson===0)
        {
          Toast.show({
            text: 'Please enter the number of guests.',
            textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
            duration: 2000,
            buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
            buttonText: "Okay",
            type: "danger"
        });
        }      
        else{
          this.props.dispatch({ type: SagaActions.BLOCK_TABLE, id:table.TableID,LockOrCheck:false }); 
          this.props.dispatch({ type: ReduxActions.SELECTED_SWAP_TABLE, SelectedtableData:table }); 
        }
      }
      else{
        Toast.show({
          text: 'You are currently sitting on this table. Please kindly select different one.',
          textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
          duration: 2000,
          buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
          buttonText: "Okay",
          type: "danger"
      });
      }
    }

    selectedsection_priceGr(){
      let prGr="";
      this.props.totalSection.forEach(element => {
        if(this.props.selectedSection.m_Item2 === element.m_Item2){
          prGr= element.m_Item3;
        }
      });
      return prGr;
    }

    changeFloor(val) {
      this.props.totalSection.forEach(element => {
        if(val === element.m_Item2){
          this.props.dispatch({ type:ReduxActions.SET_SELECTED_SECTION, section:element }); 
          this.props.dispatch({ type: SagaActions.GET_FLOOR_DETAILS, user: this.props.userID, section: element.m_Item1,Pricegroup:element.m_Item3 });
          this.props.dispatch({type: SagaActions.GET_MENU_ITEMS,Pricegroup:element.m_Item3}); 
        }
      });
    }
      changeField(noofperson) {
          this.props.dispatch({ type: ReduxActions.SET_SWAP_NOOFPERSON, noofperson });
      }
      changeCard(value) {
        this.props.dispatch({ type: ReduxActions.SET_SEARCH_VALUE, searchedVal: value })
        if(value!==''){
          let searchedArray = [];
          searchedArray = this.props.floorDetails[0].Tables.filter(element => element.TableName.toLowerCase().includes(value.toLowerCase()));
          if(searchedArray.length>0)
           {
            this.props.dispatch({ type: ReduxActions.SET_SEARCH_RESULTS, searchedArr: searchedArray })
          }  
        }  
        else{
          this.props.dispatch({ type: ReduxActions.SET_SEARCH_VALUE, searchedVal: null })
          this.props.dispatch({ type: ReduxActions.SET_SEARCH_RESULTS, searchedArr: this.props.floorDetails[0].Tables})
        }
      }
      getBackgroundColor(isOccupied, orderDetails, isCheckedOut) {
        let bgColor;
        if(isOccupied === false)
        bgColor = 'grey';
        else if(isOccupied === true){
          if(orderDetails !== null && isCheckedOut===false)
            bgColor = 'red';
          else if(isCheckedOut === true)bgColor = 'green';
          else 
            bgColor = 'orange';
        }
        return bgColor;
      }
    render(){
        let tableArray=[];
        if (this.props.floorDetails.length > 0) {
            if (this.props.searchedVal && this.props.searchedTables.length > 0) {
              this.props.searchedTables.map((tableNo,index) => {
                //if(tableNo.IsOccupied && tableNo.IsCheckedout===false){
                  tableArray.push(
                    //   <Card>
                    // <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                      <Card key={index}>
                        <TouchableOpacity onPress={this.fillTable.bind(this, tableNo)}
                          style={{backgroundColor: '#fff',opacity: 1,padding: 5, height: Math.min(this.props.width, this.props.height)/4.5,
                          width: Math.max(this.props.width, this.props.height)*(2/9), shadowColor: '#000',shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,shadowRadius: 2}}>
                          <View containerStyle={[comStyles.backgroundStyle, comStyles.colContainer]}>
                            <View style={{
                              width: 100 + '%', height: 25, flexDirection: 'column', justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: this.getBackgroundColor(tableNo.IsOccupied, tableNo.OrderDetails,tableNo.IsCheckedout)
                            }}>
                              <Text style={comStyles.smWhiteTxtStyle}>Table : {tableNo.TableName}</Text>
                            </View>
                            <View style={{ width: 100 + '%', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                              <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: 50 + '%' }}>
                                <Text style={comStyles.tableTxtStyle}>Capacity: {tableNo.Capacity}</Text>
                              </View>
                              <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: 45 + '%' }}>
                                <Icon name="md-checkmark-circle-outline" style={{ fontSize: 45 }} color={this.props.selectedtable.TableID === tableNo.TableID ? '#23C768' : '#C8C9CA'}></Icon>
                              </View>
                            </View>
                            {(tableNo.OrderDetails!==null && tableNo.IsOccupied && tableNo.OrderDetails.customer) && <View style={{
                              width: 100 + '%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
                              alignContent: 'flex-start', alignSelf: 'flex-start'
                            }}>
                              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: 100 + '%', marginBottom: 10, marginLeft:-5 }}>
                                <Text style={comStyles.tableTxtStyle}> Name:
                               {tableNo.OrderDetails.customer.CustomerName}
                                </Text>
                              </View>
                              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: 100 + '%' }}>
                                <Text style={comStyles.tableTxtStyle}>Mobile No:
                               {tableNo.OrderDetails.customer.CustomerID}
                                </Text>
                              </View>
                            </View>}
                          </View>
                        </TouchableOpacity>
                      </Card>
                    // </View>
                    //</Card>
                  )
              })
            }
            else if(this.props.searchedVal && this.props.searchedTables.length === 0){
              tableArray.push(
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Label>Table you searched for is not on this floor. Please try other floors.</Label>
                </View>
              )
            }
            else {
              this.props.floorDetails[0].Tables.map((tableNo,index) => {
                  if(!tableNo.IsCheckedout){
                      tableArray.push(
                    // <Card>
                    // <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    // <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Card key={index} style={{flexDirection: 'column', backgroundColor: '#fff'}}>
                      <TouchableOpacity onPress={this.fillTable.bind(this, tableNo)}
                        style={{backgroundColor: '#fff',opacity: 1,padding: 5, height: Math.min(this.props.width, this.props.height)/4.5,
                        width: Math.max(this.props.width, this.props.height)*(0.25), shadowColor: '#000',shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.8,shadowRadius: 2}}>
                        <View containerStyle={[comStyles.backgroundStyle, comStyles.colContainer]}>
                          <View style={{
                            width: 100 + '%', height: this.getFontSize(25), flexDirection: 'column', justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: this.getBackgroundColor(tableNo.IsOccupied, tableNo.OrderDetails,tableNo.IsCheckedout)
                          }}>
                            <Text style={comStyles.smWhiteTxtStyle}>Table : {tableNo.TableName}</Text>
                          </View>
                          <View style={{ width: 100 + '%', flexDirection: 'row', justifyContent: 'space-between', paddingTop: this.getFontSize(10) }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: 50 + '%' }}>
                              <Text style={{ fontSize: this.getFontSize(20),fontWeight: 'bold',color: '#42484C',justifyContent: 'flex-start'}}>Capacity: {tableNo.Capacity}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: 45 + '%' }}>
                              <Icon name="md-checkmark-circle-outline" style={{ fontSize: this.getFontSize(45) }} color={this.props.selectedtable.TableID === tableNo.TableID ? '#23C768' : '#C8C9CA'}></Icon>
                            </View>
                          </View>
                          {(tableNo.OrderDetails!==null && tableNo.IsOccupied && tableNo.OrderDetails.customer) && 
                          <View style={{
                            width: 100 + '%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
                            alignContent: 'flex-start', alignSelf: 'flex-start'
                            }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: 100 + '%', marginBottom: 10, marginLeft:-5 }}>
                              <Text style={{ fontSize: this.getFontSize(20),fontWeight: 'bold',color: '#42484C',justifyContent: 'flex-start'}}> Name:
                              {tableNo.OrderDetails.customer.CustomerName} 
                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: 100 + '%' }}>
                              <Text style={{ fontSize: this.getFontSize(20),fontWeight: 'bold',color: '#42484C',justifyContent: 'flex-start'}}>Mobile No:
                               {tableNo.OrderDetails.customer.CustomerID}
                              </Text>
                            </View>
                          </View>}
                          {(tableNo.Customer!==null && tableNo.IsOccupied===true) && 
                          <View style={{
                            width: 100 + '%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
                            alignContent: 'flex-start', alignSelf: 'flex-start'
                            }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: 100 + '%', marginBottom: 10, marginLeft:-5 }}>
                              <Text style={{ fontSize: this.getFontSize(20),fontWeight: 'bold',color: '#42484C',justifyContent: 'flex-start'}}> Name:
                              {tableNo.Customer.CustomerName} 
                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: 100 + '%' }}>
                              <Text style={{ fontSize: this.getFontSize(20),fontWeight: 'bold',color: '#42484C',justifyContent: 'flex-start'}}>Mobile No:
                               {tableNo.Customer.CustomerID}
                              </Text>
                            </View>
                          </View>}
                        </View>
                      </TouchableOpacity>
                    </Card>
                  // </View>
                  )}
              })
            }
          }
    let floors = [];
    this.props.totalSection.forEach(element => {
      floors.push({
        value: element.m_Item2
      });
    });
    return(
      <Card style={{ width: 100 + '%', height: 100 + '%'}}  onLayout={this.onLayout.bind(this)}>
        <View style={{ width: 100 + '%', flexDirection: 'column', height: 100 + '%', justifyContent: 'flex-start' }}>
      {this.props.floorDetails.length === 0 && <View style={{height: 100 + '%', width: 100 + '%',position: 'absolute', zIndex: 100, backgroundColor:'#fff',
        justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center', opacity: 1}}>
        <ActivityIndicator size="large" color={'orange'} /></View>}
        {/* <View style={{
          width: 100 + '%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          height: 100 + '%', borderWidth: 0.5, borderColor: 'black'
        }}> */}
          <View style={{
            backgroundColor: supportingColor,
            width: 98 + '%',height: 100 + '%', flexDirection: 'column', zIndex: 2, opacity: 1,
            justifyContent: 'center', alignItems: 'center', padding: this.getFontSize(20), marginTop: 1 + '%'
          }}>
            <View style={{ width: 100+ '%', height: 10 + '%', flexDirection: 'row', justifyContent: 'flex-start',  alignItems: 'baseline', alignSelf: 'baseline', marginLeft:  this.getFontSize(10) }}>
              <View style={{ width: 18 + '%', justifyContent: 'center', alignContent: 'center', alignItems: 'baseline', alignSelf: 'baseline' }}>
                <Text style={{ color: 'black', fontSize:  this.getFontSize(20) }}>Select section</Text>
              </View>
              <View style={{ height: this.getFontSize(40), width: 23 + '%', justifyContent: 'flex-start', marginTop: -30 }}>
                <Dropdown style={{
                  borderColor: 'black', borderWidth: 0.3,
                  borderRadius: 10, backgroundColor: '#fff', opacity: 1, height: this.getFontSize(40), borderRadius: 0,
                  borderColor: 'black', borderWidth: 1
                }} fontSize={this.getFontSize(25)} labelFontSize={0}
                  onChangeText={this.changeFloor.bind(this)} dropdownPosition={0} value={this.props.selectedSection.m_Item2}
                  data={floors} />
              </View>
              <View style={{ width: 16 + '%', justifyContent: 'center', marginLeft: 2 + '%', alignContent: 'center', alignItems: 'baseline', alignSelf: 'baseline' }}>
                <Text style={{ color: 'black', fontSize:  this.getFontSize(20) }}>No of guests</Text>
              </View>
              {/* this.props.isResOpen?this.props.noOfGuest: this.props.NoOfPerson */}
              <View style={{ width: 10 + '%', justifyContent: 'flex-start', borderWidth: 0.5, height: this.getFontSize(40) }}>
                <TextInput itemColor={defaultColor} keyboardType="numeric" editable={true} value={this.props.NoOfPerson.toString()}
                  style={{
                    height: this.getFontSize(40), borderColor: 'black', borderWidth: 0.5, backgroundColor: '#fff', color: 'black',
                    opacity: 1, fontSize:  this.getFontSize(20), paddingBottom: 5
                  }} onChangeText={(text) => this.changeField(text)} underlineColorAndroid='transparent' />
              </View>
              <View style={{ width: 23 + '%', justifyContent: 'flex-start', marginLeft: 2 + '%' }}>
                <TextInput itemColor={defaultColor} keyboardType="default"
                  style={{ height: this.getFontSize(40), borderColor: 'black', borderWidth: 1, borderRadius: 20, backgroundColor: '#fff', opacity: 1, fontSize:  this.getFontSize(20), paddingBottom: 5, color: 'black', }}
                  onChangeText={(text) => this.changeCard(text)} underlineColorAndroid='transparent' placeholder="Search table no" value={this.props.searchedVal} />
              </View>
            </View>
            <View style={{width: 100 + '%', height: 80 + '%'}}>
              <ScrollView style={{ height: 80 + '%', marginTop: 0, alignContent: 'center', }}>
                <View style={{
                  flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start',
                  paddingTop: 10, paddingBottom: 10
                }} >
                  {tableArray}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
        
      {/* </View> */}
      </Card>
    )
}
}
const mapStateToProps = (state) => {
    return {
        floorDetails: state.floorReducer.floorList,
        totalSection: state.floorReducer.totalSection,
        selectedtable: state.floorReducer.selectedtable,
        selectedSwapTable: state.floorReducer.selectedSwapTable,
        NoOfPerson: state.tableReducer.NoOfPersonSwap,
        searchedVal: state.tableReducer.searchedVal,
        searchedTables: state.tableReducer.searchedTables,
        orderNumber: state.menuReducer.orderNumber,
        subOrderNumber: state.reviewReducer.subOrderNumber,
        height: state.DashBoardReducer.height,
        width: state.DashBoardReducer.width,
        selectedSection:state.floorReducer.selectedSection,
        userID: state.DashBoardReducer.userID,
        selectedSection:state.floorReducer.selectedSection,
        TableStatus:state.tableReducer.tableStatus,
        swap: state.reviewReducer.swap,
    }
}

export default connect(mapStateToProps, null)(SwapModal)