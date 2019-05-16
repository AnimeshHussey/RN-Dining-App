import React, { Component } from 'react'
import {ScrollView, Text, Image, View, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native'
import { Toast, Card } from 'native-base';
import comStyles from '../Styles/CommonStyles';
import ReduxActions from "../../Redux/ActionTypes/Action";
import SagaActions from "../../Sagas/ActionTypes/Action";
import { connect } from 'react-redux';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import __ from "lodash";
import { defaultColor, supportingColor } from '../Styles/CommonStyles';
import { NavigationActions } from 'react-navigation';

class TableModal extends Component {
  componentWillMount() {
    if(this.props.connectionStatus==='Online'){
      this.props.dispatch({ type: SagaActions.GET_ELIGIBLE_ORDERS_FOR_FEEDBACK });
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

  componentDidUpdate(prevProps, prevState){

  }

  callFeedback(order) {      
      if(this.props.connectionStatus==='Online'){
        this.props.dispatch({type: ReduxActions.FEEDBACK_ORDERID, FeedbackOrderID: order});
        this.props.navigation.navigate("FeedbackTabs");
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


  render() {
    let tableArray = [];
    if (this.props.searchedVal.length > 0) {
      this.props.searchedVal.map((order,index) => {
        tableArray.push(
          <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Card>
              <TouchableOpacity
                style={[comStyles.backgroundStyle, comStyles.xsCardStyle]}
                onPress={this.callFeedback.bind(this, order.OrderID)}
                >
                <View containerStyle={[comStyles.backgroundStyle, comStyles.colContainer]}>
                  <View style={{
                    width: 100 + '%', height: 25, flexDirection: 'column', justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:  defaultColor 
                  }}>
                    <Text style={comStyles.smWhiteTxtStyle}>{order.OrderID}</Text>
                  </View>
                   <View style={{
                    width: 100 + '%', flexDirection: 'column', justifyContent: 'flex-start',
                     alignItems: 'flex-start',
                    alignContent: 'flex-start', alignSelf: 'flex-start'
                  }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start',
                     alignItems: 'flex-start', width: 100 + '%', marginBottom: 10, marginLeft: -5, paddingLeft: 3 }}>
                      <Text style={comStyles.tableTxtStyle}> Name:
                        {order.Name}
                      </Text>
                    </View>
                   <View style={{ flexDirection: 'row', justifyContent: 'flex-start',
                     alignItems: 'flex-start', width: 100 + '%', paddingLeft: 3 }}>
                      <Text style={comStyles.tableTxtStyle}>Mobile No:
                        {order.CustomerID}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Card>
          </View>

        )
      })
    } else {
      tableArray.push(
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Card>
          <View
            style={[comStyles.backgroundStyle, comStyles.xsCardStyle]}
            >
            <View containerStyle={[comStyles.backgroundStyle, comStyles.colContainer]}>
               <View style={{
                width: 100 + '%', height: 100 + '%', flexDirection: 'column', justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: supportingColor  
              }}> 
                <Text style={comStyles.smWhiteTxtStyle}>No results Found</Text>
              </View> 
              </View>
              </View>
                </Card>
                </View>
      );
    }
    return (
      <View style={{ width: 100 + '%', flexDirection: 'column', height: 100 + '%', justifyContent: 'flex-start' }}>
       {!this.props.feedbackOrders && <View style={{
          height: 100 + '%', width: 100 + '%', position: 'absolute', zIndex: 100, backgroundColor: '#fff',
          justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center', opacity: 1
          }}>
          <ActivityIndicator size="large" color={'orange'} /></View>}
          {this.props.feedbackOrders.length === 0 && <View style={{
          height: 100 + '%', width: 100 + '%', position: 'absolute', zIndex: 100, backgroundColor: '#fff',
          justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center', opacity: 1
          }}>
          <Text style={{fontSize: 30, color: 'black'}}>No eligible order is present for feedback</Text>
          <TouchableOpacity style={{position: 'absolute',bottom: 30, left: 50,backgroundColor: defaultColor,justifyContent: 'center',
          alignContent: 'center',alignItems: 'center',
          width: 90 + '%', height: 50, borderRadius: 50}} onPress={this.gotoLunchScreen.bind(this)}>
          <Text style={{fontSize: 30, color:'#fff'}}>Go to Home Screen</Text>
          </TouchableOpacity>
          </View>}
        <View style={{
          width: 100 + '%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          height: 100 + '%', borderWidth: 0.5, borderColor: 'black'
        }}>
          <View style={{
            backgroundColor: 'white',
            width: 98 + '%', flexDirection: 'column', zIndex: 2, opacity: 0.8,
            justifyContent: 'center', alignItems: 'center', padding: 20, marginTop: 1 + '%'
          }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', marginLeft: 10 }}>
              <View style={{ width: 90 + '%', justifyContent: 'center', height: 41 }}>
                  <Icon1 name="search" style={{
                    position: 'absolute',
                    alignSelf: 'flex-end', justifyContent: 'center', fontSize: 35, paddingRight: 15
                  }}></Icon1>
                  <TextInput itemColor={defaultColor} keyboardType="default" placeholder='Search' editable={true}
                    selectTextOnFocus={true} value={this.props.searchedVal}
                    style={{
                      height: 40, borderColor: 'black', borderRadius: 30, borderWidth: 0.5, backgroundColor: '#fff',
                      opacity: 1, fontSize: 25, paddingBottom: 5, paddingLeft: 10
                    }} underlineColorAndroid='transparent' 
                     onChangeText={(text) => this.changeField(text)}
                  />
                </View>
            </View>
            <View>
              <ScrollView style={{ height: 80 + '%', marginTop: 100 }}>
                <View style={{
                  flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start',
                  paddingTop: 10, paddingBottom: 10
                }} >
                  {tableArray}
                </View>
              </ScrollView>
            </View>
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

  gotoLunchScreen() {
    const resetAction = NavigationActions.navigate({
      routeName: 'LaunchScreen',
      type: 'PopPreviousScreen'
  });
    this.props.navigation.dispatch(resetAction);
    }
    
  changeField(value){
    this.props.dispatch({ type: ReduxActions.SET_SEARCH_FEEDBACK_VAL, searchedVal: null });
    this.prepareResults(value);
  }
  prepareResults(searchedVal){
    let searchedArray = Object.assign([],this.props.feedbackOrders);
    if(searchedVal!==''){
      let temp1=[];
      // if (/^[a-zA-Z]+$/.test(searchedVal)) {
      //   temp1 = searchedArray.filter(element => element.OrderID.toLowerCase().includes(searchedVal.toLowerCase()))
      // }
      // else if (/^\d+$/.test(searchedVal)) {
        temp1 =searchedArray.filter(element => 
          element.CustomerID.toString().includes(searchedVal.toString()) || element.OrderID.toLowerCase().includes(searchedVal.toLowerCase()))
      // }
      searchedArray=Object.assign([], temp1)
    }
    this.props.dispatch({ type: ReduxActions.SET_SEARCH_FEEDBACK_VAL, searchedVal: searchedArray })
  }
}
const mapStateToProps = (state) => {
  return {
    FeedbackOrderID: state.FeedbackReducer.FeedbackOrderID,
    feedbackOrders: state.FeedbackReducer.feedbackOrders,
    searchedVal: state.FeedbackReducer.searchedVal,
    connectionStatus: state.loginReducer.connectionStatus
  };
}

export default connect(mapStateToProps, null)(TableModal)
