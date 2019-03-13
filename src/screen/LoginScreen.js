import React from 'react';
import firebase from 'firebase';
import { View, Image, ToastAndroid, ImageBackground, Text, KeyboardAvoidingView } from 'react-native';
import { LoginInput, LoginButton, Container } from '../components/common';

class LoginScreen extends React.Component {
  state = {email: '', password: ''};

  // on login button press
  onButtonPress() {
    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate('Home');
      })
        .catch(() => {
          ToastAndroid.show('Wrong username or password !', ToastAndroid.SHORT);
        });
  }

  render() {
    const { containerStyle, logoContainerStyle, logoStyle, buttonsContainerStyle,
            buttonContainerStyle, textContainerStyle } = styles;
    const logo = require('../../assets/logo.png');
    const background = require('../../assets/background.jpg');
    const emailIcon = require('../../assets/mail2.png');
    const lockIcon = require('../../assets/lock2.png');

    return (
      <ImageBackground style={containerStyle} source={background} blurRadius={1} >
        <KeyboardAvoidingView behavior='padding' enabled>
          <View style={logoContainerStyle}>
            <Image style={logoStyle} source={logo} />
          </View>
          <Container>
            <LoginInput
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              label="Email"
              placeholder="Enter your email"
              blurRadius={1}
              icon={emailIcon}
            />
          </Container>
          <Container>
            <LoginInput
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              blurRadius={1}
              icon={lockIcon}
            />
          </Container>
          <View style={buttonsContainerStyle}>
            <View style={buttonContainerStyle}>
              <LoginButton onPress={this.onButtonPress.bind(this)} children="Login" />
            </View>
            <View style={textContainerStyle}>
              <Text style={{color: 'white'}}>Or</Text>
            </View>
            <View style={buttonContainerStyle}>
              <LoginButton children="Sign Up" />
            </View>
          </View>
        </KeyboardAvoidingView>
          
      </ImageBackground>
    );
  }  
}

const styles = {
    containerStyle: {
      justifyContent:'center', 
      flex: 1,
      backgroundColor: 'red'
    }, 
    logoContainerStyle: {
      alignItems: 'center',
      paddingBottom: 20
    }, 
    logoStyle: {
      width: 220,
      height: 220
    }, 
    buttonsContainerStyle: {
      marginTop: 25,
      marginLeft: 50,
      marginRight: 50
    }, 
    buttonContainerStyle: {
      height: 40
    }, 
    textContainerStyle: {
      flexDirection: 'row', 
      justifyContent: 'center',
      marginTop: 5,
      marginBottom: 5,
    }
}


export { LoginScreen };
