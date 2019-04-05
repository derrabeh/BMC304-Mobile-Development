import React from 'react';
import { Text, TouchableHighlight, Button, ListView } from 'react-native';
import { Header } from '../components/common';
import firebase from 'firebase';

class AddUniversity extends React.Component {
  static navigationOptions = {
    title: 'Register University',
  };
  constructor(props){
    super(props);
    this.state ={
      uniName:'',
    };
  }

  render(){
    const { navigation } = this.props;
    this.state.userID = navigation.getParam('userID', null);

    saveUni=() => {
      var qlf = firebase.database().ref('/university');
      qlf.push({
        uniName: this.state.uniName,
      })
    }

    return(
      <View>
      <TextInput
      onChangeText={uniName => this.setState({uniName})} value= {this.state.uniName}
      label="University" placeholder="Enter University Name" blurRadius={1}
      />

      <Button title="Save" onPress={() =>{this.saveUni}}>
      </Button>
      </View>
    )
  }
}
  export { AddUniversity };
