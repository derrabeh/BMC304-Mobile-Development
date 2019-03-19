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
        this.state = {
            allProg:{}
          };
    }

    componentDidMount(){
        firebase.database().ref('/prog').once('value', function (snapshot) {
            console.log(snapshot.val())
            console.log(snapshot.numChildren(),'count'); //get 3
            for (var p in snapshot.val()) {
                console.log(p,'-----sss');  //get prog1 prog2 prog3
                }
            this.setState({
                allProg: snapshot.val(),
            });
        }.bind(this));
    }

    render() {

    let d = JSON.stringify(this.state.allProg);
    let g = JSON.parse(d);
    console.log(g,'wwwwww')

      return (
        <View>
            <Header headerText={'University Admin - Home'} navigation={this.props.navigation} />
            <Text>University Admin - Home Page{'\n'}</Text>
            {
            Object.keys(g).map((d, i) => {
                if(g[d].uni == 'HELP'){
                    return(  
                    <View>
                    <Text>
                        Name: {g[d].prog_name} {'\n'}
                        ID  : {g[d].id} {'\n'}
                        UNI : {g[d].uni} {'\n'}
                    </Text>
                    <Button title="View Applicant" onPress={() => this.props.navigation.navigate('App_Prog', {
                        prog_name: g[d].prog_name,
                        prog_id : g[d].id,
                        uni: g[d].uni,
                        })} />
                    <Text>{'\n'}</Text>
                    </View>
                    );
                }
            }
            )
            }
            <Button title="Back" onPress={() => this.props.navigation.navigate('Login')} />
        </View>
      );
    }
}

export { UniHomeScreen };