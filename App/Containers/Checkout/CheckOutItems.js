import React from 'react';
import { Text, View } from 'react-native';

export default class CheckoutItems extends React.Component {
    constructor() {
        super();
    }

    render() { 
        return (
        <View style={{flex:1, width: 100 + '%', flexDirection: 'row', paddingLeft: 20, paddingRight: 20}}>
            <View style={{flexDirection: 'row',width: 40 + '%', justifyContent: 'flex-start'}}>
            {this.props.Items.status==="APPROVED" && <Text h1 style={{fontSize: 18 , color: 'black' }}>
                {this.props.Items.ItemName}</Text>}
            {this.props.Items.status==="CANCELLED" && <Text h1 style={{fontSize: 18 , color: 'red' }}>
                {this.props.Items.ItemName}</Text>}
            </View>
            <View style={{flexDirection: 'row',width: 20 + '%', justifyContent: 'center'}}>
                <Text h1 style={{fontSize: 18 , color: 'black'  }}>
                {this.props.Items.ItemPrice}</Text>
            </View>
            <View style={{flexDirection: 'row',width: 20 + '%', justifyContent: 'center'}}>
                <Text h1 style={{fontSize: 18 , color: 'black'  }}>
                {this.props.Items.quantity}</Text>
            </View>
            <View style={{flexDirection: 'row',width: 20 + '%', justifyContent: 'center'}}>
            {this.props.Items.status==="APPROVED" && <Text h1 style={{fontSize: 18  , color: 'black' }}>
                {this.props.Items.ItemPrice*this.props.Items.quantity}</Text>}
                {this.props.Items.status==="CANCELLED" && <Text h1 style={{fontSize: 18  , color: 'black'}}>
                {"0.00"}</Text>}
            </View> 
        </View>
        )
        
    }
}