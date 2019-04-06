import React from 'react';
import firebase from 'firebase';
import { View, Image, ToastAndroid, ImageBackground, Text,
        KeyboardAvoidingView } from 'react-native';
import { LoginInput, LoginButton, Container, Spinner } from '../components/common';
// import console = require('console');

class LoginScreen extends React.Component {
  state = { email: 'std@std.com', password: '123123', user: '', isLoading: false };

  // on login button press
  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ isLoading: true });

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
              this.setState({ isLoading: false });
            }
            else if (snapshot.val().userType == 2) {
              this.props.navigation.navigate('Uni_Home', { userID: this.state.user });
              this.setState({ isLoading: false });
            }
            else {
              this.props.navigation.navigate('Qualification', { userID: this.state.user });
              this.setState({ isLoading: false });
            }
          });

          this.setState({ email: '', password: '' });

        }
        catch (error) {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
          console.log(error.message);
          this.setState({ isLoading: false });
        }
      })
        .catch((error) => {
          this.setState({ isLoading: false });
          ToastAndroid.show('Wrong username or password !', ToastAndroid.SHORT);
          console.log(error.message);
        });


  }

  render() {
    const { containerStyle, logoContainerStyle, logoStyle, buttonsContainerStyle,
            buttonContainerStyle } = styles;
    const logo = require('../../assets/logo.png');
    const background = require('../../assets/background.jpg');
    const emailIcon = require('../../assets/mail2.png');
    const lockIcon = require('../../assets/lock2.png');

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner />
        </View>
      );
    }

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
