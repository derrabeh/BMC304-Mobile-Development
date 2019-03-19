import React from 'react';
import { View, Text, Button } from 'react-native';
import { Header, Input } from '../components/common';
import firebase from 'firebase';


class ProgApplicationScreen extends React.Component {
    static navigationOptions = {
        title: 'prog_app'
    };


    constructor(props){
      super(props);
      this.state = {
          allApp : {}
        };
  }

  
  componentDidMount(){
    firebase.database().ref('/application_test').once('value', function (snapshot) {
        this.setState({
          allApp: snapshot.val(),
        });
    }.bind(this));
}


    render() {
    let d = this.props.navigation;
    let g = JSON.stringify(this.state.allApp);
    let allApp = JSON.parse(g);
    console.log(allApp,'wwwwwwwwf');
      return (

        <View>
            <Header headerText={'Applicant'} navigation={this.props.navigation} />
            <Text>Applicant List - {d.state.params.prog_name}{'\n'}</Text>
            {Object.keys(allApp).map((k,e) => {
            if(allApp[k].applied_prog == d.state.params.prog_id){
              return(
                <View>
                <Text>
                  Applicant : {allApp[k].applicant} {'\n'}
                  Appied Program : {allApp[k].applied_prog}  (This id is from last screen: {d.state.params.prog_id} ){'\n'}
                  Status: {allApp[k].status} {'\n'}
                </Text>
                <Button title="View Applicant Details" onPress={() => this.props.navigation.navigate('ApplicantDetail')} />
                </View>
              );
            }
            })
            }
          
            <Button title="Back" onPress={() => this.props.navigation.navigate('Uni_Home')} />
        </View>
      );
    }
}

export { ProgApplicationScreen };