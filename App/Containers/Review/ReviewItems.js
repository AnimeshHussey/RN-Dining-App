import React from 'react';
import { TouchableOpacity, Text, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import ReduxActions from "../../Redux/ActionTypes/Action";

class ReviewItems extends React.Component {
    constructor() {
        super();
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

    cancelItem = (itemID,itemName) => {
        this.props.cancelItem(itemID,itemName);          
    }

    changeQuatity= (itemID,itemName,itemQuantity) => {
        this.props.changeQuatity(itemID,itemName,itemQuantity);          
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }} onLayout={this.onLayout.bind(this)}>
                <View style={{ flex: 1,flexDirection: 'row' }}>                
                    <View style={{
                        flexDirection: 'row', width: 50 + '%', justifyContent: 'flex-start',
                        alignContent: 'flex-end', alignItems: 'flex-end', alignSelf: 'flex-end'
                    }}>
                    {this.props.items.status==="APPROVED" && <TouchableOpacity disabled={this.props.items.status==="CANCELLED"} style={{ width: 10 + '%', height: this.getFontSize(30),
                                justifyContent: 'center', alignContent: 'center',
                                alignItems: 'center', alignSelf: 'center'}} onPress={this.cancelItem.bind(this,this.props.items.ItemID,this.props.items.ItemName)}>
                                <Icon name="delete-forever" style={{ fontSize: this.getFontSize(30), color: 'black' }}></Icon>
                    </TouchableOpacity>}
                        {this.props.items.status==="APPROVED" && <Text style={{ fontSize: this.getFontSize(18) }}>
                             {this.props.items.ItemName}</Text>}
                        {this.props.items.status==="CANCELLED" && <Text style={{ fontSize: this.getFontSize(18),textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>
                            {this.props.items.ItemName}</Text>}
                    {(this.props.items.status==="APPROVED" && this.props.items.quantity>1) && <TouchableOpacity disabled={this.props.items.status==="CANCELLED"} style={{ width: 10 + '%', height: this.getFontSize(30),
                                justifyContent: 'center', alignContent: 'center',
                                alignItems: 'center', alignSelf: 'center'}} onPress={this.changeQuatity.bind(this,this.props.items.ItemID,this.props.items.ItemName,this.props.items.quantity)}>
                                <Icon1 name="edit" style={{ fontSize: this.getFontSize(30), color: 'black' }}></Icon1>
                    </TouchableOpacity>}        
                    </View>
                    <View style={{
                        flexDirection: 'row', width: 50 + '%', justifyContent: 'flex-end',
                        alignContent: 'flex-end', alignItems: 'flex-end', alignSelf: 'flex-end'
                    }}>
                      {this.props.items.status==="APPROVED" &&  <Text style={{ fontSize: this.getFontSize(18) }}>
                            Price:{this.props.items.ItemPrice}X{this.props.items.quantity}={this.props.items.ItemPrice * this.props.items.quantity}
                        </Text>}
                        {this.props.items.status==="CANCELLED" &&  <Text style={{ fontSize: this.getFontSize(18),textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>
                            Price:{this.props.items.ItemPrice}X{this.props.items.quantity}={this.props.items.ItemPrice * this.props.items.quantity}
                        </Text>}
                    </View>                   
                </View> 
                {this.props.items.status==="APPROVED" && <View style={{ flex: 1, width: 100 + '%', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                    {this.props.items.Comments!== null && <View style={{ paddingLeft:5+'%',
                        flexDirection: 'row', width: 100 + '%', justifyContent: 'flex-start',
                        alignContent: 'flex-start', alignItems: 'flex-start', alignSelf: 'flex-start'
                    }}>
                        <Text style={{ fontSize: this.getFontSize(18) }}>Remarks:</Text>
                        <Text style={{ fontSize: this.getFontSize(18) }}>{' '}</Text>
                        <Text style={{ fontSize: this.getFontSize(18) }}>
                            {this.props.items.Comments}</Text>
                    </View>}
                </View>}
            </View>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        height: state.DashBoardReducer.height,
        width: state.DashBoardReducer.width
    }
}

export default connect(mapStateToProps, null)(ReviewItems)