/* eslint-disable react/no-multi-comp */
import React from 'react';
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
  render() {
    return <AppContainer />;
  }
}
