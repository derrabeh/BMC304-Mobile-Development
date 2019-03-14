import React from 'react';
import { View, Text, Button, ActivityIndicator, Dimensions, StyleSheet, TextInput, ListView } from 'react-native';
import { Header, Input } from '../components/common';
import * as firebase from 'firebase';


export default class HomeScreen extends React.Component {
    constructor(props) {
    super(props);

    this.navigationOptions = {
        title: 'Home'
    };

    state = {
      username: '', 
      password: ''
    };
  }

  componentWillMount() {
    let initialLoad = true;
    this.setState({ loading: true });

    const firebaseConfig = {
    apiKey: "AIzaSyDEiETsuhqLalpORr1r80OMpZprdv-Tq0g",
    authDomain: "bmc304assignment.firebaseapp.com",
    databaseURL: "https://bmc304assignment.firebaseio.com",
    projectId: "bmc304assignment",
    storageBucket: "bmc304assignment.appspot.com",
    messagingSenderId: "23854769824"
  };

   firebase.initializeApp(firebaseConfig);

   firebase
      .database()
      .ref('example')
      .on('value', snapshot => {
        this.setState({ text: snapshot.val() && snapshot.val().text });

        var ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.setState({ dataSource: ds.cloneWithRows(snapshot.val()) });

        if (initialLoad) {
          this.setState({ loading: false });
          initialLoad = false;
        }
      });
  }

   renderRow(record) {
    return (
      <View>
        <Text>Email is {record.email}</Text>
        <Text>Normal text is {record.text}</Text>
      </View>
    );
  }

    render() {
      return (
        <View>
            <Header headerText={'Home'} navigation={this.props.navigation} />
            <Input
              onChangeText={username => this.setState({ username })}
              value={this.state.username}
              label="Username"
              placeholder="hello world"
            />
            <Text>Home Screen</Text>
            <Button title="Back" onPress={() => this.props.navigation.navigate('Login')} />
        </View>
      );
    }
}

export { HomeScreen };

