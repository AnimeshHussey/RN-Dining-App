import React from 'react';
import { Text, View } from 'react-native';
import CheckoutItems from './CheckOutItems';
import{orderColor} from '../Styles/CommonStyles';

export default class CheckoutModes extends React.Component {
    constructor() {
        super();
    }

    render() { 
        let ordersType = [];
        let Modeinfo="  Price:"+this.props.mode.defaultItemPrice+"X"+this.props.mode.quantity+"="+
        this.props.mode.defaultItemPrice*this.props.mode.quantity;
        myOrder = this.props.mode.orders.map((data,i) =>{
            ordersType.push(<CheckoutItems key={i} orders={data}/>);
        });
        return (
            
            <View style={{flexDirection: 'column',flexWrap: 'wrap'}}>
                    <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'baseline'}}>
                    <Text style={{ color: orderColor[3],fontWeight: 'bold',fontSize: 20 }}> {this.props.mode.modeName}  
                    </Text>
                    <Text h1 style={{fontWeight: 'bold',fontSize: 18 }}>{Modeinfo}</Text>
                    </View>
                    <View style={{borderBottomColor: 'black', borderBottomWidth: 1, justifyContent:'space-between', alignItems:'baseline'}}/>  
                    {ordersType}   
            </View>
        )
        
    }
}