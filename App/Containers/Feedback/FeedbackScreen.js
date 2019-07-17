import React, { Component } from 'react'
import { ScrollView, Text, Alert, View, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native'
import { Card , Toast,DatePicker} from 'native-base';
import { connect } from 'react-redux';
import ReduxActions from "../../Redux/ActionTypes/Action";
import SagaActions from "../../Sagas/ActionTypes/Action";
import Icon from 'react-native-vector-icons/Entypo';
import { defaultColor, supportingColor } from '../Styles/CommonStyles';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { NavigationActions } from 'react-navigation';
import RatingComponent from '../../Components/Rating';
import moment from "moment";
class Feedback extends Component {

  onLayout(e) {
    const { width, height } = Dimensions.get('window');
    this.props.dispatch({ type: ReduxActions.SCREEN_WIDTH, width: width });
    this.props.dispatch({ type: ReduxActions.SCREEN_HEIGHT, height: height });
  }

  _showDateTimePicker = () => 
  {if(!this.props.isDateTimePickerVisible)
  this.props.dispatch({type:ReduxActions.IS_RESRV_DATETIME_VISIBLE, isVisible: true })};

  _hideDateTimePicker = () => {
    if(this.props.isDateTimePickerVisible)
    this.props.dispatch({type:ReduxActions.IS_RESRV_DATETIME_VISIBLE, isVisible: false })};

  _handleDatePicked = (index,date) => {
    var submittedTime = moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss'+'.000Z');
    this.props.dispatch({ type: ReduxActions.SET_DATE_TIME, dateTime:submittedTime });
    this.setServiceFeedback(index, submittedTime);
    this._hideDateTimePicker();
  };

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

  componentDidUpdate(prevState,newState){
    try {
      if(prevState.isFeedbackSubmitted !== this.props.isFeedbackSubmitted && this.props.isFeedbackSubmitted){
        const resetAction = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
          NavigationActions.navigate({routeName: "LoginScreen"})
          ]
          });
          this.props.navigation.dispatch(resetAction);
      }
    } catch (error) {
      this.props.dispatch({ type: ReduxActions.FAILED_TO_SET_FFEDBACK_QUESTIONS});
    }
  }

  changeRating=(rating)=>{
   this.props.dispatch({type:ReduxActions.SET_FEEDBACK_RATING,Rating:rating});
  }

  render() {
    let QuestionCards = [];
    this.props.questionnaire.Questions.map((element, index) => {
      QuestionCards.push(
        <Card key={index} style={{
          width: 99 + '%', backgroundColor: '#fff', height: Math.min(this.props.width, this.props.height) / 6, margin: 10,
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
                alignItems: 'center', alignSelf: 'center'}}>
              {element.AnswerOptions && element.AnswerOptions.map((each,qstnIndex)=>{
                return(
                <TouchableOpacity style={{
                  width:`${element.AnswerOptions.length===2?'20%':'30'}`, height: Math.min(this.props.width, this.props.height) / 11, flexDirection: 'row',
                  backgroundColor: element.Answer === each ? '#fff' : defaultColor,
                  alignItems: 'center', justifyContent: 'center', borderRadius: 10, padding: 5,
                  opacity: element.Answer === each ? 0.8 : 1
                }}onPress={this.setServiceFeedback.bind(this, index, each)}>
                  <Icon2 name={qstnIndex===0?"sentiment-dissatisfied":"sentiment-satisfied"}
                  style={{ fontSize: (this.props.width* this.props.height)*0.00006,
                  color: '#fff', backgroundColor:`${qstnIndex===0?"red":"green"}`, borderRadius: 30, marginRight: 3 }}></Icon2>
                <Text style={{ color: element.Answer === each ? defaultColor : '#fff', fontSize: (this.props.width* this.props.height)*0.000025, fontWeight: 'bold' }}>{each}</Text>
                </TouchableOpacity>)})}
                {!element.AnswerOptions && <View style={{ width: 75 + '%', flexDirection: "row", justifyContent: "center" }}>
                <View style={{ width: 75 + '%' }}>
                  <TextInput underlineColorAndroid='transparent'style={{ height: this.getFontSize(60), borderColor: 'black', borderWidth: 0.5, paddingBottom: 2,
                     paddingTop: 2, fontSize: this.getFontSize(35), backgroundColor: '#fff', color: 'black',opacity: 1, justifyContent: 'center' }} 
                     onChangeText={(text) => this.setServiceFeedback(index, text)} value={element.Answer} />
                </View>
            </View>}
              </View>
              <TouchableOpacity style={{ justifyContent: 'flex-end', alignSelf: 'flex-start', width: 55 }}
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
            </View>
            <View style={{ width: 50 + '%', flexDirection: "column" }}>
            {(element.AnswerOptions===null && element.QuestionID!==3) &&
              <View style={{ width: 80 + '%' }}>
                  <TextInput underlineColorAndroid='transparent'style={{ height: this.getFontSize(40), borderColor: 'black', borderWidth: 0.5, paddingBottom: 2,
                     paddingTop: 2, fontSize: this.getFontSize(25), backgroundColor: '#fff', color: 'black',opacity: 1  }} 
                     onChangeText={(text) => this.textValidation(text,element.QuestionID)} 
                     value={element.QuestionID===1?this.props.feedbackUserName:this.props.feedbackUserNumber} />
                </View>}
            {(element.QuestionID===3 && element.AnswerOptions===null) && 
              <View style={{ width: 80 + '%' }}>
              <RatingComponent changedRating={this.changeRating.bind(this)} starCount={this.props.feedbackRating}/>
              </View>}
            {(element.AnswerOptions!==null && Array.isArray(element.AnswerOptions)) &&
              <View style={{ width: 80 + '%' }}>
                <TouchableOpacity itemColor={defaultColor} 
                      onPress={this._showDateTimePicker.bind(this)}
                        style={{
                          height: 40, borderColor: 'black', borderWidth: 0.5, backgroundColor: '#fff',
                          opacity: 1, fontSize: 25, paddingBottom: 5
                        }} >
                          <DatePicker
                        defaultDate={new Date(new Date().getFullYear()-18, new Date().getMonth-1, new Date().getDay())}
                        maximumDate={new Date()}
                        locale={"en"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText="Select DOB"
                        textStyle={{ color: "green" }}
                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                        onDateChange={this._handleDatePicked.bind(this,index)}
                        disabled={false}
                        />
                      </TouchableOpacity>
                </View>}
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
      if(parseFloat(this.props.feedbackRating,10)<=10 && parseFloat(this.props.feedbackRating,10)>=1){
      if(this.props.feedbackUserNumber.length === 10 && /^[0-9]{1,10}$/.test(this.props.feedbackUserNumber.trim()) && this.props.feedbackUserName.trim()!==''){ 
      let answers=[...this.props.feedbackQuestions];
      answers.forEach(element => {
       if(element.CatID===0){
          element.Questions.forEach(item => {
          if(item.QuestionID === 1) item.Answer = this.props.feedbackUserName.trim();
          else if(item.QuestionID === 2) item.Answer = this.props.feedbackUserNumber.trim();
          else if(item.QuestionID === 3) item.Answer = this.props.feedbackRating;
          else item.Answer = this.props.dateTime;
        })
       }
      });
      this.props.dispatch({ type: SagaActions.SET_FEEDBACK_QUESANS, feed: answers,  orderID: this.props.FeedbackOrderID });
      this.props.dispatch({ type: ReduxActions.SETADMIN_PASSWORD, adminPassword: "" });
      this.props.dispatch({type:ReduxActions.RESET_LOGIN_SUCCESSFULLY});
      this.props.dispatch({type:ReduxActions.RESET_FEEDBACK_REDUCER});
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
  else{
    Toast.show({
      text: 'Ratings can only be between 1 and 10',
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
  textValidation(inputtxt,questionID){
    // if(question.toLowerCase().includes("mobile"))
    if(questionID===1)this.props.dispatch({ type: ReduxActions.SET_FEEDBACK_USER_NAME,  name: inputtxt});
    
    else if(questionID===2)this.props.dispatch({ type: ReduxActions.SET_FEEDBACK_USER_NUMBER,  number: inputtxt });
    else this.props.dispatch({ type: ReduxActions.SET_FEEDBACK_RATING,  rating: inputtxt});
    // if(inputtxt.length === 10 && /^[0-9]{1,10}$/.test(inputtxt)){
    // }
  }
}

const mapStateToProps = (state) => {
  return {
    serviceFeedback: state.FeedbackReducer.serviceFeedback,
    feedbackQuestions: state.FeedbackReducer.FeedbackQuestions,
    FeedbackOrderID: state.FeedbackReducer.FeedbackOrderID,
    feedbackUserNumber:state.FeedbackReducer.feedbackUserNumber,
    feedbackUserName:state.FeedbackReducer.feedbackUserName,
    height: state.DashBoardReducer.height,
    width: state.DashBoardReducer.width,
    connectionStatus: state.loginReducer.connectionStatus,
    isDateTimePickerVisible:state.ReservationReducer.isDateTimePickerVisible,
    dateTime: state.ReservationReducer.dateTime,
    feedbackRating:state.FeedbackReducer.feedbackRating,
    isFeedbackSubmitted:state.FeedbackReducer.isFeedbackSubmitted
  };
}

export default connect(mapStateToProps, null)(Feedback)