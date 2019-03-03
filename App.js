/* eslint-disable react/no-multi-comp */
import React from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator} from 'react-navigation'; 
import { DetailsScreen } from './src/DetailsScreen';
import { HomeScreen } from './src/HomeScreen';
import { LoginScreen } from './src/LoginScreen';

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    }, 
    Details: {
      screen: DetailsScreen
    }
  }
)

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
