/* eslint-disable react/no-multi-comp */
import React from 'react';
import firebase from 'firebase';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import { AppDrawerNavigator } from './src/navigation/DrawerNavigator';
import { LoginScreen, SignUpScreen, UniHomeScreen, AdminHomeScreen, DetailsScreen,
          QualificationScreen, StudentApplicationScreen } from './src/screen';


const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen,
    Uni_Home: UniHomeScreen,
    Admin_Home: AdminHomeScreen,
    Home: AppDrawerNavigator,
    Details: DetailsScreen,
    Qualification: QualificationScreen,
    StudentApplication: StudentApplicationScreen
  },
  {
    initialRouteName: 'Uni_Home',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  componentWillMount() {
    // Initialize Firebase
    firebase.initializeApp({
      apiKey: "AIzaSyAsbVKAQ6obb2glh6MLSvNsgRgNMnTu9Ak",
      authDomain: "bmc304-a4454.firebaseapp.com",
      databaseURL: "https://bmc304-a4454.firebaseio.com",
      projectId: "bmc304-a4454",
      storageBucket: "bmc304-a4454.appspot.com",
      messagingSenderId: "533913500230"
    });
  }

  render() {
    return <AppContainer />;
  }
}
