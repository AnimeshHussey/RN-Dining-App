import React from 'react';
import { Text, View, ScrollView, Image, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { Toast, Card } from 'native-base';
import { connect } from 'react-redux';
import ReduxActions from "../../Redux/ActionTypes/Action";
import SagaActions from "../../Sagas/ActionTypes/Action";
import __ from "lodash";
import comStyles, { supportingColor, defaultColor } from '../Styles/CommonStyles';
import { NavigationActions } from 'react-navigation';

class MergeTableModal extends React.Component {
  tableArray = [];
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
  componentWillMount() {
    this.props.dispatch({ type: SagaActions.GET_FLOOR_DETAILS, user: this.props.userID, section: this.props.selectedSection.m_Item1, Pricegroup: this.props.selectedSection.m_Item3 });
  }

  componentDidUpdate(prevProps, prevState) {
  if(prevProps.mergeTablesStatus !== this.props.mergeTablesStatus && this.props.mergeTablesStatus !=='' && this.props.mergeTablesStatus==='UNBLOCKED'){
    this.props.dispatch({type:SagaActions.BLOCK_TABLES,TableIds:this.props.childTables,LockOrCheck:true});
    this.props.dispatch({type:ReduxActions.RESET_MERGE_TABLES_STATUS});
  }
  else if(prevProps.mergeTablesStatus !== this.props.mergeTablesStatus && this.props.mergeTablesStatus !=='' && this.props.mergeTablesStatus==='BLOCKED'){
    Toast.show({
      text: 'Table already booked by another captain !',
      textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
      duration: 2000,
      buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
      buttonText: "Okay",
      type: "danger"
    });
  }
  if(prevProps.Block_UnblockAllTables !== this.props.Block_UnblockAllTables && this.props.Block_UnblockAllTables !=='' && this.props.Block_UnblockAllTables==='BLOCKED'){
    let tables = [...this.props.childTables];
    tables.push(this.props.masterTableID);
    this.props.dispatch({ type: SagaActions.BOOK_TABLES, childTables: tables });
    this.props.dispatch({type:ReduxActions.RESET_BLOCK_TABLES});
  }
  else if(prevProps.Block_UnblockAllTables !== this.props.Block_UnblockAllTables && this.props.Block_UnblockAllTables !=='' && this.props.Block_UnblockAllTables==='FAILED_TO_BLOCK'){
    Toast.show({
      text: 'Unable to block the selected tables.',
      textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
      duration: 2000,
      buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
      buttonText: "Okay",
      type: "danger"
    });
  }
  if (prevProps.IstablesBooked !== this.props.IstablesBooked && this.props.IstablesBooked) {
      const resetAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: "OrderStack" })
        ]
      });
      this.props.navigation.dispatch(resetAction);
      this.props.dispatch({ type: ReduxActions.SET_NAV_STATE, navState: 'menu' });
      this.props.dispatch({ type: ReduxActions.FAILED_TO_BOOK_TABLES });
    }
    else if (prevProps.IstablesBooked !== this.props.IstablesBooked && !this.props.IstablesBooked){
      Toast.show({
        text: 'Unable to occupy the selected tables.',
        textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
        duration: 2000,
        buttonTextStyle: { fontSize: 20, fontFamily: 'Avenir-Black' },
        buttonText: "Okay",
        type: "danger"
      });
    }
  }

  bookTable() {
    if (this.props.childTables.length > 0) {
      // let tables = [...this.props.childTables];
      // tables.push(this.props.masterTableID);
      this.props.dispatch({type:SagaActions.BLOCK_TABLES,TableIds:this.props.childTables,LockOrCheck:false});
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
    }
  }

  componentWillUnmount() {
    this.props.dispatch({type:ReduxActions.SET_MERGE_TABLE,ismergeTable:false});
    this.props.dispatch({ type: SagaActions.GET_FLOOR_DETAILS, user: this.props.userID, section: this.props.selectedSection.m_Item1, Pricegroup: this.props.selectedSection.m_Item3 });
  }

  fillTable(tableID,tblName) {
    let tableDetails = [...this.props.floorDetails];
    tableDetails[0].Tables.forEach(item => {
      if (item.TableID === tableID) {
        let childTables = [...this.props.childTables];
        let childTableNames = [...this.props.childTablesName];
        if (!childTables.includes(tableID)) {
          childTables.push(tableID);
          childTableNames.push(tblName);
        } else {
          childTables = childTables.filter(function (ele) {
            return ele != tableID;
          });
          childTableNames= childTableNames.filter(function (ele) {
            return ele != tblName;
          });
        }
        this.props.dispatch({ type: ReduxActions.SET_CHILD_TABLES, tables: childTables,childTables: childTableNames})
      }
    });
    //this.props.dispatch({ type: ReduxActions.FLOOR_DETAILS, response: tableDetails });
  }
 
  getBackgroundColor(isOccupied, orderDetails, isCheckedOut) {
    let bgColor;
    if (isOccupied === false)
      bgColor = 'green';
    else if (isOccupied === true) {
      if (orderDetails !== null && isCheckedOut === false)
        bgColor = 'red';
      else if (isCheckedOut === true) bgColor = 'blue';
      else
        bgColor = 'orange';
    }
    return bgColor;
  }
  render() {    
    let tableArray = [];
    if (this.props.floorDetails.length > 0) {
      this.props.floorDetails[0].Tables.map((tableNo, index) => {
        if (!tableNo.IsOccupied && tableNo.TableID !== this.props.masterTableID) {
          tableArray.push(
            <Card key={index} style={{ flexDirection: 'column', backgroundColor: '#fff' }}>
              <TouchableOpacity onPress={this.fillTable.bind(this, tableNo.TableID,tableNo.TableName)}
                style={{
                  backgroundColor: '#fff', opacity: 1, padding: 5, height: Math.min(this.props.width, this.props.height) / 10.5,
                  width: Math.max(this.props.width, this.props.height) * (0.2), shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8, shadowRadius: 2
                }}>
                <View containerStyle={[comStyles.backgroundStyle, comStyles.colContainer]}>
                  <View style={{
                    width: 100 + '%', height: this.getFontSize(25), flexDirection: 'row', justifyContent: 'space-around',
                    alignItems: 'center', backgroundColor: '#9E9E9'
                  }}>
                    {/* <Icon name="md-checkmark-circle-outline" style={{ fontSize: this.getFontSize(25) }} color={tableNo.IsMergedTable?'#23C768':'#C8C9CA' }></Icon> */}
                    <Text style={comStyles.smBlueTxtStyle}>Table : {tableNo.TableName}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Card>
          )
        }
      })
    }
    return (
      <Card style={{ width: this.props.width * 0.8, height: this.props.height * 0.6 }} onLayout={this.onLayout.bind(this)}>
        <View style={{ width: this.props.width * 0.8, flexDirection: 'column', height: this.props.height * 0.6, justifyContent: 'flex-start' }}>
          {this.props.floorDetails.length === 0 && <View style={{
            flexDirection: 'row', height: 100 + '%', width: 100 + '%', position: 'absolute', zIndex: 100, backgroundColor: '#fff',
            justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center', opacity: 1
          }}>
            <ActivityIndicator size="large" color={'orange'} /></View>}
          <View style={{
            backgroundColor: defaultColor,
            width: 100 + '%', height: 15 + '%', flexDirection: 'row', zIndex: 2, opacity: 1,
            justifyContent: 'center', alignItems: 'center', padding: this.getFontSize(20)
          }}>
            <View style={{ flex: 1, justifyContent: 'center',alignContent:'center',alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: this.getFontSize(25) }}>Master table: {this.props.masterTableName}</Text>
            </View>
            <View style={{ flex: 1,justifyContent: 'center',alignContent:'center',alignItems: 'center'  }}>
              <Text style={{ color: '#fff', fontSize: this.getFontSize(18) }}>Selected table: {this.props.childTablesName?this.props.childTablesName.join(","):""}</Text>
            </View>
          </View>
          <View style={{
            backgroundColor: supportingColor,
            width: 100 + '%', height: 85 + '%', flexDirection: 'column', zIndex: 2, opacity: 1,
            justifyContent: 'center', alignItems: 'center', padding: this.getFontSize(20)
          }}>
            <View style={{ width: 100 + '%', height: 80 + '%' }}>
              <ScrollView style={{ height: 80 + '%', marginTop: 0, alignContent: 'center', }}>
                <View style={{
                  flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start',
                  paddingTop: 10, paddingBottom: 10
                }} >
                  {tableArray}
                </View>
              </ScrollView>
            </View>
            {!__.isEmpty(this.props.childTables) &&
            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', alignContent: 'flex-end', alignSelf: 'flex-end' }}>
              <TouchableOpacity onPress={this.bookTable.bind(this)} style={{ width: this.getFontSize(150), height: this.getFontSize(60), borderRadius: this.getFontSize(60), flexDirection: 'row', backgroundColor: defaultColor, padding: 5, alignContent: 'center', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                {/* <Card style={{borderRadius: this.getFontSize(50), backgroundColor: '#fff', width:this.getFontSize(50), height: this.getFontSize(50)}}> */}
                {/* <Icon name='ios-arrow-dropright' style={{ fontSize: this.getFontSize(60), color: 'black', fontWeight: 'bold'}}></Icon> */}
                <Text style={{ fontSize: this.getFontSize(25), color: '#fff' }}>Proceed</Text>
                {/* </Card> */}
              </TouchableOpacity>
            </View>}
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
    NoOfPerson: state.tableReducer.NoOfPersonSwap,
    searchedVal: state.tableReducer.searchedVal,
    searchedTables: state.tableReducer.searchedTables,
    orderNumber: state.menuReducer.orderNumber,
    subOrderNumber: state.reviewReducer.subOrderNumber,
    height: state.DashBoardReducer.height,
    width: state.DashBoardReducer.width,
    selectedSection: state.floorReducer.selectedSection,
    userID: state.DashBoardReducer.userID,
    mergeTable: state.tableReducer.mergeTable,
    masterTableID: state.tableReducer.masterTableID,
    childTables: state.tableReducer.childTables,
    IstablesBooked: state.tableReducer.IstablesBooked,
    masterTableName:state.tableReducer.masterTableName,
    childTablesName:state.tableReducer.childTablesName,
    mergeTablesStatus:state.tableReducer.mergeTablesStatus,
    Block_UnblockAllTables:state.tableReducer.Block_UnblockAllTables
  }
}

export default connect(mapStateToProps, null)(MergeTableModal)