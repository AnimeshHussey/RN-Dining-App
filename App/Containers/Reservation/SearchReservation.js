import React, { Component } from 'react'
import { ScrollView, Text, Switch, View, TouchableOpacity, TextInput, Image, ActivityIndicator, Alert, Dimensions } from 'react-native'
import { Card, Label, Toast } from 'native-base';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from "moment";
import ReduxActions from "../../Redux/ActionTypes/Action";
import SagaActions from "../../Sagas/ActionTypes/Action";
import Icon from 'react-native-vector-icons/FontAwesome';
import DeleteReservation from './DeleteReservation';
import Modal from "react-native-modal";
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import comStyles, { defaultColor, supportingColor } from '../Styles/CommonStyles';
import { Dropdown } from 'react-native-material-dropdown';
import { NavigationActions } from 'react-navigation';

class SearchReservation extends Component {

  componentWillMount() {
    this.props.dispatch({ type: SagaActions.GET_RESERVATIONS });
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
  _showDateTimePicker = () => {
    if (this.props.searchDate === '') {
      this.props.dispatch({ type: ReduxActions.SET_SEARCHED_DATE_PICKER, isSearchDatePickerVisible: true });
    }
    else {
      this.props.dispatch({ type: ReduxActions.SET_SEARCHED_DATE, searchDate: '' });
      this.props.dispatch({ type: ReduxActions.SET_SEARCHED_DATE_PICKER, isSearchDatePickerVisible: false });
      this.prepareResults(this.props.searchedVal, this.props.sortBy, '', this.props.switchState);
    }
  };

  _hideDateTimePicker = () => this.props.dispatch({ type: ReduxActions.SET_SEARCHED_DATE_PICKER, isSearchDatePickerVisible: false });

  _handleDatePicked = (date) => {
    let cusDate = moment(new Date(date)).format('YYYY-MM-DD');
    this.props.dispatch({ type: ReduxActions.SET_SEARCHED_DATE_PICKER, isSearchDatePickerVisible: false })
    this.props.dispatch({ type: ReduxActions.SET_SEARCHED_DATE, searchDate: cusDate });
    this.prepareResults(this.props.searchedVal, this.props.sortBy, cusDate.toString(), this.props.switchState);
  };

  changeMode(val) {
    this.props.dispatch({ type: ReduxActions.SET_SORT, val: val })
    this.prepareResults(this.props.searchedVal, val, this.props.searchDate, this.props.switchState);
  }

  // changeField(value, type) {
  //   this.props.dispatch({ type: ReduxActions.SET_SEARCH_VALUE, searchedVal: value })
  //   let searchedArray = [];
  //   if (/^[a-zA-Z]+$/.test(value)) {
  //       searchedArray = this.props.allReservations.filter(element => element.BOOKINGNAME.toLowerCase().includes(value.toLowerCase()))
  //       if(this.props.searchDate!==''){searchedArray= Object.assign([],this.changeDate(searchedArray))}
  //       if(this.props.sortFlag){searchedArray= Object.assign([],this.changeMode(this.props.sortBy, searchedArray))}
  //   }
  //   else if (/^\d+$/.test(value)) {
  //     if(this.props.searchDate===''&& !this.props.sortFlag){
  //       searchedArray = this.props.allReservations.filter(element => element.CUSTOMERID.toString().includes(value.toString()))
  //     }
  //     else{
  //       searchedArray = this.props.reservationsSearch.filter(element => element.CUSTOMERID.toString().includes(value.toString()))
  //     }
  //   }
  //   if(searchedArray.length===0) {
  //     if (value !== '' && value !== null && value !== undefined) {
  //       searchedArray.push('No results found');
  //     } else {
  //       if(this.props.searchDate===''&& !this.props.sortFlag){
  //         searchedArray = this.props.allReservations;
  //       }
  //       else{
  //         searchedArray = this.props.reservationsSearch;
  //       }
  //     }
  //   }
  //   this.props.dispatch({ type: ReduxActions.SET_RESERVATION_SEARCH_RESULTS, searchedArr: searchedArray, marker: '' })
  // }
  changeField(value) {
    this.props.dispatch({ type: ReduxActions.SET_SEARCH_VALUE, searchedVal: value })
    this.prepareResults(value, this.props.sortBy, this.props.searchDate, this.props.switchState)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isResCancelled) {
      this.props.dispatch({ type: ReduxActions.RESET_RESERVATION })
      this.props.navigation.navigate('SearchReservation')
    }
    // else if (!this.props.isGetting && this.props.reservationsSearch.length === 0) {
    //   // let searchedArray = this.props.allReservations;
    //   // this.props.dispatch({ type: ReduxActions.SET_SEARCH_RESULTS, searchedArr: searchedArray });
    //   this.sortbyDate();
    // }
  }

