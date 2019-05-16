import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TextField } from 'react-native-material-textfield';


export default class Customer extends React.Component {

   txtChange(event){
    this.props.changeField(event.nativeEvent.text, this.props.type);
   }

  render() {
    return (
        <TextField
              fontSize={25}
              labelFontSize={25}
              titleFontSize={38}
              disabled={this.props.isDisabled}
              label={this.props.label}
              value={this.props.value}
              onChange={this.txtChange.bind(this) }
              tintColor= {this.props.tintColor}
              baseColor= "#039be5"
              textColor	="#424242"
              autoFocus = {this.props.shouldFocus}
              keyboardType={this.props.keyboardTextType}
              placeholder={this.props.placeholder}
              secureTextEntry={this.props.secureTextEntry}
              error={this.props.error}
              errorColor={this.props.errorColor}
            />
    );
  }
}
