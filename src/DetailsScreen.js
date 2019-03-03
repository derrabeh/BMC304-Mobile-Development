import React from 'react';
import { View, Text } from 'react-native';
import { Header } from './components/common';

class DetailsScreen extends React.Component {
    render() {
      return (
        <View>
            <Header headerText={'Details'} navigation={this.props.navigation} />
          <Text>Details Screen</Text>
        </View>
      );
    }
  }

  export { DetailsScreen };
