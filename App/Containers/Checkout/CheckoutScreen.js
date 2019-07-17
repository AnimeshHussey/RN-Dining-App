import React from 'react';
import { Text, ScrollView, View,  TouchableOpacity, ActivityIndicator,Alert, Dimensions } from 'react-native';
import CheckoutItems from "./CheckOutItems";
import { Toast } from 'native-base';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import ReduxActions from "../../Redux/ActionTypes/Action";
import SagaActions from "../../Sagas/ActionTypes/Action";
import __  from "lodash";
import Modal from "react-native-modal";
import Icon1 from 'react-native-vector-icons/Foundation';
import comStyles from '../Styles/CommonStyles';
import {defaultColor} from '../Styles/CommonStyles';
import NavBar from '../CommonComponents/NavBar';
import {NavigationActions } from 'react-navigation';
import Header from '../CommonComponents/Header';

class CheckoutOrderScreen extends React.Component {
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
  checkoutConfirmation() {
        // Alert.alert('Confirmation', 'Do you want to proceed to checkout?',
        //     [{ text: 'No', onPress: () => {style: 'cancel'} },
        //     { text: 'Yes', onPress: this.checkoutOrder.bind(this) }],
        //     { cancelable: true });
        this.props.dispatch({type:ReduxActions.SHOW_CHECKOUT_MODAL});
    }

