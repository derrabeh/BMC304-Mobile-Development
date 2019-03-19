import React from 'react';
import { View, Text, Button } from 'react-native';
import { Header, Input } from '../components/common';
import firebase from 'firebase';


class AppDetail extends React.Component {
    static navigationOptions = {
        title: 'App_Detail'
    };


    constructor(props){
      super(props);
  }



    render() {
      return (

        <View>
            <Header headerText={'Applicant Details'} navigation={this.props.navigation} />
          
            <Button title="Back" onPress={() => this.props.navigation.navigate('Uni_Home')} />
        </View>
    
      )};

}

export { AppDetailScreen };