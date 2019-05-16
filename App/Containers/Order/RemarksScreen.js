import React, { Component } from 'react'
import { ScrollView, Text, Alert, View, TouchableOpacity, TextInput, Dimensions,Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';
import ReduxActions from "../../Redux/ActionTypes/Action";
import { Card,Toast} from 'native-base';
import {defaultColor, supportingColor} from '../Styles/CommonStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class RemarksScreen extends Component {

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }
    componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    }
    _keyboardDidShow () {
    this.props.dispatch({ type: ReduxActions.IS_KEYBOARD_OPEN, isKeyboardOpen: true });
    }
    _keyboardDidHide () {
    this.props.dispatch({ type: ReduxActions.IS_KEYBOARD_OPEN, isKeyboardOpen: false });
    }  

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
     <Card onLayout={this.onLayout.bind(this)}>
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        borderWidth: 0.5, borderColor: 'black', height: this.props.height*0.8, width:  this.props.width*0.8, backgroundColor: supportingColor
          }}>
        <View style={{
          width: 100 + '%', backgroundColor: defaultColor, position: 'absolute', top: 0, left: 0,
          justifyContent: 'center', alignItems: 'center', height: 50, zIndex: 2
          }}>
          <Text style={{ fontSize: this.getFontSize(35), color: 'white', fontWeight: 'bold' }}>
            Thank you for your remarks!
          </Text>
        </View>
        {!this.props.isKeyBoardOpen && <View style={{
        height: this.props.width< this.props.height? 75 + '%': 65 + '%', flex: 1,
        width: 100 + '%', flexDirection: 'column', zIndex: 2, opacity: 1,
        justifyContent: 'center', alignItems: 'center', padding: this.getFontSize(20), marginTop: 50 
        }}>
        <ScrollView>
          <View style={{  width: 100 + '%',flexDirection: 'row', marginBottom: this.getFontSize(10), flexWrap: 'wrap'  }}>
            {/* {this.props.remarksLieach, index) => { */}
            {this.props.remarksList.map((elements,index) => {
              return (
                <TouchableOpacity key={index} style={{width: this.props.width< this.props.height?48 + '%': 24 + '%', flexDirection: 'row',backgroundColor: '#fff',
                 opacity: 1, padding: this.getFontSize(10), marginRight: 1 + '%', marginBottom: 1 + '%',
                alignItems: 'baseline'}}
                onPress={this.updateRemarks.bind(this, elements)}>
                    {!elements.value && <Icon name="checkbox-blank-circle-outline" style={{fontSize: this.getFontSize(25), marginRight: 5}}  />}
                    {elements.value && <Icon name="checkbox-marked-circle" style={{fontSize: this.getFontSize(25), marginRight: 5, color: 'green'}}  />}
                    <Text style={{color: 'black', fontSize: this.getFontSize(15)}}>{elements.key}</Text>
              </TouchableOpacity>)})}
          </View>
          </ScrollView>
        </View>}
       
        <View style={{ width: 100 + '%',height: this.props.width< this.props.height?10 + '%': 15 + '%', flexDirection: 'row', marginBottom: 10 }}>
            <View style={{ width: this.props.width< this.props.height?50 + '%':25 + '%', flexDirection: "row", justifyContent: 'flex-start' }}>
              <Text style={{ fontSize: this.getFontSize(20), color: 'black' }}>
                Special request:
              </Text>
            </View>
            <View style={{ width: this.props.width< this.props.height?50 + '%': 75 + '%', flexDirection: "row", justifyContent: 'flex-start' }}>
              <KeyboardAwareScrollView>
                <View style={{ width: 100 + '%', justifyContent: 'flex-start' }}>
                  <TextInput underlineColorAndroid='transparent' multiline={false} maxLength={140}
                    style={{ height: 80, borderColor: 'black', borderWidth: 0.5, opacity:1, backgroundColor: '#fff',width:65+"%",
                     paddingBottom: 2, paddingTop: 2, fontSize: this.getFontSize(20)}} onChangeText={(text) => this.setcomment(text)} value={this.props.comment} />
                </View>
              </KeyboardAwareScrollView>
            </View>
          </View>
          <View style={{  width: 100 + '%',height: this.props.width< this.props.height?10 + '%': 12 + '%', flexDirection: 'row' }}>
            {/* <View style={{ width: 50 + '%', flexDirection: "row", justifyContent: 'flex-start' }}>
            </View> */}
            <View style={{ width: 100 + '%', flexDirection: "row", justifyContent: 'center', alignContent: 'center',
            marginTop: this.getFontSize(10), marginBottom: 3
            }}>
              <TouchableOpacity style={{width: 80 + '%',backgroundColor: defaultColor, height: this.getFontSize(50), padding: this.getFontSize(10)
              , justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center', borderRadius: this.getFontSize(30),
            }}
              onPress={this.submitRemrks.bind(this)}>
              <Text style={{color: 'white', fontSize: this.getFontSize(20) }}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
      </Card>
    )
  }
  setcomment(text){
    if(text==="" || /^[A-Za-z0-9 ]+$/.test(text))
    {
      this.props.dispatch({type:ReduxActions.SET_COMMENT,remarks:text});
    }
      else{Alert.alert('Invalid', 'Special characters not allowed');}
  }

  submitRemrks() {
    let allRemarks = Object.assign([],this.props.remarksList);
    let remarksString='';
    allRemarks.forEach((each) => {
      if(each.value)
      remarksString=remarksString+','+each.key;
    })
    let selectedOrders=[...this.props.orders];
    selectedOrders.forEach((element) => {
       if(this.props.selectedItemforRemarks===element.ItemID)
      element.Comments=((remarksString+','+this.props.comment).substr(1)).replace(/,\s*$/, "");
      }); 
    if(remarksString ){
        if(remarksString.length<=140){ 
          this.props.dispatch({type:ReduxActions.SET_ORDERS,selectedOrders:selectedOrders});
          this.props.dispatch({type: ReduxActions.RESET_REMARKS});
          this.props.dispatch({ type: ReduxActions.IS_REMARKS_MODAL_VISIBLE, remarksVisible: false });
          this.props.dispatch({ type: ReduxActions.IS_KEYBOARD_OPEN, isKeyboardOpen: false });
          }
          else{
            Toast.show({
              text: 'Maximum allowed limit for remarks exceeded !',
              textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
              duration: 3000,
              buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
              buttonText: "Okay",
              type: "danger"
              });
          }
    }
    else{ 
      if(this.props.comment.length <=140){
      this.props.dispatch({type:ReduxActions.SET_ORDERS,selectedOrders:selectedOrders});
      this.props.dispatch({type: ReduxActions.RESET_REMARKS});
      this.props.dispatch({ type: ReduxActions.IS_REMARKS_MODAL_VISIBLE, remarksVisible: false });
      this.props.dispatch({ type: ReduxActions.IS_KEYBOARD_OPEN, isKeyboardOpen: false });
    }
    else{
      Toast.show({
        text: 'Maximum allowed limit for remarks exceeded !',
        textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
        duration: 3000,
        buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
        buttonText: "Okay",
        type: "danger"
        });
    }
  }
  }

  updateRemarks(selectedRemarks) {    
    this.props.dispatch({type: ReduxActions.UPDATE_REMARKS_LIST, selectedRemarks});
    this.props.dispatch({ type: ReduxActions.IS_KEYBOARD_OPEN, isKeyboardOpen: false });
  }
}


const mapStateToProps = (state) => {
  return {
    selectedItemforRemarks:state.menuReducer.selectedItemforRemarks,
    orders:state.menuReducer.Orders,
    comment:state.menuReducer.comment,
    remarksList:state.menuReducer.remarksList,
    selectedRemarks:state.menuReducer.selectedRemarks,
    height: state.DashBoardReducer.height,
    width: state.DashBoardReducer.width,
    isKeyBoardOpen:state.menuReducer.isKeyBoardOpen
  };
}

export default connect(mapStateToProps, null)(RemarksScreen)