    checkoutOrder() { 
       try {
        if(this.props.connectionStatus==='Online'){
            if(this.props.orderNumber)
            {
                this.props.dispatch({type:ReduxActions.HIDE_CHECKOUT_MODAL});
                let checkoutObj={...this.props.CheckOrderDetails}; 
                    checkoutObj.finalCheckout= true;
                    checkoutObj.PriceGroup=this.props.selectedSection.m_Item3;
              this.props.dispatch({type:SagaActions.CHECKOUT_ORDER,Obj:checkoutObj});              
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
       } catch (error) {
       }
        
    }

    componentWillMount() {        
        if(this.props.orderNumber)
        {
          this.props.dispatch({type:SagaActions.GET_CHECKOUT_ORDER_DETAILS,OrderID:this.props.orderNumber,priceGroup:this.props.selectedSection.m_Item3});
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.IsorderCheckedOut !== this.props.IsorderCheckedOut && this.props.IsorderCheckedOut){
        if(!__.isEmpty(this.props.childTables)){
            if(this.props.orderNumber){
                this.props.dispatch({ type: SagaActions.UNBLOCK_TABLE, id:this.props.selectedtable.TableID });       
              }
              else{
                let tables = [...this.props.childTables];
                tables.push(this.props.selectedtable.TableID);
                this.props.dispatch({ type: SagaActions.UNBLOCK_TABLES, TableIds:tables });
              }
        }
        else{
            this.props.dispatch({ type: SagaActions.UNBLOCK_TABLE, id:this.props.selectedtable.TableID });
            }
        this.props.dispatch({type:ReduxActions.RESET_REVIEW_REDUCER});
        this.props.dispatch({type:ReduxActions.RESET_FLOOR_DATA});
        this.props.dispatch({type:ReduxActions.RESET_MENU_REDUCER});
        this.props.dispatch({type:ReduxActions.RESET_TABLE_DATA});
        this.props.dispatch({type:ReduxActions.RESET_NAV_REDUCER});
        this.props.dispatch({type:ReduxActions.RESET_USER_REDUCER});
        this.props.dispatch({type:ReduxActions.RESET_CHECKOUT_REDUCER});

        const resetAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
        NavigationActions.navigate({routeName: "TableStack"})
        ]
        });
        this.props.navigation.dispatch(resetAction);
        }
       } 
      
    containsItem(obj,array){
        let i=0;
        for (i=0;i<array.length;i++){
            if (array[i].ItemID===obj.ItemID){return i}
        }return -1;
    }

    closePopup() {
        this.props.dispatch({ type: ReduxActions.HIDE_CHECKOUT_MODAL, isDel: false })
      }
    render() {        
        let myOrders = [];
        let TotalPrice = 0;
        let TaxRate=0;
        let userName ='';
        let TotalQty=0;
        if(!__.isEmpty(this.props.CheckOrderDetails))
        {  
        let order = Object.assign({},this.props.CheckOrderDetails);
        TotalPrice = order.TotalPrice;
        TaxRate=order.TaxRate;
        userName =  "Order Number: " + order.OrderID;
        //order.customer.customerName  + "\n" +
        myOrders.push(<View style={{flexDirection: 'column', alignItems:'baseline', padding: 20}}>
        <View style={{flex:1, width: 100 + '%', flexDirection: 'row'}}>
            <View style={{flexDirection: 'row',width: 40 + '%', justifyContent: 'flex-start'}}>
                <Text h1 style={{fontWeight: 'bold',fontSize: this.getFontSize(25)  }}>
                ItemName</Text>
            </View>
            <View style={{flexDirection: 'row',width: 20 + '%', justifyContent: 'center'}}>
                <Text h1 style={{fontWeight: 'bold',fontSize: this.getFontSize(25)   }}>
                Rate</Text>
            </View>
            <View style={{flexDirection: 'row',width: 20 + '%', justifyContent: 'center'}}>
                <Text h1 style={{fontWeight: 'bold',fontSize: this.getFontSize(25)   }}>
                Qty</Text>
            </View>
            <View style={{flexDirection: 'row',width: 20 + '%', justifyContent: 'center'}}>
                <Text h1 style={{fontWeight: 'bold',fontSize: this.getFontSize(25)   }}>
                Value</Text>
            </View> 
        </View>
        <View style={{borderBottomColor: 'black', borderBottomWidth: 1}}/>
    </View>);
        if(order.subOrder){            
            let checkoutArr=[];
            order.subOrder.map((data) => {
            data.Orders.map((menuItems) => {
                TotalQty+=menuItems.quantity;
                let index=this.containsItem(menuItems,checkoutArr)
                if(index===-1)
                    {checkoutArr.push(Object.assign({},menuItems));}
                else{
                    checkoutArr[index].quantity=checkoutArr[index].quantity+menuItems.quantity;
                }
            })
            });
            if(checkoutArr.length>0){
                checkoutArr.map((item,i)=>{
                myOrders.push(<CheckoutItems key={i} Items={item} />);})}
        }

    }
        return (
            <View style={{ width: 100 + '%', flexDirection: 'column', height: 100 + '%', justifyContent: 'flex-start' }}>
            <Header></Header>
            <View style={{width: 100 + '%', height: 80 + '%'}}>
                 {!__.isEmpty(this.props.CheckOrderDetails) && <View style={{ flex: 1, flexDirection: 'column' }}>
                    <ScrollView style={{height: 80 + '%', width: 100 + '%'}}>
                        <Card>
                            {myOrders}
                            <View style={{ borderWidth: 0.5, borderColor: 'black', margin: this.getFontSize(10)  }} />
                            {/* <View style={{flex:1,flexDirection: 'row',alignItems: 'baseline', justifyContent: 'flex-end',  paddingRight: 25}}>
                                <Text h1 style={{ justifyContent:'flex-start', fontWeight: 'bold', fontSize: 25 }}>Grand Total Price: {' '}</Text>
                                <Icon name="rupee" style={{justifyContent:'flex-start',  fontSize: 25 , color: 'black'}}>
                                <Text style={{justifyContent:'flex-end',  fontSize: 25, color: 'black' }}> {TotalPrice}</Text>
                                </Icon>
                            </View> */}
                            <View style={{flex:1, width: 100 + '%', flexDirection: 'row', paddingLeft: this.getFontSize(20) , paddingRight: 20}}>
                                <View style={{flexDirection: 'row',width: 40 + '%', justifyContent: 'flex-start'}}>
                                    <Text h1 style={{fontSize: this.getFontSize(18)  , color: 'black' }}>
                                    Total</Text>
                                </View>
                                <View style={{flexDirection: 'row',width: 20 + '%', justifyContent: 'center'}}>
                                    <Text h1 style={{fontSize: this.getFontSize(18)  , color: 'black'  }}>{'   '} 
                                    </Text>
                                </View>
                                <View style={{flexDirection: 'row',width: 20 + '%', justifyContent: 'center'}}>
                                    <Text h1 style={{fontSize: this.getFontSize(18)  , color: 'black'  }}>
                                    {TotalQty}</Text>
                                </View>
                                <View style={{flexDirection: 'row',width: 20 + '%', justifyContent: 'center'}}>
                                    <Text h1 style={{fontSize: this.getFontSize(18)   , color: 'black' }}>
                                    {TotalPrice}</Text>
                                </View> 
                            </View>
                            <View style={{ borderWidth: 0.5, borderColor: 'black', margin: 10 }} />
                            {/* <View style={{flex:1, width: 100 + '%', flexDirection: 'row', paddingLeft: this.getFontSize(20) , paddingRight: this.getFontSize(20) }}>
                                <View style={{flexDirection: 'row',width: 40 + '%', justifyContent: 'flex-start'}}>
                                    <Text h1 style={{fontSize: this.getFontSize(18)  , color: 'black' }}>
                                    </Text>
                                </View>
                                <View style={{flexDirection: 'row',width: 20 + '%', justifyContent: 'center'}}>
                                    <Text h1 style={{fontSize: this.getFontSize(18)  , color: 'black'  }}>{'   '} 
                                    </Text>
                                </View>
                                <View style={{flexDirection: 'row',width: 20 + '%', justifyContent: 'center'}}>
                                    <Text h1 style={{fontSize: this.getFontSize(18)  , color: 'black'  }}>
                                    {"GST("+TaxRate +"%): "}</Text>
                                </View>
                                <View style={{flexDirection: 'row',width: 20 + '%', justifyContent: 'center'}}>
                                    <Text h1 style={{fontSize: this.getFontSize(18)   , color: 'black' }}>
                                    {TotalPrice * (TaxRate/100)}</Text>
                                </View> 
                            </View>
                            <View style={{ borderWidth: 0.5, borderColor: 'black', margin: this.getFontSize(10)  }} />
                            <View style={{flex:1,flexDirection: 'row',alignItems: 'baseline', justifyContent: 'flex-end',  paddingRight: 25}}>
                                <Text h1 style={{ justifyContent:'flex-start', fontWeight: 'bold', fontSize: this.getFontSize(25)  }}>Grand Total Price: {' '}</Text>
                                <Icon name="rupee" style={{justifyContent:'flex-start',  fontSize: this.getFontSize(25)  , color: 'black'}}>
                                <Text style={{justifyContent:'flex-end',  fontSize: this.getFontSize(25) , color: 'black' }}> {TotalPrice + (TotalPrice * (TaxRate/100))}</Text>
                                </Icon>
                            </View> */}
                        </Card>
                    </ScrollView>
                    { TotalPrice>0 &&<View style={{flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', height: this.getFontSize(50) }}>
                    <TouchableOpacity style={{width: 70+ '%', borderRadius: this.getFontSize(45),  height: this.getFontSize(50), alignItems: 'center',
                     alignSelf: 'center', borderColor: '#fff', borderWidth: 1,
                     flexDirection: 'row', alignContent: 'center', justifyContent: 'center', backgroundColor: defaultColor}}
                     onPress={this.checkoutConfirmation.bind(this)}>
                        {/* <Button large icon={{ name: 'envira', type: 'font-awesome' }} 
                            backgroundColor={defaultColor} fontFamily='Lato' buttonStyle={{ marginLeft: 0, marginRight: 0,  }}
                            title='Checkout Order' /> */}
                            <Icon1 name="dollar-bill" style={{fontSize: this.getFontSize(25), color: '#fff'}}/>
                            <Text style={{fontSize: this.getFontSize(25), color: '#fff'}}>{'  '}</Text>
                            <Text style={{fontSize: this.getFontSize(25), color: '#fff'}}>Check out</Text>
                    </TouchableOpacity>
                        </View> }
                </View>}
                {__.isEmpty(this.props.CheckOrderDetails) && <View style={[comStyles.rowContainer, comStyles.horizontal]}>
                     <ActivityIndicator size="large" color="red" /></View>}
            </View>
            <View style={{ flex: 1, height: 70 }}>
            <NavBar navigation={this.props.navigation}/>
          </View>
          {this.props.showCheckoutModal &&
                  <Modal backdropColor="black" transparent={true} style={{
                    borderRadius: this.getFontSize(5), opacity: 0.8,
                    alignContent: 'center', alignSelf: 'center', alignContent: 'center'
                  }} visible={this.props.isUserModalVisible}
                    onBackdropPress={this.closePopup.bind(this)} onRequestClose={this.closePopup.bind(this)}>
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        borderWidth: 0.5, borderColor: 'black', height: 200, width: 600, backgroundColor: 'white'
          }}>
        <View style={{
          width: 100 + '%', backgroundColor: defaultColor, position: 'absolute', top: 0, left: 0,
          justifyContent: 'center', alignItems: 'center', height: 50, zIndex: 2
          }}>
          <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>
            Checkout Order
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
              Do you want to proceed to checkout ?
                </Text>
          </View>
          <View style={{flex:1, flexDirection: 'row', marginBottom: 30, alignContent: 'center'}}>
            <View style={{ width: 50 + '%', flexDirection: 'row',justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                <View style={{ width: 50 + '%', flexDirection: "row", justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center'  }}>
                    <TouchableOpacity style={{backgroundColor: defaultColor, height: 50, padding: 10}} onPress={this.checkoutOrder.bind(this)} >
                    <Text style={{color: 'white', fontSize: 20 }}>Yes</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: 50 + '%', flexDirection: 'row',justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center'  }}>
                <View style={{ width: 50 + '%', flexDirection: "row", justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center'  }}>
                    <TouchableOpacity style={{backgroundColor: defaultColor, height: 50, padding: 10}} onPress={this.closePopup.bind(this)} >
                    <Text style={{color: 'white', fontSize: 20 }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
          </View>
          </ScrollView>
        </View>
      </View>
      </Modal>}
        </View>
        )
    }
}


const mapStateToProps=(state)=>{
    return{
        CheckOrderDetails: state.checkOutReducer.CheckoutOrderDetails,
        selectedtable: state.floorReducer.selectedtable,
        orderNumber:state.menuReducer.orderNumber,
        selectedSection:state.floorReducer.selectedSection,
        IsorderCheckedOut:state.checkOutReducer.isCheckoutOrderSuccessfully,
        height: state.DashBoardReducer.height,
        width: state.DashBoardReducer.width,
        connectionStatus: state.loginReducer.connectionStatus,
        showCheckoutModal:state.checkOutReducer.showCheckoutModal,
        childTables: state.tableReducer.childTables
    }
}
export default connect(mapStateToProps,null) (CheckoutOrderScreen);