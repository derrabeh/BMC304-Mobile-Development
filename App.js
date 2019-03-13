/* eslint-disable react/no-multi-comp */
import React from 'react';
import firebase from 'firebase';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import { AppDrawerNavigator } from './src/navigation/DrawerNavigator';
import { LoginScreen } from './src/screen/LoginScreen';


const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Home: AppDrawerNavigator,
    Details: AppDrawerNavigator,
  },
  {
    initialRouteName: 'Login',
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
      apiKey: 'AIzaSyAVNZrTYMo4YKjaLT64g-K4FWUVr8LkUH8',
      authDomain: 'uni-search-367ae.firebaseapp.com',
      databaseURL: 'https://uni-search-367ae.firebaseio.com',
      projectId: 'uni-search-367ae',
      storageBucket: 'uni-search-367ae.appspot.com',
      messagingSenderId: '333300685077'
    });
  }

  render() {
    return <AppContainer />;
  }
}
