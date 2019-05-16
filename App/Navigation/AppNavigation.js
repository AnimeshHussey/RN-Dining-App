import {Animated, Easing } from 'react-native';
import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/CommonComponents/LaunchScreen'
import styles from './Styles/NavigationStyles'
import WelcomeHRPL from '../Containers/CommonComponents/Welcome'
import TableScreen from '../Containers/Table/TableScreen'
import MenuScreen from '../Containers/Order/MenuScreen'
import ReviewScreen from '../Containers/Review/ReviewOrder'
import CheckoutScreen from '../Containers/Checkout/CheckoutScreen'
import LoginScreen from "../Containers/Login_Register/LoginScreen"
import Reservation from "../Containers/Reservation/Reservation"
import SearchReservation from "../Containers/Reservation/SearchReservation"
import TableModal from "../Containers/Feedback/TableModal"
import FeedbackTabs from "../Containers/Feedback/FeedbackTab"
import AppSettingsComponent from "../Containers/CommonComponents/AppSettings"

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
        const { position, layout, scene, index, scenes } = sceneProps
        const toIndex = index
        const thisSceneIndex = scene.index
        const height = layout.initHeight
        const width = layout.initWidth
  
        const translateX = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
          outputRange: [width, 0, 0]
        })
  
        // Since we want the card to take the same amount of time
        // to animate downwards no matter if it's 3rd on the stack
        // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
        const translateY = position.interpolate({
          inputRange: [0, thisSceneIndex],
          outputRange: [height, 0]
        })
  
        const slideFromRight = { transform: [{ translateX }] }
        const slideFromBottom = { transform: [{ translateY }] }
  
        const lastSceneIndex = scenes[scenes.length - 1].index
  
        // Test whether we're skipping back more than one screen
        if (lastSceneIndex - toIndex > 1) {
          // Do not transoform the screen being navigated to
          if (scene.index === toIndex) return
          // Hide all screens in between
          if (scene.index !== lastSceneIndex) return { opacity: 0 }
          // Slide top screen down
          return slideFromBottom
        }
  
        return slideFromRight
      },
  }}

  const TableStack = StackNavigator({
    TableScreen: {screen: TableScreen}
  },
  { 
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    initialRouteName: 'TableScreen'})
    
  const OrderStack = StackNavigator({
      MenuScreen: {screen: MenuScreen}   
    },
    { 
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      },
      initialRouteName: 'MenuScreen'})

  const ReviewStack = StackNavigator({
        ReviewScreen: {screen: ReviewScreen}   
      },
      { 
        headerMode: 'none',
        navigationOptions: {
          headerVisible: false,
        },
        initialRouteName: 'ReviewScreen'});

  const CheckOutStack = StackNavigator({
          CheckoutScreen: {screen: CheckoutScreen}    
        },
        { 
          headerMode: 'none',
          navigationOptions: {
            headerVisible: false,
          },
          initialRouteName: 'CheckoutScreen'})
    //transitionConfig})

  const ReservationStack = StackNavigator({
  Reservation: {screen: Reservation},  
  SearchReservation: {screen : SearchReservation}
  }, { 
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    initialRouteName: 'Reservation'})
    //transitionConfig})

  const FeedBackStack = StackNavigator({
    TableFeedBackScreen:{screen: TableModal},
    FeedbackTabs: { screen: FeedbackTabs}
  }, { 
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    initialRouteName: 'TableFeedBackScreen'})
    //transitionConfig})

    const SettingStack = StackNavigator({
      AppSettingsScreen:{screen: AppSettingsComponent}
    }, { 
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      },
      initialRouteName: 'AppSettingsScreen'})
      //transitionConfig})
  
// Manifest of possible screens
const PrimaryNav = StackNavigator({
  WelcomeHRPL: {screen: WelcomeHRPL},
  LoginScreen:{screen: LoginScreen},
  LaunchScreen: {screen: LaunchScreen},  
  TableStack:{screen: TableStack},
  OrderStack:{screen:OrderStack},
  ReviewStack:{screen:ReviewStack},
  CheckOutStack:{screen:CheckOutStack},
  ReservationStack:{screen: ReservationStack},
  FeedBackStack:{screen: FeedBackStack},
  SettingStack: {screen: SettingStack},
    
},{
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'WelcomeHRPL',
  navigationOptions: {
    headerStyle: styles.header
  }})
//   transitionConfig
// })

export default PrimaryNav
