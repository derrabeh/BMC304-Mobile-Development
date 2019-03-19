import React from 'react';
import { View, Text, Button , BackHandler,TouchableHighlight , ToastAndroid} from 'react-native';
import { Header, Input } from '../components/common';
import firebase from 'firebase';

class UniHomeScreen extends React.Component {
    static navigationOptions = {
        title: 'uni_home'
    };

    constructor(props){
        super(props);
        this.dataF = [];
    }

    componentDidMount(){

            firebase.database().ref('/program').once('value', function (snapshot) {
                console.log(snapshot.val())
                // console.log(snapshot.val().Object,'there');
                console.log(snapshot.val().prog1.prog_name,'here');  //get OS
                console.log(snapshot.numChildren(),'count'); //get 3
                for (var p in snapshot.val()) {
                    console.log(p,'-----');  //get prog1 prog2 prog3
                  }

            });
        }


    render() {

      return (
        <View>
            <Header headerText={'University Admin - Home'} navigation={this.props.navigation} />
            <Text>University Admin - Home Page{'\n'}</Text>
  


            <Button title="Back" onPress={() => this.props.navigation.navigate('Login')} />
        </View>
      );
    }
}

export { UniHomeScreen };