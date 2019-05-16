import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Card } from 'native-base';
import { Text, ActivityIndicator,View } from 'react-native';
import ReduxActions from "../../Redux/ActionTypes/Action";
import SagaActions from "../../Sagas/ActionTypes/Action";
import { connect } from 'react-redux';
import { defaultColor, supportingColor } from '../Styles/CommonStyles';
import Feedback from './FeedbackScreen'

class FeedbackTabs extends React.Component {
  constructor() {
    super();
  }
  componentWillMount() {
    this.props.dispatch({ type: SagaActions.GET_FEEDBACK_QUESTIONS });
  }
  render() {
    let tabArr= [];
    {this.props.feedbackQuestions.length>0 && this.props.feedbackQuestions.forEach((item, index) => {
    tabArr.push(<Tab  heading={<TabHeading style={{ backgroundColor: defaultColor, height: 60 }}>
    <Text style={{ fontSize: 20, color: '#fff' }}>{this.props.feedbackQuestions[index].Category}</Text></TabHeading>}>
    <Feedback navigation={this.props.navigation} isUserInfopage={this.props.feedbackQuestions[index].Category==="Customer Info"?true:false} 
    questionnaire={this.props.feedbackQuestions[index]}  lastpage={index+1===this.props.feedbackQuestions.length? true: false} />
    </Tab>)
    })}
    return (
      <Container style={{
            width: 100 + '%', flexDirection: 'column', zIndex: 2, opacity: 0.8,
            justifyContent: 'center', alignItems: 'center', padding: 2
            , backgroundColor: 'transparent'
          }}>
          <Card style={{backgroundColor: 'white',opacity: 1, zIndex: 5}}>
          {this.props.feedbackQuestions.length===0 && <View style={{
          height: 100 + '%', width: 100 + '%', position: 'absolute', zIndex: 100, backgroundColor: '#fff',
          justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center', opacity: 1
        }}>
          <ActivityIndicator size="large" color={'green'} /></View>}
          {this.props.feedbackQuestions.length>0 && <Tabs style={{ height: 60}}>
            {tabArr}
          </Tabs>}
          </Card>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
        feedbackQuestions:state.FeedbackReducer.FeedbackQuestions
  };
}

export default connect(mapStateToProps, null)(FeedbackTabs)