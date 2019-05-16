import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, TextInput, ActivityIndicator, Dimensions , Alert} from 'react-native'
import { Toast, Card, Label } from 'native-base';
import comStyles from './Styles/CommonStyles';
import ReduxActions from "../Redux/ActionTypes/Action";
import SagaActions from "../Sagas/ActionTypes/Action";
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import moment from "moment";
import __ from "lodash";
import { defaultColor, supportingColor } from './Styles/CommonStyles';
import { NavigationActions } from 'react-navigation';

class PrinterSelection extends Component {
  componentWillMount() {
    this.props.dispatch({ type: SagaActions.GET_FLOOR_DETAILS });
  }
  onLayout(e) {
    const {width, height} = Dimensions.get('window');
    this.props.dispatch({ type: ReduxActions.SCREEN_WIDTH, width: width });
    this.props.dispatch({ type: ReduxActions.SCREEN_HEIGHT, height: height });
    // Alert.alert("width>>>>>>>" + width +">>>height>>" + height);
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
  backBtn() {
    // this.props.dispatch({type: ReduxActions.SET_RES_STATE, isResOpen: false});
    // this.props.dispatch({type: ReduxActions.RESET_RESERVATION});
    
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
      NavigationActions.navigate({routeName: "LaunchScreen"})
      ]
      });
       this.props.navigation.dispatch(resetAction);
    }
    afterSubmit() {}

    changeFloor(val) {
        let selectedValue = val.match(/\d+/)[0];
        if (this.props.floorDetails.length > 0) {
          this.props.floorDetails.forEach((floordata, index) => {
            if (floordata.FloorID == selectedValue) {
              this.props.dispatch({ type: ReduxActions.SELECTED_FLOOR, floordata });
            }
          });
        }
      }
  render() {
    let tableArray = [];
    let floors = [];
    let printers = [];
    this.props.floorDetails.forEach(element => {
      floors.push({
        value: 'Section ' + element.FloorID
      });
      printers.push({
        value: 'Printer' + element.FloorID
      });
    });
    return (
        
        <View style={{ flex: 1, flexDirection: 'row', padding: 20 }} onLayout={this.onLayout.bind(this)}>
        <View style={{
          flex: 1, flexDirection: 'column',
          height: 100 + '%', borderWidth: 0.5, borderColor: 'black'
        }}>
          <View style={{
            width: 100 + '%',flexDirection: 'row', backgroundColor: defaultColor, zIndex: 6,
            justifyContent: 'flex-start', alignItems: 'center', height: 70
            }}>
            <TouchableOpacity style={{width: 20 + '%', height: 70, justifyContent: 'flex-start', padding: this.getFontSize(15)}}
            onPress={this.backBtn.bind(this)}
            >
              <Icon2 name="arrow-back" style={{fontSize: this.getFontSize(40), color: 'white'}}/>
            </TouchableOpacity>
            <View style={{width: 60 + '%', height: 70, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{ fontSize: this.getFontSize(40), color: 'white', fontWeight: 'bold' }}>
                Printer Configuration
              </Text>
            </View>
            <View style={{width: 20 + '%',height: 70,}}></View>            
          </View>
          <View style={{
            width: 100 + '%', backgroundColor: '#F8FAFC', height: 100 + '%',
            padding: 10, flexDirection: 'row', zIndex: 2, opacity: 0.8
          }}>
            <ScrollView style={{ height: 500, flex: 1 }}>
              {/* <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: "row", justifyContent: "flex-start", marginBottom: 10 }}>
                <Card style={{
                  width: 98 + '%', backgroundColor: 'white', height: 65, margin: 10,
                  borderWidth: 0.3, flexDirection: 'column', padding: 10,opacity: 1, zIndex: 5
                  }}>
                </Card>
              </View> */}
              <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: "row", justifyContent: "flex-start" }}>
                <Card style={{
                  width: 98 + '%', backgroundColor: 'white', height: 100 + '%', margin: 10,
                  borderWidth: 0.3, flexDirection: 'column', padding: 10,opacity: 1, zIndex: 5
                }}>
                  <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <View style={{ width: 40 + '%', justifyContent: 'flex-start', marginLeft: 2 + '%' }}>
                      <Text style={{ color: 'black', fontSize: this.getFontSize(25) }}>Select Section</Text>
                    </View>
                    <View style={{ width: 50 + '%', justifyContent: 'flex-start',  height: 41,
                backgroundColor: '#fff', }}>
                      <Dropdown style={{
                          width: 100 + '%',height: 40,  borderWidth: 0, backgroundColor: '#fff',
                          opacity: 1, fontSize: this.getFontSize(25), paddingBottom: 5, marginTop: -30, marginRight: -5
                        }} fontSize={this.getFontSize(25)} labelFontSize={0}
                        onChangeText={this.changeFloor.bind(this)} dropdownPosition={0} value={"Section 1"}
                        data={floors} />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <View style={{ width: 40 + '%', justifyContent: 'flex-start', marginLeft: 2 + '%' }}>
                      <Text style={{ color: 'black', fontSize: this.getFontSize(25) }}>Printer Name</Text>
                    </View>
                    <View style={{ width: 50 + '%', justifyContent: 'flex-start',  height: 41,
                        backgroundColor: '#fff', }}>
                       <TextInput itemColor={defaultColor}
                        style={{
                          width:100 + '%', height: 40, borderColor: 'black', borderWidth: 0.5, borderColor: 'transparent', backgroundColor: '#fff',
                          opacity: 1, fontSize: this.getFontSize(25), paddingBottom: 5
                        }} underlineColorAndroid='transparent'
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <View style={{ width: 40 + '%', justifyContent: 'flex-start', marginLeft: 2 + '%' }}>
                      <Text style={{ color: 'black', fontSize: this.getFontSize(25) }}>Config IP</Text>
                    </View>
                    <View style={{ width: 50 + '%', justifyContent: 'flex-start', height: 41 }}>
                      <TextInput itemColor={defaultColor} keyboardType="numeric"
                        style={{ height: 40, borderColor: 'black', borderWidth: 0.5, borderColor: 'transparent', backgroundColor: '#fff',
                          opacity: 1, fontSize: this.getFontSize(25), paddingBottom: 5
                        }} underlineColorAndroid='transparent'
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <View style={{ width: 40 + '%', justifyContent: 'flex-start', marginLeft: 2 + '%' }}>
                      <Text style={{ color: 'black', fontSize: this.getFontSize(25) }}>No of Copies</Text>
                    </View>
                    <View style={{ width: 50 + '%', justifyContent: 'flex-start',  height: 41,
                        backgroundColor: '#fff', }}>
                       <TextInput itemColor={defaultColor} keyboardType="numeric"
                        style={{
                          width:100 + '%', height: 40, borderColor: 'black', borderWidth: 0.5, borderColor: 'transparent', backgroundColor: '#fff',
                          opacity: 1, fontSize: this.getFontSize(25), paddingBottom: 5
                        }} underlineColorAndroid='transparent' 
                      />
                    </View>
                  </View>
                  <View style={{ paddingStart: 42 + '%', justifyContent: 'flex-start',
                      alignItems: 'flex-start' }}>
                    <TouchableOpacity style={{width: 86.2 + '%', height: 40, backgroundColor: defaultColor, 
                      color: '#fff', padding: 5, marginBottom: 10, borderRadius: 10 , justifyContent: 'center',
                      alignItems: 'center' }} onPress={this.afterSubmit.bind(this)}>
                      <Text style={{ color: 'white', fontSize: this.getFontSize(25) }} >Update</Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              </View>
              
            </ScrollView>
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
      </View>
    )
  }
  
}

const mapStateToProps = (state) => {
  return {
    floorDetails: state.floorReducer.floorList,
    selectedFloor: state.floorReducer.selectedFloor,
    height: state.DashBoardReducer.height,
    width: state.DashBoardReducer.width
  };
}

export default connect(mapStateToProps, null)(PrinterSelection)
