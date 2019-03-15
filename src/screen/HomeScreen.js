import React from 'react';
import { View, Text, Button } from 'react-native';
import { Header, Input } from '../components/common';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };

    state = {
      username: '', 
      password: ''
    }

    render() {
      return (
        <View>
            <Header headerText={'Home'} navigation={this.props.navigation} />
            <Text>Home Screen w</Text>
            <Button title="Back" onPress={() => this.props.navigation.navigate('Login')} />
        </View>
      );
    }
}

export { HomeScreen };