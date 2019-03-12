import React from 'react';
import { View, Image } from 'react-native';
import { Header, Input, CardItem, Button } from '../components/common';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login'
  };

  state = {
    username: '', 
    password: ''
  }

  render() {
    return (
      <View style={{justifyContent:'center', backgroundColor:'red'}}>
          <View style={{alignItems: 'center'}}>
            <Image style={{width: 250, height: 250}} source={require('../../assets/logo.png')}/>
          </View>
          <CardItem>
            <Input
              onChangeText={username => this.setState({ username })}
              value={this.state.username}
              label="Username"
              placeholder="Enter your username"
            />
          </CardItem>
          <CardItem>
            <Input
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
            />
          </CardItem>
          <CardItem>
            <Button onPress={() => this.props.navigation.navigate('Home')} children="Login" />
          </CardItem>
          
      </View>
    );
  }

    
}


export { LoginScreen };
