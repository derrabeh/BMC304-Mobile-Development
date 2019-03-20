import React from 'react';
import firebase from 'firebase';
import { View, Image, ToastAndroid, ImageBackground, Text, 
        KeyboardAvoidingView } from 'react-native';
import { LoginInput, LoginButton, Container } from '../components/common';

class LoginScreen extends React.Component {
  state = { email: 'User3@user.com', password: '123456789', user: '' };

  // on login button press
  onButtonPress() {
    const { email, password } = this.state;

    // authenticate the user
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {

        // get the user id
        const uid = firebase.auth().currentUser.uid;

        // check the user type and navigate to their screen
        try {
          this.setState({ user: uid });

          const userType = firebase.database().ref('/users/' + uid);

          userType.once('value').then(snapshot => {
            // console.log(snapshot.val().userType);
            if (snapshot.val().userType == 1) {
              this.props.navigation.navigate('Student_Home', { userID: this.state.user });
            }
            else if (snapshot.val().userType == 2) {
              this.props.navigation.navigate('Uni_Home', { userID: this.state.user });
            }
            else {
              this.props.navigation.navigate('Admin_Home', { userID: this.state.user });
            }
          });

          this.setState({ email: '', password: '' });
        }
        catch (error) {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        }
      })
        .catch(() => {
          ToastAndroid.show('Wrong username or password !', ToastAndroid.SHORT);
        });

        
  }

  render() {
    const { containerStyle, logoContainerStyle, logoStyle, buttonsContainerStyle,
            buttonContainerStyle } = styles;
    const logo = require('../../assets/logo.png');
    const background = require('../../assets/background.jpg');
    const emailIcon = require('../../assets/mail2.png');
    const lockIcon = require('../../assets/lock2.png');

    return (
      <ImageBackground style={containerStyle} source={background} blurRadius={2} >
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
            <View style={buttonContainerStyle}>
              <LoginButton children="Sign Up" onPress={() => {this.props.navigation.navigate('SignUp')}} />
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
      marginBottom: 10
    }, 
    textContainerStyle: {
      flexDirection: 'row', 
      justifyContent: 'center',
      marginTop: 5,
      marginBottom: 5,
    }
}


export { LoginScreen };
