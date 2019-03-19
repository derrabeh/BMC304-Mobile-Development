import React from 'react';
import firebase from 'firebase';
import { View, ToastAndroid, ImageBackground, Text, 
        KeyboardAvoidingView, Picker, Image } from 'react-native';
import { LoginInput, LoginButton, Container } from '../components/common';

class SignUpScreen extends React.Component {
  state = { email: '', password: '', userType: '', userIndex: 0 };

  // on login button press
  onButtonPress() {
    const { email, password, userIndex } = this.state;

    if (email === '' && password === '' && userIndex === 0) {
      ToastAndroid.show('Please enter all the details needed !', ToastAndroid.SHORT);
    }
    else if (email === '' || password === '') {
      ToastAndroid.show('Please enter your username or email !', ToastAndroid.SHORT);
    }
    else if (userIndex === 0) {
      ToastAndroid.show('Please select your account type !', ToastAndroid.SHORT);
    }
    else {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
              const uid = firebase.auth().currentUser.uid;

              const table = firebase.database().ref().child('users/' + uid);
      
              if (userIndex === 1) {
                table.set({
                  userType: 1,
                  email: email
                });
                this.props.navigation.navigate('Uni_Home');
              }
              else if (userIndex === 2) {
                table.set({
                  userType: 2,
                  email: email
                });
                this.props.navigation.navigate('Home');
              }
              else if (userIndex === 3) {
                table.set({
                  userType: 3,
                  email: email
                });
                this.props.navigation.navigate('Admin_Home');
              }
              else {
                table.set({
                  userType: null
                });
              }
            });      
        })
          .catch((error) => {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
            console.log(error.message);
          })
    }
  }

  render() {
    const { containerStyle, buttonsContainerStyle, buttonContainerStyle,
            userIconStyle, userTypeContainerStyle, iconContainerStyle,
            pickerStyle } = styles;
    const background = require('../../assets/background.jpg');
    const emailIcon = require('../../assets/mail2.png');
    const lockIcon = require('../../assets/lock2.png');
    const userIcon = require('../../assets/user2.png');

    return (
      <ImageBackground style={containerStyle} source={background} blurRadius={2} >
        <KeyboardAvoidingView behavior='padding' enabled>
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
          <View style={userTypeContainerStyle}>
            <View style={iconContainerStyle}>
              <Image source={userIcon} style={userIconStyle} />
            </View>
            <Picker
              selectedValue={this.state.userType}
              style={pickerStyle}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ userType: itemValue, userIndex: itemIndex })
              }>
              <Picker.Item label="Select account type" value="null" />
              <Picker.Item label="Student" value="student" />
              <Picker.Item label="University Admin" value="university" />
              <Picker.Item label="Application Admin" value="app" />
            </Picker>
          </View>
          <View style={buttonsContainerStyle}>
            <View style={buttonContainerStyle}>
              <LoginButton onPress={this.onButtonPress.bind(this)} children="Create Account" />
            </View>
            <View style={buttonContainerStyle}>
              <LoginButton children="Cancel" onPress={() => {this.props.navigation.navigate('Login')}} />
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
      width: 200,
      height: 200
    }, 
    buttonsContainerStyle: {
      marginTop: 25,
      marginLeft: 50,
      marginRight: 50
    }, 
    buttonContainerStyle: {
      height: 40, 
      marginTop: 5
    }, 
    textContainerStyle: {
      flexDirection: 'row', 
      justifyContent: 'center',
      marginTop: 5,
      marginBottom: 5,
    }, 
    userIconStyle: {
      height: 30,
      width: 30,
    }, 
    userTypeContainerStyle: {
      flexDirection: 'row', 
      marginLeft: 50,
      marginRight: 50,
      alignItems: 'center',
      padding: 5,
      borderBottomWidth: 0.5,
      borderColor: 'white'
    }, 
    iconContainerStyle: {
      flex: 2,
      paddingRight: 20, 
    }, 
    pickerStyle: {
      height: 40, 
      width: 100, 
      flex: 10, 
      paddingLeft: 4, 
      color: 'white', 
      borderWidth: 0.5
    }
}


export { SignUpScreen };
