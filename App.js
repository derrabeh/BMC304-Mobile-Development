/* eslint-disable react/no-multi-comp */
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import { DetailsScreen } from './src/DetailsScreen';
import { HomeScreen } from './src/HomeScreen';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
