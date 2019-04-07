import React from 'react';
import { Text, TouchableOpacity, View, TextInput, ToastAndroid, Button, KeyboardAvoidingView } from 'react-native';
import { Container } from '../../components/common';
import firebase from 'firebase';
import { Icon } from 'react-native-elements';

class AddUniAdmin extends React.Component {
  static navigationOptions = {
    title: 'Add University Admin',
  };
  constructor(props){
    super(props);
    this.state ={
      username:'',
      password:'',
      name:'',
      email:'',
      userType:''
    };
  }

  saveUni = () => {
    const { username, password, name, email, userType } = this.state;

    if (email === 'u' && password === '123456789' && name === 'uaua' && username === '') {
      ToastAndroid.show('Please enter all the details needed !', ToastAndroid.SHORT);
      Alert.alert("Hahahhah")
    }

    else{
      firebase.auth().createUserWithEmailAndPassword(email, password)
         .then(() => {
           firebase.auth().signInWithEmailAndPassword(email, password)
             .then(() => {
               const uid = firebase.auth().currentUser.uid;
               const { navigation } = this.props;
               this.state.UniID = navigation.getParam('UniID', null);

               const userDir = firebase.database().ref().child('users/' + uid);
               userDir.set({
                 userType: "UniAdmin",
                 email:this.state.email,
                 username: this.state.username,
                 name: this.state.name,
                 uniID: this.state.UniID,
                 password: this.state.password,
               });

               const uniAdminDir = firebase.database().ref().child('uniAdmin/' + uid);
               console.log(this.state.UniID,'09876540987654');
               uniAdminDir.set({
                   userID: uid,
                   uniID: this.state.UniID,
               });

              this.props.navigation.push('UniAdminScreen', {
                UniID: this.state.UniID
              });
             });

         }).catch((error) => {
             ToastAndroid.show(error.message, ToastAndroid.SHORT);
             console.log(error.message);
           });
     }
   }

  render(){
    const { containerStyle, headerStyle, nameContainerStyle,nameStyle, iconContainerStyle,buttonStyle, buttonTextStyle,
          buttonGroupStyle, bodyStyle, bodyContainerStyle, textInputStyle,inputContainerStyle, inputTextStyle, inputContainer } = styles;

    return(
    <KeyboardAvoidingView style={containerStyle} behavior='padding' enabled >
      <View style ={containerStyle}>
        <View style={headerStyle}>
          <View style={iconContainerStyle}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('UniversityScreen')}
            >
            <View
                style={{ paddingLeft: 13, paddingRight: 13, paddingTop: 5,
                paddingBottom: 5 }}
            >
            <Icon
              name='chevron-left'
              type='font-awesome'
              color='white'
              size={28}
            />
            </View>
            </TouchableOpacity>
          </View>

          <View style={nameContainerStyle}>
              <Text style={nameStyle} > Add University Admin</Text>
          </View>
        </View>

        <View style={bodyStyle}>
          <View style={inputContainerStyle}>
          <Text style ={inputTextStyle}> Username </Text>
          <View style={inputContainer}>
            <TextInput
              onChangeText={username => this.setState({username})}
              value= {this.state.username}
              label="username"
              placeholder="Enter username for university admin"
              blurRadius={1}
            />
            </View>
          </View>

        <View style={inputContainerStyle}>
            <Text style ={inputTextStyle}> Email </Text>
            <View style={inputContainer}>
              <TextInput
                onChangeText={email => this.setState({email})}
                value= {this.state.email}
                label="email"
                placeholder="Enter email of university admin"
                blurRadius={1}
              />
              </View>
        </View>

        <View style={inputContainerStyle}>
            <Text style ={inputTextStyle}> Password </Text>
            <View style={inputContainer}>
              <TextInput
              onChangeText={password => this.setState({password})}
              value= {this.state.password}
              label="password"
              placeholder="Enter password for university admin"
              secureTextEntry
              blurRadius={1}
              />
            </View>
        </View>

        <View style={inputContainerStyle}>
            <Text style ={inputTextStyle}> Name </Text>
            <View style={inputContainer}>
              <TextInput
              onChangeText={name=> this.setState({name})}
              value= {this.state.name}
              label="name"
              placeholder="Enter name of university admin"
              blurRadius={1}
              />
            </View>
        </View>

        <View style={buttonGroupStyle}>
          <TouchableOpacity
            style={buttonStyle}
            onPress={this.saveUni}
          >
          <Text style={buttonTextStyle}>
            Save
          </Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  containerStyle: {
      flex: 1,
      backgroundColor: '#34495e'
  },
  headerStyle:{
      height: 180,
      backgroundColor: '#34495e',
      alignItems: 'stretch',
      paddingTop: 23,
      flex: 3
  },
  nameContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 7
  },
  nameStyle: {
    fontSize: 40,
    color: 'white'
  },
    iconContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 2,
        alignItems: 'center',
    },
    bodyStyle: {
        flex: 7,
        backgroundColor: 'white',
        paddingLeft: 40,
        paddingRight: 40
    },
    bodyContainerStyle: {
        flex: 7,
        paddingTop: 10,
        justifyContent: 'center',
        backgroundColor: 'yellow'
    },
    textInputStyle: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 5,
        height: 40
    },
    inputContainerStyle: {
        marginTop: 20,
        marginBottom: 20
    },
    inputTextStyle: {
        font: 25,
        padding: 15,
        color: 'grey'
    },
    inputContainer:{
      borderWidth: 1,
      padding: 15,
      borderRadius:5,
      borderColor:'grey',
    },
    buttonStyle: {
        backgroundColor: '#2ecc71',
        borderRadius: 40/2,
        height: 40,
        padding: 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
        },
    buttonStyle2: {
        backgroundColor: '#e74c3c',
        borderRadius: 40/2,
        height: 40,
        padding: 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTextStyle: {
        color: 'white',
        fontSize: 15
    },
    buttonGroupStyle: {
        alignItems: 'stretch',
        justifyContent: 'center',
        flex: 3,
        marginBottom: 20,
    }
}

export { AddUniAdmin };
