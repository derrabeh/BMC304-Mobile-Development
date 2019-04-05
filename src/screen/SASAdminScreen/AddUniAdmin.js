import React from 'react';
import { Text, TouchableHighlight, Button, View, TextInput } from 'react-native';
import { Header } from '../../components/common';
import firebase from 'firebase';

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
    };
  }

  saveUni = () => {
    const { username, password, name, email } = this.state;
      firebase.database().ref('UniAdmin/').push({
        username: username,
        password: password,
        name: name,
        email: email,
      });
  }

  render(){
    const { navigation } = this.props;
    this.state.userID = navigation.getParam('userID', null);

  return(
    <View>
    <Header headerText={'Add University Admin'} navigation={this.props.navigation} />
    <TextInput
    onChangeText={username => this.setState({username})} value= {this.state.username}
    label="username" placeholder="Enter username for university admin" blurRadius={1}
    />
    <TextInput
    onChangeText={password => this.setState({password})} value= {this.state.password}
    label="password" placeholder="Enter password for university admin" secureTextEntry
    blurRadius={1}
    />
    <TextInput
    onChangeText={name=> this.setState({name})} value= {this.state.name}
    label="name" placeholder="Enter name of university admin" blurRadius={1}
    />
    <TextInput
    onChangeText={email => this.setState({email})} value= {this.state.email}
    label="email" placeholder="Enter email of university admin" blurRadius={1}
    />

    <Button title="Save" onPress={this.saveUni}>
    </Button>
    </View>
  )
}
}
export { AddUniAdmin };
