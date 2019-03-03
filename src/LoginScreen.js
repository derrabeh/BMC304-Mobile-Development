import React from 'react';
import { View, Button } from 'react-native';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login'
  };

    render() {
      return (
        <View>
          <Button title="login" onPress={() => this.props.navigation.navigate('Home')} />
          <Button title="signup" onPress={() => this.props.navigation.navigate('Home')} />
        </View>
      );
    }
}

export { LoginScreen };