  sortbyDate(resArr) {
    if (this.props.searchedVal === '' && this.props.searchDate === '') { let sortedArr = Object.assign([], this.props.allReservations) }
    else { let sortedArr = Object.assign([], this.props.reservationsSearch) }
    // this.props.allReservations.map((element)=>{
    // let tmp=Date.parse(element.BOOKINGDATETIME);
    // if(sortedArr.length===0){
    // sortedArr.push(element)
    // }
    // else{
    // let n=sortedArr.length-1;
    // if(tmp<=Date.parse(sortedArr[0].BOOKINGDATETIME)){sortedArr.unshift(element)}
    // else if(tmp>=Date.parse(sortedArr[n].BOOKINGDATETIME)){sortedArr.push(element)}
    // else {
    // let lowkey=0;
    // let highkey=n;
    // while(!sortedArr.includes(element)){
    // if(tmp>Date.parse(sortedArr[Math.floor((lowkey+highkey)/2)].BOOKINGDATETIME)){
    // lowkey=Math.floor((lowkey+highkey)/2);
    // if(tmp<=Date.parse(sortedArr[Math.floor((lowkey+highkey)/2)+1].BOOKINGDATETIME)){
    // sortedArr.splice(Math.floor((lowkey+highkey)/2)+1,0,element)
    // break;
    // }
    // }
    // else if(tmp===Date.parse(sortedArr[Math.floor((lowkey+highkey)/2)].BOOKINGDATETIME)){
    // sortedArr.splice(Math.floor((lowkey+highkey)/2)+1,0,element)
    // break;
    // }
    // else{
    // highkey=Math.floor((lowkey+highkey)/2);
    // if(tmp>=Date.parse(sortedArr[Math.floor((lowkey+highkey)/2)-1].BOOKINGDATETIME)){
    // sortedArr.splice(Math.floor((lowkey+highkey)/2),0,element);
    // break;
    // }
    // }
    // }
    // }
    // }
    // })
    this.props.dispatch({ type: ReduxActions.SET_RESERVATION_SEARCH_RESULTS, searchedArr: sortedArr.reverse(), marker: 'sort' })
  }
  prepareResults(searchedVal, sortVal, dateVal, switchSt) {
    let searchedArray = Object.assign([], this.props.allReservations);
    if (searchedVal !== '') {
      let temp1 = [];
      if (/^[a-zA-Z]+$/.test(searchedVal)) {
        temp1 = searchedArray.filter(element => element.BOOKINGNAME.toLowerCase().includes(searchedVal.toLowerCase()))
      }
      else if (/^\d+$/.test(searchedVal)) {
        temp1 = searchedArray.filter(element => element.CUSTOMERID.toString().includes(searchedVal.toString()))
      }
      searchedArray = Object.assign([], temp1)
    }
    if (sortVal !== '') {
      //this.props.dispatch({type:ReduxActions.SET_SORT, val:sortVal})
      if (sortVal === 'Sort by name') {
        searchedArray.sort(function (a, b) {
          if (a.BOOKINGNAME.toLowerCase() < b.BOOKINGNAME.toLowerCase())
            return -1;
          if (a.BOOKINGNAME.toLowerCase() > b.BOOKINGNAME.toLowerCase())
            return 1;
          return 0;
        });
      }
      else if (sortVal === 'Sort by date') {
        searchedArray = searchedArray.reverse()
      }
    }
    if (dateVal !== '') {
      let dateWiseArr = [];
      dateWiseArr = searchedArray.filter(element => element.BOOKINGDATETIME.split('T')[0].includes(dateVal))
      searchedArray = Object.assign([], dateWiseArr)
    }
    if (switchSt) {
      let temp = searchedArray.filter(element => element.TABLEID !== 0)
      searchedArray = Object.assign([], temp)
      //this.props.dispatch({ type: ReduxActions.TOGGLE_CLEAR_ALL_RESERV});
    }
    else {
      let temp = searchedArray.filter(element => element.TABLEID === 0)
      searchedArray = Object.assign([], temp)
      //this.props.dispatch({ type: ReduxActions.TOGGLE_CLEAR_ALL_RESERV});
    }
    if (searchedArray.length === 0) {
      if (searchedVal || dateVal) {
        searchedArray.push('No results found');
      }
      // else {
      //   searchedArray = this.props.allReservations;
      // }
    }
    this.props.dispatch({ type: ReduxActions.SET_RESERVATION_SEARCH_RESULTS, searchedArr: searchedArray })
  }
  sortbyName() {
    let tempNameArr = []
    if (this.props.searchedVal === '' && this.props.searchDate === '') { tempNameArr = Object.assign([], this.props.allReservations) }
    else { tempNameArr = Object.assign([], this.props.reservationsSearch) }
    tempNameArr.sort(function (a, b) {
      if (a.BOOKINGNAME.toLowerCase() < b.BOOKINGNAME.toLowerCase())
        return -1;
      if (a.BOOKINGNAME.toLowerCase() > b.BOOKINGNAME.toLowerCase())
        return 1;
      return 0;
    });
    this.props.dispatch({ type: ReduxActions.SET_RESERVATION_SEARCH_RESULTS, searchedArr: tempNameArr, marker: 'sort' });
  }

