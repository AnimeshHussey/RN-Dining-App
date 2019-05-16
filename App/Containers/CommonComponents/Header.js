import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import ReduxActions from "../../Redux/ActionTypes/Action";
import { connect } from 'react-redux';
import {defaultColor} from '../Styles/CommonStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';

class Header extends Component {
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
  render() {
    return (
        <View style={{
            width: 100 + '%',flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignSelf: 'center',
            height: (this.props.navState === 'menu')? 8 + '%': 10 + '%', borderWidth: 0.5, borderColor: '#fff', backgroundColor: defaultColor,
             paddingLeft: (this.props.navState === 'menu')? 2 + '%': 0.2+ '%',
            paddingRight:(this.props.navState === 'menu')?  2 + '%': 0.2+ '%'
          }} onLayout={this.onLayout.bind(this)}>
                  {this.props.navState === 'menu' && <View style={{width: 35 + '%',flexDirection: 'row', justifyContent: 'center',  alignContent: 'center', alignSelf: 'center', alignItems:'center',height: 100 + '%'}}>
                    <Text style={{ color: '#fff', fontSize:  this.getFontSize(25) }}>Table: </Text>
                    <Text>{" "}</Text>
                    <Text style={{ color: '#fff', fontSize:  this.getFontSize(25) }}>{this.props.childTablesName.length>0?(this.props.orderNumber?this.props.childTablesName.join(","):this.props.masterTableName+','+this.props.childTablesName.join(",")):this.props.masterTableName}</Text>
                  </View>}
                  {this.props.navState === 'menu' && <View style={{width: 35 + '%',flexDirection: 'row',justifyContent: 'center',  alignContent: 'center', alignSelf: 'center', alignItems:'center', height: 100 + '%'}}>
                    <Text style={{ color: '#fff', fontSize:  this.getFontSize(25) }}>No of guests: </Text>
                    <Text>{" "}</Text>
                    <Text style={{ color: '#fff', fontSize:  this.getFontSize(25) }}>{this.props.noofperson}</Text>
                  </View>}
                  {this.props.navState === 'menu' && <View style={{ width: 15 + '%',flexDirection: 'row',alignContent: 'center', alignSelf: 'center', alignItems:'center',  justifyContent:'center'}}>
                    <TouchableOpacity 
                    style={{ width:  100 + '%', height:  this.getFontSize(45), alignContent: 'center', alignSelf: 'center', alignItems:'center',  justifyContent:'center' }}
                     onPress={this.callSearch.bind(this)}>
                      <Icon2 name="ios-search"
                        style={{ fontSize:  this.getFontSize(39), opacity: 2, zIndex: 6, color: '#fff' }}></Icon2>
                    </TouchableOpacity>
                  </View>} 
                  {this.props.navState === 'menu' && <View style={{ width: 15 + '%',flexDirection: 'row', alignContent: 'center', alignSelf: 'center', alignItems:'center', justifyContent:'center'}}>
                  <TouchableOpacity 
                    style={{ width:  100 + '%', height:  this.getFontSize(45), alignContent: 'center', alignSelf: 'center', alignItems:'center',  justifyContent:'center' }} onPress={this.callUserModal.bind(this)}>
                      <Icon1 name="user-circle"
                        style={{ fontSize:  this.getFontSize(39), opacity: 2, zIndex: 6, color:  (this.props.CustomerName!=="" && this.props.isButtonClicked) ? 'green' : "#fff" }}></Icon1>   
                    </TouchableOpacity>
                  </View>}
                  {this.props.navState !== 'menu' &&<View style={{width: 25 + '%',flexDirection: 'column', justifyContent: 'center',
                     alignContent: 'center', alignSelf: 'center', alignItems:'center',height: 100 + '%'}}>
                      <View style={{width: 100 + '%',flexDirection: 'row', justifyContent: 'center',
                        alignContent: 'center', alignSelf: 'center', alignItems:'center',height: 50 + '%',
                        borderColor: '#fff', borderBottomWidth: 0.5}}>   
                        {/* <Text style={{ color: '#fff', fontSize: 20 }}>Selected Table: </Text> */}
                        <Icon name="clipboard-check-outline" style={{fontSize: this.getFontSize(25) , color: '#fff'}}/>
                        <Text>{"  "}</Text>
                        <Text style={{ color: '#fff', fontSize: this.getFontSize(20) }}>{this.props.childTablesName.length>0?(this.props.orderNumber?this.props.childTablesName.join(","):this.props.masterTableName+','+this.props.childTablesName.join(",")):this.props.masterTableName}</Text>
                      </View>
                      <View style={{width: 100 + '%',flexDirection: 'row', justifyContent: 'center',
                        alignContent: 'center', alignSelf: 'center', alignItems:'center',height: 50 + '%'}}>   
                        {/* <Text style={{ color: '#fff', fontSize: 20 }}>No of guests: </Text> */}
                        <Icon1 name="users" style={{fontSize: this.getFontSize(25), color: '#fff'}}/>
                        <Text>{"  "}</Text>
                        <Text style={{ color: '#fff', fontSize: this.getFontSize(20) }}>{this.props.noofperson}</Text>
                      </View>
                  </View>}
                  {this.props.navState !== 'menu' &&<View style={{width: 35 + '%',flexDirection: 'row',justifyContent: 'center', 
                   alignContent: 'center', alignSelf: 'center', alignItems:'center', height: 100 + '%'}}>
                    <Text style={{ color: '#fff', fontSize: this.getFontSize(20) }}> Order No: </Text>
                    <Text>{" "}</Text>
                    <Text style={{ color: '#fff', fontSize: this.getFontSize(20) }}>{this.props.orderNumber}</Text>
                  </View>}
                  {this.props.navState !== 'menu' && <View style={{width: 30 + '%',flexDirection: 'column', justifyContent: 'center',
                     alignContent: 'center', alignSelf: 'center', alignItems:'center',height: 100 + '%'}}>
                      <View style={{width: 100 + '%',flexDirection: 'row', justifyContent: 'center',
                        alignContent: 'center', alignSelf: 'center', alignItems:'center',height: 50 + '%',
                        borderColor: '#fff', borderBottomWidth: 0.5}}>   
                        {/* <Text style={{ color: '#fff', fontSize: 20 }}>Name: </Text> */}
                        <Icon1 name="user" style={{fontSize: this.getFontSize(25), color: '#fff'}}/>
                        <Text>{"  "}</Text>
                        <Text style={{ color: '#fff', fontSize: this.getFontSize(20) }}>{this.props.customer.CustomerName}</Text>
                      </View>
                      <View style={{width: 100 + '%',flexDirection: 'row', justifyContent: 'center',
                        alignContent: 'center', alignSelf: 'center', alignItems:'center',height: 50 + '%'}}>   
                        {/* <Text style={{ color: '#fff', fontSize: 20 }}>Mobile No: </Text> */}
                        <Icon1 name="phone" style={{fontSize: this.getFontSize(25), color: '#fff'}}/>
                        <Text>{"  "}</Text>
                        <Text style={{ color: '#fff', fontSize: this.getFontSize(20) }}>{this.props.customer.CustomerID}</Text>
                      </View>
                  </View>}
          </View>
    )
  }
  callUserModal() {
    this.props.dispatch({ type: ReduxActions.IS_USER_MODAL_VISIBLE, visible: true })
  }
  callSearch() {
    if(this.props.searchVisable === true) {
      this.props.dispatch({ type: ReduxActions.RESET_SEARCH_DATA_MENU_REDUCER });
      this.props.dispatch({ type: ReduxActions.IS_SEARCH_VISIBLE, searchVisable: !this.props.searchVisable });
      }
    this.props.dispatch({ type: ReduxActions.IS_SEARCH_VISIBLE, searchVisable: !this.props.searchVisable });
  }
}

const mapStateToProps = (state) => {
  
  return {
    navState:state.navReducer.navState,
    orderNumber: state.menuReducer.orderNumber,
    selectedTableName:state.floorReducer.selectedtable.TableName,
    noofperson:state.tableReducer.NoOfPerson,
    customer:state.UserReducer.CustomerDetails,
    CustomerName:state.UserReducer.CustomerDetails.CustomerName,
    isButtonClicked:state.UserReducer.isButtonClicked,
    height: state.DashBoardReducer.height,
    width: state.DashBoardReducer.width,
    searchVisable: state.menuReducer.searchVisable,
    childTablesName:state.tableReducer.childTablesName,
    masterTableName:state.tableReducer.masterTableName
  };
}

export default connect(mapStateToProps, null)(Header)
