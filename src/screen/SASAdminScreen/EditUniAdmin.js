import React from 'react';
import { Text, TouchableOpacity, View, TextInput, ToastAndroid, Button, KeyboardAvoidingView } from 'react-native';
import { Container } from '../../components/common';
import firebase from 'firebase';
import { Icon } from 'react-native-elements';

class EditUniAdmin extends React.Component {
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
    };
  }

  componentWillMount() {
      const key = this.props.navigation.getParam('userID', null);
      this.setState({ key });

      const ref = firebase.database().ref('users/' + key);

      ref.once('value')
          .then((snapshot) => {
              this.setState({ username: snapshot.val().username });
              this.setState({ name: snapshot.val().name });
              this.setState({ email: snapshot.val().email });
              this.setState({ isLoading: false });
          }
      );
  }


  updateUniAdmin = () => {
    const { username, password, name, email, key } = this.state;

    if (email === '' && password === '' && name === '' && username === '') {
      ToastAndroid.show('Please enter all the details needed !', ToastAndroid.SHORT);
      Alert.alert("Hahahhah")
    }

      try{
        const userDir = firebase.database().ref().child('users/' + uid);
          userDir.set({
            key,
            email:this.state.email,
            username: this.state.username,
            name: this.state.name,
          });

        }).catch((error) => {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
            console.log(error.message);
          });
    }
  }

  render(){
    const { containerStyle, headerStyle, nameContainerStyle,nameStyle, iconContainerStyle,
            bodyStyle, bodyContainerStyle, textInputStyle,inputContainerStyle, inputTextStyle } = styles;

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1}}>
            <Spinner />
        </View>
      )
    }

    return(
    <KeyboardAvoidingView style={containerStyle} behavior='padding' enabled >
      <View style ={containerStyle}>
        <View style={headerStyle}>
          <View style={iconContainerStyle}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('UniAdminScreen')}
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
              <Text style={nameStyle} > Update University Admin</Text>
          </View>
        </View>

        <View style={bodyStyle}>
        <View style={textGroupStyle}>
            <Text style={textHeaderStyle}>Username</Text>
                <TextInput
                    style={bodyInputStyle2}
                    onChangeText={username => this.setState({ username })}
                    value={this.state.grades}
                />
        </View>

        <View style={textGroupStyle}>
            <Text style={textHeaderStyle}>Email</Text>
                <TextInput
                    style={bodyInputStyle2}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.grades}
                />
        </View>

        <View style={textGroupStyle}>
            <Text style={textHeaderStyle}>Name</Text>
                <TextInput
                    style={bodyInputStyle2}
                    onChangeText={grades => this.setState({ name })}
                    value={this.state.names}
                />
        </View>

        <Button title="Update" onPress={this.updateUniAdmin}>
        </Button>
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
        marginTop: 10,
        marginBottom: 10
    },
    inputTextStyle: {
        color: 'grey'
    }
}

export { EditUniAdmin };