  // changeDate(val,type){
  //     this.props.dispatch({type: ReduxActions.SET_SEARCHED_DATE, val: val})
  //     let dateWiseArr=[];
  //     let newArr=[];
  //     if(this.props.searchedVal==='' && !this.props.sortFlag){
  //       newArr=Object.assign([], this.props.allReservations)
  //     }
  //     else{
  //       newArr=Object.assign([], this.props.reservationsSearch)
  //     }
  //     newArr.map((element)=>{
  //     if(element.BOOKINGDATETIME.split('T')[0]===val){
  //     dateWiseArr.push(element)
  //     }
  //     })
  //     this.props.dispatch({ type: ReduxActions.SET_RESERVATION_SEARCH_RESULTS, searchedArr: dateWiseArr, marker:'' })
  // }

  render() {
    let sorts = [];
    sorts.push({
      value: 'Sort by date'
    },
      {
        value: 'Sort by name'
      });
    let searchResults = [];
    if (this.props.reservationsSearch.length > 0) {
      this.props.reservationsSearch.map((reservation) => {
        if (reservation === 'No results found') {
          searchResults.push(<Label style={{ fontSize: 25 }}>No results found</Label>)
        } else {
          searchResults.push(
            <Card style={{
              width: 100 + '%',
              //  width: 98 + '%',
              backgroundColor: reservation.STATUS === "2" ? '#ffe6e6' : '#e6ffe6', height: 70, margin: 10,
              flexDirection: 'row', padding: 10, opacity: 1, zIndex: 5,

            }}>
              <View style={{ width: 78 + '%', flexDirection: 'column', justifyContent: "flex-start" }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ width: 20 + '%' }}>
                    <Text style={{}}>Name </Text>
                  </View>
                  <View style={{ width: 20 + '%' }}>
                    <Text style={{}}>Mobile No </Text>
                  </View>
                  <View style={{ width: 20 + '%' }}>
                    <Text style={{}}>No of Guest </Text>
                  </View>
                  <View style={{ width: 30 + '%' }}>
                    <Text style={{}}>Time </Text>
                  </View>
                  <View style={{ width: 10 + '%' }}>
                    <Text style={{}}>
                      {/* {reservation.STATUS === "2" ? 'Cancelled' : 'Reserved'}  */}
                      Table
                  </Text>
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ width: 20 + '%' }}>
                    <Text style={{ color: 'black', fontSize: this.getFontSize(15) }}>{reservation.BOOKINGNAME} </Text>
                  </View>
                  <View style={{ width: 20 + '%' }}>
                    <Text style={{ color: 'black', fontSize: this.getFontSize(15) }}>{reservation.CUSTOMERID} </Text>
                  </View>
                  <View style={{ width: 20 + '%' }}>
                    <Text style={{ color: 'black', fontSize: this.getFontSize(15) }}>{reservation.NOOFPERSONS} </Text>
                  </View>
                  <View style={{ width: 30 + '%' }}>
                    <Text style={{ color: 'black', fontSize: this.getFontSize(15) }}>{moment(reservation.BOOKINGDATETIME).format('MMM DD YYYY h:mm A')} </Text>
                  </View>
                  <View style={{ width: 10 + '%' }}>
                    <Text style={{ color: 'black', fontSize: this.getFontSize(15) }}>{reservation.TABLEID}</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: 20 + '%', flexDirection: 'column' }}>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
                  {reservation.STATUS !== "2" && reservation.TABLEID === 0 && <TouchableOpacity style={{
                    width: 28 + '%', flexDirection: 'row', height: 40,
                    justifyContent: "center", alignItem: 'center', alignContent: 'center', alignSelf: 'center'
                  }}
                    onPress={this.callModify.bind(this, reservation)}
                  >
                    <Icon name="edit" style={{ fontSize: this.getFontSize(40), color: 'black' }}></Icon>
                  </TouchableOpacity>}

                  {reservation.STATUS !== "2" && reservation.TABLEID === 0 && <TouchableOpacity style={{
                    width: 28 + '%', flexDirection: 'row', height: 40,
                    justifyContent: "center", alignItem: 'center', alignContent: 'center', alignSelf: 'center'
                  }}
                    onPress={this.callDelModal.bind(this, reservation)}
                  >
                    <Icon3 name="circle-with-cross" style={{ fontSize: this.getFontSize(40), color: 'black' }}></Icon3>
                  </TouchableOpacity>}
                  {reservation.STATUS !== "2" && reservation.TABLEID == 0 && <TouchableOpacity style={{
                    width: 44 + '%', flexDirection: 'row', height: 40,
                    justifyContent: "center", alignItem: 'center', alignContent: 'center', alignSelf: 'center'
                  }}
                    onPress={this.callAdd.bind(this, reservation)}
                  >
                    <Icon2 name='add-circle-outline' style={{ fontSize: this.getFontSize(40), color: 'black' }}></Icon2>
                  </TouchableOpacity>}
                </View>

                <View style={{ flex: 1, flexDirection: 'row', paddingTop: this.getFontSize(10) }}>
                  {reservation.STATUS !== "2" && reservation.TABLEID === 0 && <View style={{
                    width: 28 + '%', flexDirection: 'row', height: 20,
                    justifyContent: "center", alignItem: 'center', alignContent: 'center', alignSelf: 'center'
                  }}
                  >
                    <Text style={{ fontSize: this.props.width < this.props.height ? this.getFontSize(10) : this.getFontSize(15), color: 'black' }}>Modify</Text>
                  </View>}
                  {reservation.STATUS !== "2" && reservation.TABLEID === 0 && <View style={{
                    width: 28 + '%', flexDirection: 'row', height: 20,
                    justifyContent: "center", alignItem: 'center', alignContent: 'center', alignSelf: 'center'
                  }}
                  >
                    <Text style={{ fontSize: this.props.width < this.props.height ? this.getFontSize(10) : this.getFontSize(15), color: 'black' }}>Cancel</Text>
                  </View>}
                  {reservation.STATUS !== "2" && reservation.TABLEID == 0 && <View style={{
                    width: 44 + '%', flexDirection: 'row', height: 20,
                    justifyContent: "center", alignItem: 'center', alignContent: 'center', alignSelf: 'center'
                  }}
                  >
                    <Text style={{ fontSize: this.props.width < this.props.height ? this.getFontSize(10) : this.getFontSize(15), color: 'black' }}>Select Table </Text>
                  </View>}

                </View>
              </View>
            </Card>
          )
        }
      })
    }
    else if (this.props.reservationsSearch.length === 0 && this.props.searchedVal) {
      searchResults.push(
        <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: "row", justifyContent: "flex-start" }}>
          <Card style={{
            width: 98 + '%', backgroundColor: 'white', height: 100 + '%', margin: 10,
            borderWidth: 0.3, flexDirection: 'column', padding: 10, opacity: 1, zIndex: 5
          }}>
            <Text>No results found</Text>
          </Card></View>)
    }
    return (
      <View style={{ flex: 1, flexDirection: 'row', padding: this.props.width <= 800 ? 2 : 20 }} onLayout={this.onLayout.bind(this)}>
        {this.props.isGetting && <View style={{
          width: 100 + '%', backgroundColor: '#F8FAFC', height: 100 + '%',
          padding: 10, flexDirection: 'row', zIndex: 2, opacity: 0.8, justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center'
        }}><ActivityIndicator size="large" color="black" />
        </View>}
        {!this.props.isGetting && <View style={{
          flex: 1, flexDirection: 'column',
          height: 100 + '%', borderWidth: 1, borderColor: 'black'
        }}>
          <View style={{
            width: 100 + '%', flexDirection: 'row', backgroundColor: defaultColor, zIndex: 6,
            justifyContent: 'flex-start', alignItems: 'center', height: 70
          }}>
            <TouchableOpacity style={{ width: 20 + '%', height: 70, justifyContent: 'flex-start', padding: 15 }}
              onPress={this.backBtn.bind(this)}
            >
              <Icon2 name="arrow-back" style={{ fontSize: 40, color: 'white' }} />
            </TouchableOpacity>
            <View style={{ width: 60 + '%', height: 70, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: this.getFontSize(40), color: 'white', fontWeight: 'bold' }}>
                Reservation
              </Text>
            </View>
            <TouchableOpacity style={{ width: 20 + '%', height: 70, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 15 }}
              onPress={this.addRes.bind(this)}
            >
              <Icon2 name="exit-to-app" style={{ fontSize: 40, color: 'white' }} />
            </TouchableOpacity>

          </View>

          <View style={{
            width: 100 + '%', backgroundColor: '#F8FAFC', height:  Math.min(this.props.width, this.props.height) / 8,
            
             flexDirection: 'row', zIndex: 2, opacity: 0.8
          }}>

            <Card style={{
              width: 100 + '%', backgroundColor: 'white', height:  Math.min(this.props.width, this.props.height) / 8, margin: 2,
              borderWidth: 0.3, flexDirection: 'column', padding: 1, opacity: 1, zIndex: 5, marginTop:-10
            }}>
              <View style={{ flexDirection: 'row', marginBottom: 2, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 25 + '%', justifyContent: 'center', height: 41 }}>
                  <Icon name="search" style={{
                    position: 'absolute',
                    alignSelf: 'flex-end', justifyContent: 'center', fontSize: this.getFontSize(35), paddingRight: this.getFontSize(15)
                  }}></Icon>
                  <TextInput itemColor={defaultColor} keyboardType="default" placeholder='Search' editable={true}
                    selectTextOnFocus={true} value={this.props.searchedVal}
                    style={{
                      height: 40, borderColor: 'black', borderRadius: 30, borderWidth: 1, backgroundColor: '#fff',
                      opacity: 1, fontSize: this.getFontSize(25), paddingBottom: 5, paddingLeft: 10
                    }} underlineColorAndroid='transparent' onChangeText={(text) => this.changeField(text)}
                  />
                </View>
                <View style={{ width: 20 + '%', justifyContent: 'flex-start', marginTop: -0, marginLeft: 2 + '%' }}>
                  <Dropdown style={{
                    borderColor: 'black', borderRadius: 30, borderWidth: 1,
                    backgroundColor: '#fff', opacity: 1, height: 40, paddingLeft: 5,
                    borderColor: 'black', color: "grey", marginTop: -15
                  }} fontSize={this.getFontSize(25)} labelFontSize={0}
                    onChangeText={this.changeMode.bind(this)}
                    dropdownPosition={0} value={"Sort by"}
                    data={sorts}
                  />
                </View>
                <TouchableOpacity style={{ height: 40, width: this.props.width < this.props.height ? 30 + '%' : 23 + '%', justifyContent: 'flex-start' }}
                  onPress={this._showDateTimePicker}>
                  {this.props.searchDate === '' && <Icon name="calendar" style={{
                    position: 'absolute', color: 'black',
                    alignSelf: 'flex-end', justifyContent: 'center', fontSize: this.getFontSize(35), paddingRight: this.getFontSize(15)
                  }}></Icon>}
                  {this.props.searchDate !== '' && <Icon2 name="clear" style={{
                    position: 'absolute', color: 'black',
                    alignSelf: 'flex-end', justifyContent: 'center', fontSize: this.getFontSize(35), paddingRight: this.getFontSize(15)
                  }}></Icon2>}
                  <View style={{
                    height: 40, borderColor: 'black', borderRadius: this.getFontSize(30), borderWidth: 1, backgroundColor: '#fff',
                    opacity: 1, fontSize: this.getFontSize(25), paddingBottom: 3, paddingLeft: this.getFontSize(10), color: 'black'
                  }}>
                    <Text style={{ color: 'black', fontSize: this.getFontSize(25) }}>{this.props.searchDate !== '' ? moment(this.props.searchDate).format('MMM DD YYYY') : 'Select Date'}</Text>
                  </View>
                  <DateTimePicker mode={'date'}
                    isVisible={this.props.isSearchDatePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                  />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', height: 40, width: this.props.width < this.props.height ? 13 + '%' : 20 + '%', justifyContent: 'center', alignItems: 'baseline', alignContent: 'center', alignSelf: 'center', marginLeft: this.props.width <= 800 ? 1 : 2 + '%' }}>
                  {this.props.width < this.props.height && <Text style={{ fontSize: this.getFontSize(25) }}>O</Text>}
                  {!(this.props.width < this.props.height) && <Text style={{ fontSize: this.getFontSize(25) }}>Open</Text>}
                  <Switch value={this.props.switchState} onValueChange={this.toggleSwitch.bind(this)}
                    disabled={false} fontSize={this.getFontSize(15)}
                  />
                  {this.props.width < this.props.height && <Text style={{ fontSize: this.getFontSize(25) }}>A</Text>}
                  {!(this.props.width < this.props.height) && <Text style={{ fontSize: this.getFontSize(25) }}>Alloted</Text>}
                </View>
                <TouchableOpacity disabled={!this.props.switchState} style={{ height: 40, width: 5 + '%' }} onPress={this.clearAllConfirmation.bind(this)}>
                  <Icon name='trash-o' style={{ color: !this.props.switchState ? 'grey' : 'black', alignSelf: 'flex-end', justifyContent: 'center', fontSize: this.getFontSize(35) }}></Icon>
                </TouchableOpacity>
              </View>
            </Card>
          </View>
          <View style={{
            width: 100 + '%', backgroundColor: '#F8FAFC', height: 90 + '%',
            padding: 10, flexDirection: 'row', zIndex: 2, opacity: 0.8
          }}>
            <ScrollView style={{ height: 500, flex: 1 }}>
              <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                {searchResults}
              </View>
            </ScrollView>
          </View>
          {this.props.isDel &&
            <Modal backdropColor="black" backdropOpacity="0.4" transparent={true}
              style={{
                borderRadius: 5, opacity: 0.8,
                alignContent: 'center', alignSelf: 'center', alignContent: 'center'
              }}
              visible={this.props.isDel}
              onBackdropPress={this.exitDelModal.bind(this)}
              onRequestClose={this.exitDelModal.bind(this)}>
              <DeleteReservation></DeleteReservation>

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
        </View>}
      </View>
    )
  }
  clearAllConfirmation() {
    if(this.props.connectionStatus==='Online'){
      Alert.alert('Confirmation', 'Do you want to clear all reservations?',
      [{ text: 'No', onPress: () => { style: 'cancel' } },
      { text: 'Yes', onPress: this.clearAll.bind(this) }],
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
  clearAll() {
    let resids = [];
    this.props.reservationsSearch.map(element => {
      resids.push(element.ID)
    })
    this.props.dispatch({ type: SagaActions.CLEAR_RESERVATIONS, ids: resids })
  }
  callDelModal(event, res) {
    if(this.props.connectionStatus==='Online'){
    this.props.dispatch({ type: ReduxActions.IS_RES_DELETE_VISIABLE, isDel: true });
    } else{
      Toast.show({
        text: 'You are offline. Please check internet connection.',
        textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
        duration: 3000,
        buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
        buttonText: "Okay",
        type: "danger"
      })
    }
    this.props.dispatch({ type: ReduxActions.SET_RESERVATION_FOR_DELETION, tobeDel: event });
  }
  exitDelModal() {
    this.props.dispatch({ type: ReduxActions.IS_RES_DELETE_VISIABLE, isDel: false })
  }
  callModify(reservation) {
    this.props.dispatch({ type: ReduxActions.STATE_OF_RESERVATION, resState: 'modify' });
    this.props.dispatch({ type: ReduxActions.SELECTED_MODIFY_DATA, reservation: reservation });
    this.props.navigation.navigate('Reservation');
  }
  callAdd(reservation) {
    if(this.props.connectionStatus==='Online'){
      let today = moment(new Date()).format('YYYY-MM-DD');
      if (reservation.BOOKINGDATETIME.split('T')[0] === today) {
        this.props.dispatch({ type: ReduxActions.SELECTED_MODIFY_DATA, reservation: reservation });
        this.props.dispatch({ type: ReduxActions.SET_RES_STATE, isResOpen: true });
        this.props.dispatch({ type: ReduxActions.RESET_SUCCESSFULLY_RESERVED_TABLE });
        this.props.navigation.navigate('TableScreen');
      }
      else {
        Alert.alert('Out of reservation period', 'Table can be alloted only on the date of reservation.',
          [{ text: 'Ok', style: 'cancel' }],
          { cancelable: true });
      }
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
  backBtn() {
    this.props.dispatch({ type: ReduxActions.RESET_RESERVATION });

    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: "ReservationStack" })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }
  addRes() {
    this.props.dispatch({ type: ReduxActions.RESET_RESERVATION });
    this.props.dispatch({ type: ReduxActions.RESET_NAV_REDUCER });
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: "LaunchScreen" })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }
  toggleSwitch() {
    this.prepareResults(this.props.searchedVal, this.props.sortBy, this.props.searchDate, !this.props.switchState)
    this.props.dispatch({ type: ReduxActions.TOGGLE_SWITCH })
  }
}
const mapStateToProps = (state) => {
  return {
    allReservations: state.ReservationReducer.allReservations,
    reservationsSearch: state.ReservationReducer.reservationsSearch,
    searchedVal: state.ReservationReducer.searchedVal,
    isDel: state.ReservationReducer.isDelResModalVisible,
    isResCancelled: state.ReservationReducer.isResCancelled,
    isGetting: state.ReservationReducer.isGetting,
    isResOpen: state.navReducer.isResOpen,
    searchDate: state.ReservationReducer.searchDate,
    isSearchDatePickerVisible: state.ReservationReducer.isSearchDatePickerVisible,
    switchState: state.ReservationReducer.switchState,
    sortBy: state.ReservationReducer.sortBy,
    isClearAllVisible: state.ReservationReducer.isClearAllVisible,
    height: state.DashBoardReducer.height,
    width: state.DashBoardReducer.width,
    connectionStatus: state.loginReducer.connectionStatus
  };
}

export default connect(mapStateToProps, null)(SearchReservation)
