import React from 'react';
import { View, Text, Button, ToastAndroid } from 'react-native';
import { Header, Input } from '../components/common';
import firebase from 'firebase';

class AppDetails extends React.Component {
    static navigationOptions = {
        title: 'App_Detail'
    };

    chgApplicantStatus(status,key){
      console.log(status,key,'www')
      try {
        var applicant = firebase.database().ref('application_test/'+key);
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
            <Text>Applicant Details {'\n'}</Text>

            <Text>Applicant: {d.state.params.applicant}</Text>
            <Text>Status: {d.state.params.status}</Text>
            <Text>Apply Programme: {d.state.params.prog_name}</Text>

            <Button title="Approve" color="green" onPress={() => this.chgApplicantStatus('APPROVE',d.state.params.key)}/>
            <Button title="Decline" color="red" onPress={() => this.chgApplicantStatus('DECLINE',d.state.params.key)}/>

            <Text>{'\n'}</Text>






            <Button title="Back" onPress={() => this.props.navigation.navigate('Uni_Home')} />
        </View>
      );
    }
}

export { AppDetails };