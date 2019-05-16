import React, { Component } from 'react'
import ReactNative, { ScrollView, Text, Image, View, TouchableOpacity, TextInput } from 'react-native'
import {Card} from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import TableScreen from '../Containers/TableScreen'
import TextBoxMaterial from "../../Components/TextBox";
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import ReduxActions from "../../Redux/ActionTypes/Action";
import SagaActions from "../../Sagas/ActionTypes/Action";
import {defaultColor, supportingColor} from '../Styles/CommonStyles';
class DeleteReservation extends Component {
  render() {
    return (
      <Card>
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        borderWidth: 0.5, borderColor: 'black', height: 200, width: 600, backgroundColor: 'white'
          }}>
        <View style={{
          width: 100 + '%', backgroundColor: defaultColor, position: 'absolute', top: 0, left: 0,
          justifyContent: 'center', alignItems: 'center', height: 50, zIndex: 2
          }}>
          <Text style={{ fontSize: 35, color: 'white', fontWeight: 'bold' }}>
            Cancel Reservation
          </Text>
        </View>
        <View style={{
           height: 90 + '%',
          width: 100 + '%', flexDirection: 'column', zIndex: 2, opacity: 1,
          justifyContent: 'center', alignItems: 'center', padding: 20, marginTop:  50   
        }}>
        <ScrollView>
          <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10,  justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 25, color: 'black' }}>
                Are you sure you want to cancel this reservation?
                </Text>
          </View>
          <View style={{flex:1, flexDirection: 'row', marginBottom: 30, alignContent: 'center'}}>
            <View style={{ width: 50 + '%', flexDirection: 'row',justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                <View style={{ width: 50 + '%', flexDirection: "row", justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center'  }}>
                    <TouchableOpacity style={{backgroundColor: defaultColor, height: 50, padding: 10}}
                        onPress={this.deleteItem.bind(this)}
                        >
                    <Text style={{color: 'white', fontSize: 20 }}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: 50 + '%', flexDirection: 'row',justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center'  }}>
                <View style={{ width: 50 + '%', flexDirection: "row", justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center'  }}>
                    <TouchableOpacity style={{backgroundColor: defaultColor, height: 50, padding: 10}}
                      onPress={this.closePopup.bind(this)} >
                    <Text style={{color: 'white', fontSize: 20 }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
          </View>
          </ScrollView>
        </View>
      </View>
      </Card>
    )
  }
  closePopup() {
    this.props.dispatch({ type: ReduxActions.IS_RES_DELETE_VISIABLE, isDel: false })
  }
  deleteItem() {
    let res=this.props.tobeDel;
    this.props.dispatch({type:SagaActions.DELETE_RESERVATIONS, res});
    this.props.dispatch({ type: ReduxActions.IS_RES_DELETE_VISIABLE, isDel: false });
   }
}
const mapStateToProps = (state) =>{
    return{
        isDel: state.ReservationReducer.isDelResModalVisible,
        tobeDel: state.ReservationReducer.tobeDel
    };
  }
  
  export default connect(mapStateToProps, null)(DeleteReservation)
