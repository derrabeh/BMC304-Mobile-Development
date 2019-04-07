import React from 'react';
import { View, Text, Button, TouchableOpacity, ToastAndroid } from 'react-native';
import { Header, Input } from '../../components/common';
import firebase from 'firebase';


class ProgApplicationScreen extends React.Component {
    static navigationOptions = {
        title: 'prog_app'
    };


    constructor(props){
      super(props);
      this.state = {
          allApp : {},
          allA : [],
        };
  }
  componentDidMount(){
    console.log('NEW PAGE............')
    // firebase.database().ref('/application_test').once('value', function (snapshot) {
    //   this.setState({
    //     allApp: snapshot.val(),
    //   });
    // }.bind(this));
    const ref = firebase.database().ref('/applications');
    ref.once("value").then(snapshot => {
      snapshot.forEach((child)=>{
          var key = child.key;
          this.setAppObject(child.val().applicantID,child.val(),key);
          // console.log(snapshot.val())
      })
    })
  
}

setAppObject(user_id,data,key){
  console.log(key);
  let d = user_id;
  const ref = firebase.database().ref('/users/'+user_id);
  ref.once('value').then(snapshot=>{
  let email = snapshot.val().email;
  let name = snapshot.val().username;
  let newApp = {
      applicant : name,
      applied_prog : data.programID,
      date : data.date,
      status : data.status,
      uni : data.uniID,
      app_key : key,
  };
      this.setState({
        allA : this.state.allA.concat(newApp)
    })

  })
}

    render() {
    let d = this.props.navigation;
    let g = JSON.stringify(this.state.allA);
    let allApp = JSON.parse(g);
    if(allApp.length == 0){
        console.log('No App');
        console.log('-----')
    }
    else{
      console.log('yes');
      console.log('-----')

    }


    // console.log(this.state.allA,'wwww----------');

      return (

        <View>
            <Header headerText={'Applicant - '+d.state.params.prog_name}navigation={this.props.navigation} />
      
            {Object.keys(allApp).map((k,e) => {
            if(allApp[k].applied_prog == d.state.params.prog_id){
              if(allApp[k].status != ''){
                return(
                  <TouchableOpacity
                      style={styles.item}
                      key={d}
                      onPress={() => this.props.navigation.navigate('App_Detail', {  
                        applicant : allApp[k].applicant,
                        applied_prog : allApp[k].applied_prog,
                        status : allApp[k].status,
                        prog_name : d.state.params.prog_name,
                        key : allApp[k].app_key,
                        prog_id : d.state.params.prog_id,
                        userID :  d.state.params.userID,
                        })}
                      >
                      <Text style={{ fontSize: 20 }}>Applicant : {allApp[k].applicant}</Text>
                  </TouchableOpacity>
                  // <View>
                  // <Text>
                  //   Applicant : {allApp[k].applicant} {'\n'}
                  //   Appied Program : {allApp[k].applied_prog}  (This id is from last screen: {d.state.params.prog_id} ){'\n'}
                  //   Status: {allApp[k].status} {'\n'}
                  //   Key : {k}
                  // </Text>
                  // <Button title="View Applicant Details" onPress={() => this.props.navigation.navigate('App_Detail',
                  // {
                  //   applicant : allApp[k].applicant,
                  //   applied_prog : allApp[k].applied_prog,
                  //   status : allApp[k].status,
                  //   prog_name : d.state.params.prog_name,
                  //   key : k
                  // })} />
                  // </View>
                );
              }
            }
            })
            }
            <View style={styles.buttonBack}>
            <Button title="Back" onPress={() => this.props.navigation.push('Uni_Home', {userID : d.state.params.userID})} />
            </View>
        </View>
      );
    }
}

const styles = {
  item: {
    backgroundColor: '#d7dae0',
    borderRadius: 10,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  buttonBack:{
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    // width:40,
    // justifyContent: 'center',
  }
};

export { ProgApplicationScreen };