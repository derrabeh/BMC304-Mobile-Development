import React from 'react';
import { View, Text, Button, ToastAndroid } from 'react-native';
import { Header, Input } from '../../components/common';
import firebase from 'firebase';

class ProgDetailScreen extends React.Component {
    static navigationOptions = {
        title: 'App_Detail',
    };

    applyProg(key,applicantID){
      console.log(key,'www')
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) {
        dd = '0' + dd;
        } 
        if (mm < 10) {
        mm = '0' + mm;
        } 
        today = dd + '/' + mm + '/' + yyyy;

        let all = this.props.navigation;

          try{
            const dir = firebase.database().ref('/applications').push();
            const pk = dir.key;

            dir.set({
              applicantID: applicantID,
              date: today,
              programID: "PROGIDHERE",
              status: 'PENDING'
            });

            ToastAndroid.show('Applied Successfully!', ToastAndroid.SHORT);
            setTimeout(()=>{
                this.props.navigation.navigate('Student_Home',{userID:all.state.params.userID})
            },1000)

          }catch(e){
            ToastAndroid.show(e, ToastAndroid.SHORT);

          }
      

      
    //   try {
    //     var applicant = firebase.database().ref('prog/app1');
    //     applicant.update({ status: status});
    //     ToastAndroid.show('Status Updated!', ToastAndroid.SHORT);
    //     setTimeout(()=>{
    //       this.props.navigation.navigate('Uni_Home')
    //     },1000);

    //   }
    //   catch (error) {
    //     ToastAndroid.show(error.message, ToastAndroid.SHORT);
    //   }

    }

    render() {
      let d = this.props.navigation;
      return (
        <View>
            <Header headerText={'Program Details'} navigation={this.props.navigation} />
            <Text>Program Details {'\n'}</Text>

            <Text>Prog ID: {d.state.params.prog_id}</Text>
            <Text>KEY: {d.state.params.key}</Text>
            <Text>UNI: {d.state.params.uni}</Text>
            <Text>Applicant : {d.state.params.userID}</Text>
            
            <Text>Programme: {d.state.params.prog_name}</Text>

            <Button title="Apply" color="green" onPress={() => this.applyProg(d.state.params.key,d.state.params.userID)}/>
            <Button title="Cancel" color="red" onPress={() => this.props.navigation.naviga('Student_Home')}/>

            <Text>{'\n'}</Text>






            <Button title="Back" onPress={() => this.props.navigation.navigate('Student_Home',{userID : d.state.params.userID })} />
        </View>
      );
    }
}

export { ProgDetailScreen };