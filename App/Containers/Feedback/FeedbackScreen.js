import React, { Component } from 'react'
import { ScrollView, Text, Alert, View, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native'
import { Card , Toast} from 'native-base';
import { connect } from 'react-redux';
import ReduxActions from "../../Redux/ActionTypes/Action";
import SagaActions from "../../Sagas/ActionTypes/Action";
import Icon from 'react-native-vector-icons/Entypo';
import { defaultColor, supportingColor } from '../Styles/CommonStyles';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { NavigationActions } from 'react-navigation';
class Feedback extends Component {
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
  render() {
    let QuestionCards = [];
    this.props.questionnaire.Questions.map((element, index) => {
      QuestionCards.push(
        <Card key={index} style={{
          width: 99 + '%', backgroundColor: '#fff', height: Math.min(this.props.width, this.props.height) / 4, margin: 10,
          borderWidth: 0.3, flexDirection: 'column', padding: 5, opacity: 1, zIndex: 15
        }}>
          <View style={{ flexDirection: 'column', marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
          {!this.props.isUserInfopage && <View style={{
              width: 100 + '%', justifyContent: 'center', alignContent: 'center',
              alignItems: 'center', alignSelf: 'center'
            }}>
              <Text style={{ color: 'black', fontSize: (this.props.width* this.props.height)*0.00004, fontWeight: 'bold' }}>{element.Question}</Text>
            </View>}
           {!this.props.isUserInfopage && <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{
                justifyContent: 'flex-end', alignSelf: 'flex-start',
                marginLeft: -20, marginTop: -25, width: 55
              }}>
              </TouchableOpacity>
              <View style={{
                width: 70 + '%', height: Math.min(this.props.width, this.props.height) / 8, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center',
                alignItems: 'center', alignSelf: 'center', backgroundColor: supportingColor
              }}>

                <TouchableOpacity style={{
                  width: 30 + '%', height: Math.min(this.props.width, this.props.height) / 11, flexDirection: 'row',
                  backgroundColor: element.Answer === '1' ? '#fff' : defaultColor,
                  alignItems: 'center', justifyContent: 'center', borderRadius: 10, padding: 5,
                  opacity: element.Answer === 1 ? 0.8 : 1
                }}
                  //  disabled={true}
                  onPress={this.setServiceFeedback.bind(this, index, '1')}
                >
                  <Icon2 name="sentiment-dissatisfied" style={{
                    fontSize: (this.props.width* this.props.height)*0.000030,
                    //  color: 'red'
                    color: '#fff',
                    backgroundColor: 'red',
                    borderRadius: 30, marginRight: 3
                  }}></Icon2>
                  <Text style={{ color: element.Answer === '1' ? defaultColor : '#fff', fontSize: (this.props.width* this.props.height)*0.000025, fontWeight: 'bold' }}>Dissatisfied</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  width: 30 + '%', height: Math.min(this.props.width, this.props.height) / 11, flexDirection: 'row',
                  backgroundColor: element.Answer === '2' ? '#fff' : defaultColor,
                  alignItems: 'center', justifyContent: 'center', borderRadius: 10, padding: 5,
                  opacity: element.Answer === '2' ? 0.8 : 1
                }}
                  //  disabled={true}
                  onPress={this.setServiceFeedback.bind(this, index, '2')}
                >
                  <Icon2 name="sentiment-neutral" style={{
                    fontSize: (this.props.width* this.props.height)*0.00003,
                    //  color: 'orange'
                    color: '#fff',
                    backgroundColor: 'orange',
                    borderRadius: 30, marginRight: 3
                  }}></Icon2>
                  <Text style={{ color: element.Answer === '2' ? defaultColor : '#fff', fontSize: (this.props.width* this.props.height)*0.000025, fontWeight: 'bold' }}>Neutral</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  width: 30 + '%', height: Math.min(this.props.width, this.props.height) / 11, flexDirection: 'row',
                  backgroundColor: element.Answer === '3' ? '#fff' : defaultColor,
                  alignItems: 'center', justifyContent: 'center', borderRadius: 10, padding: 5,
                  opacity: element.Answer === '3' ? 0.8 : 1
                }}
                  onPress={this.setServiceFeedback.bind(this, index, '3')}>
                  <Icon2 name="sentiment-satisfied" style={{ fontSize: (this.props.width* this.props.height)*0.00003, color: '#fff', backgroundColor: 'green', borderRadius: 30, marginRight: 3 }}></Icon2>
                  <Text style={{ color: element.Answer === '3' ? defaultColor : '#fff', fontSize: (this.props.width* this.props.height)*0.000025, fontWeight: 'bold' }}>Satisfied</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={{ justifyContent: 'flex-end', alignSelf: 'flex-start', marginLeft: -20, marginTop: -25, width: 55 }}
                onPress={this.setServiceFeedback.bind(this, index, null)}
              >
                {element.Answer !== null && <Icon name="circle-with-cross" style={{ color: 'black', fontSize: (this.props.width* this.props.height)*0.000055}}></Icon>}
              </TouchableOpacity>
            </View>}
          {this.props.isUserInfopage && <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, flexDirection: 'row',marginBottom: this.getFontSize(10) }}>
            <View style={{ width: 50 + '%', flexDirection: "column", }}>
              <Text style={{ fontSize: this.getFontSize(30), color: 'black' }}>
              {element.Question}
              </Text>
            </View>
            <View style={{ width: 50 + '%', flexDirection: "column" }}>
                <View style={{ width: 80 + '%' }}>
                  <TextInput underlineColorAndroid='transparent'style={{ height: this.getFontSize(40), borderColor: 'black', borderWidth: 0.5, paddingBottom: 2,
                     paddingTop: 2, fontSize: this.getFontSize(25), backgroundColor: '#fff', color: 'black',opacity: 1  }} 
                     onChangeText={(text) => this.textValidation(text,element.Question)} value={element.QuestionID===1?this.props.feedbackUserName:this.props.feedbackUserNumber} />
                </View>
            </View>
            </View>
          </View>}
          
          </View>
        </Card>)
    })
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}  onLayout={this.onLayout.bind(this)}>
        <ScrollView style={{ height: 570, flex: 1, zIndex: 7, width: 100 + "%" }}>
          {QuestionCards}
        </ScrollView>
        <Image source={require('../../Images/rest2.jpg')}
          style={{
            width: 100 + '%', height: 100 + '%',
            position: 'absolute',
            borderBottomWidth: 2,
            borderColor: 'black',
            backgroundColor: '#EEEEEE', zIndex: 1
          }}
        />
        {this.props.lastpage && <Card style={{
          backgroundColor: 'black', position: 'absolute', bottom: 0,
          right: 45, height: 60, width: 100, zIndex: 200, borderRadius: 10, alignContent: 'center', alignItems: 'center', justifyContent: 'center'
        }}>
          <TouchableOpacity style={{
            height: 70, width: 150, zIndex: 200, borderRadius: 10, alignSelf: 'center',
            alignItems: 'center', justifyContent: 'center'
          }} onPress={this.Submit.bind(this)}>

            <Text style={{ color: 'white',fontSize: (this.props.width* this.props.height)*0.000030 }}>Submit</Text>
          </TouchableOpacity></Card>}
      </View>
    )
  }
  
  Submit() {
    if(this.props.connectionStatus==='Online'){
      if(this.props.feedbackUserNumber.length === 10 && /^[0-9]{1,10}$/.test(this.props.feedbackUserNumber) && this.props.feedbackUserName.trim()!==''){ 
      let answers=[...this.props.feedbackQuestions];
      answers.forEach(element => {
       if(element.Category==="Customer Info"){
          element.Questions.forEach(item => {
          if(item.Question.toLowerCase().includes("mobile"))
            item.Answer= this.props.feedbackUserNumber;
          else
            item.Answer= this.props.feedbackUserName;
        })
       }
      });
      this.props.dispatch({ type: SagaActions.SET_FEEDBACK_QUESANS, feed: answers,  orderID: this.props.FeedbackOrderID });
      this.props.dispatch({ type: ReduxActions.SETADMIN_PASSWORD, adminPassword: "" });
      this.props.dispatch({type:ReduxActions.RESET_LOGIN_SUCCESSFULLY});
      const resetAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
        NavigationActions.navigate({routeName: "LoginScreen"})
        ]
        });
        this.props.navigation.dispatch(resetAction);
    } 
    else {
      Toast.show({
        text: 'Please check your mobile number/name on customer info page.',
        textStyle: { fontSize: 25, fontFamily:'Avenir-Black',fontWeight:'bold' },
        duration: 3000,
        buttonTextStyle:{fontSize: 20, fontFamily:'Avenir-Black'},
        buttonText: "Okay",
        type: "danger"
      })
    }
  }
  else {
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
  setServiceFeedback(index, val) {
    let questions = Object.assign([], this.props.feedbackQuestions);
    let finalArr = [];
    questions.forEach((element, itemindex) => {
      if (element.Category === this.props.questionnaire.Category) {
        let obj = { ...element };
        let arr = obj.Questions.map((itemelement, itemindex) => {
          let newObj = { ...itemelement };
          if (itemindex === index) {
            newObj.Answer = val;
          }
          return newObj;
        })
        finalArr.push({ CatID: obj.CatID, Category: obj.Category, Questions: arr });
      }
      else {
        finalArr.push(element);
      }
    });
    this.props.dispatch({ type: ReduxActions.SET_FEEDBACK_QUESTIONS, response: finalArr });
  }
  textValidation(inputtxt,question){
    if(question.toLowerCase().includes("mobile"))
    this.props.dispatch({ type: ReduxActions.SET_FEEDBACK_USER_NUMBER,  number: inputtxt });
    else      
    this.props.dispatch({ type: ReduxActions.SET_FEEDBACK_USER_NAME,  name: inputtxt});

    // if(inputtxt.length === 10 && /^[0-9]{1,10}$/.test(inputtxt)){
    // }
  }
}

const mapStateToProps = (state) => {
  return {
    // serviceFeedback: state.FeedbackReducer.serviceFeedback,
    feedbackQuestions: state.FeedbackReducer.FeedbackQuestions,
    FeedbackOrderID: state.FeedbackReducer.FeedbackOrderID,
    feedbackUserNumber:state.FeedbackReducer.feedbackUserNumber,
    feedbackUserName:state.FeedbackReducer.feedbackUserName,
    height: state.DashBoardReducer.height,
    width: state.DashBoardReducer.width,
    connectionStatus: state.loginReducer.connectionStatus
  };
}

export default connect(mapStateToProps, null)(Feedback)