import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {h1,Badge} from 'react-native-elements';
import ReviewItems from '../Review/ReviewItems';

export default class ReviewModes extends React.Component {
    constructor() {
        super();
    }
        render() { 
            let ordersType = [];
            let Modeinfo="  Price:"+this.props.mode.defaultItemPrice+"X"+this.props.mode.quantity+"="+
            this.props.mode.defaultItemPrice*this.props.mode.quantity;
            myOrder = this.props.mode.orders.map((data,i) =>{
                ordersType.push(<ReviewItems key={i} orders={data}/>);
            });
            return (
                
                <View style={{flexDirection: 'column',flexWrap: 'wrap'}}>
                        <View style={{flexDirection: 'row',flexWrap:'nowrap', alignItems:'baseline',justifyContent:'space-between'}}>
                        <Text  style={{ color: 'orange',fontWeight: 'bold',fontSize: 20 }}>
                        {this.props.mode.modeName}
                        </Text>
                        <Text h1 style={{color: 'green', fontWeight: 'bold',fontSize: 18 }}>{Modeinfo}</Text>
                        </View>
                        <View style={{borderBottomColor: 'black', borderBottomWidth: 1, justifyContent:'space-between', alignItems:'baseline'}}/>  
                        {ordersType} 
                            
                </View>
            )
            
        }
    }