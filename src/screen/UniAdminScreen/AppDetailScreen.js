import React from 'react';
import { View, Text, Button, ToastAndroid, TouchableOpacity } from 'react-native';
import { Header, Input } from '../../components/common';
import firebase from 'firebase';

class AppDetails extends React.Component {
    static navigationOptions = {
        title: 'App_Detail'
    };

    chgApplicantStatus(status,key){
      console.log(status,key,'www')
      try {
        var applicant = firebase.database().ref('applicant_new/'+key);
        applicant.update({ status: status});
        ToastAndroid.show('Status Updated!', ToastAndroid.SHORT);
        setTimeout(()=>{
          this.props.navigation.navigate('Uni_Home')
        },1000);

      }
      catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }

    }

    render() {
      let d = this.props.navigation;
      return (
        <View>
          <Header headerText={'Applicant Details'} navigation={this.props.navigation} />
          <View style={styles.container}>
          <Text>Applicant Details {'\n'}</Text>

              <Text>Applicant: {d.state.params.applicant}{'\n'}</Text>
              <Text>Status: {d.state.params.status}{'\n'}</Text>
              <Text>Apply Programme: {d.state.params.prog_name}{'\n'}</Text>
              <Text>Key : {d.state.params.key}</Text>

              <Button title="Approve" color="green" onPress={() => this.chgApplicantStatus('APPROVE',d.state.params.key)}/>
              <Button title="Decline" color="red" onPress={() => this.chgApplicantStatus('DECLINE',d.state.params.key)}/>

              <Text>{'\n'}</Text>
              <Button title="Back" onPress={() => this.props.navigation.push('App_Prog',{ prog_id : d.state.params.prog_id,prog_name : d.state.params.prog_name, })} />
          </View>
        </View>
      );
    }
}

const styles = {
  container : {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    borderRadius : 10,
    padding : 20,
    backgroundColor : '#f4f6f9',
  }
};

export { AppDetails };