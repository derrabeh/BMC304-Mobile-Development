import React from 'react';
import { View, Text, Button, ToastAndroid } from 'react-native';
import { Header, Input } from '../components/common';
import firebase from 'firebase';

class ProgDetailScreen extends React.Component {
    static navigationOptions = {
        title: 'App_Detail',
    };

    applyProg(key){
      console.log(key,'www')
      let aiKey = '';


      firebase.database().ref('application_test').once('value',(snapshot)=>{

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
          let ai = parseInt(snapshot.numChildren()) + 1;
          aiKey = 'app'+ai;

          try{
            var appRef = firebase.database().ref('application_test');
            appRef.child(aiKey).set({
              applicant: all.state.params.userID,
              applied_prog: all.state.params.prog_id,
              date : today,
              status : 'PENDING',
              uni : all.state.params.uni
            });

            ToastAndroid.show('Applied Successfully!', ToastAndroid.SHORT);
            setTimeout(()=>{
                this.props.navigation.navigate('Student_Home',{userID:all.state.params.userID})
            },1000)

          }catch(e){
            ToastAndroid.show(e, ToastAndroid.SHORT);

          }

          

          


        
        
      })

      

      
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
            <Header headerText={'Applicant Details'} navigation={this.props.navigation} />
            <Text>Program Details {'\n'}</Text>

            <Text>Prog ID: {d.state.params.prog_id}</Text>
            <Text>UNI: {d.state.params.uni}</Text>
            
            <Text>Programme: {d.state.params.prog_name}</Text>

            <Button title="Apply" color="green" onPress={() => this.applyProg(d.state.params.key)}/>
            <Button title="Cancel" color="red" onPress={() => this.props.navigation.naviga('Student_Home')}/>

            <Text>{'\n'}</Text>






            <Button title="Back" onPress={() => this.props.navigation.navigate('Uni_Home')} />
        </View>
      );
    }
}

export { ProgDetailScreen };