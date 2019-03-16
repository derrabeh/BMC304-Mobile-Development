import React from 'react';
import { View, Text, Button , BackHandler,TouchableHighlight , ToastAndroid} from 'react-native';
import { Header, Input } from '../components/common';

class UniHomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };

    gotoPage(id){
        console.log('now navigate to:',id);
        if(id == 1){
            ToastAndroid.show('SHOW ME DA WAE PLEASE', ToastAndroid.SHORT);
        }
        else if(id == 2){
            ToastAndroid.show('HALO', ToastAndroid.SHORT);
        }
        else{
            ToastAndroid.show('Give me DA QUEEN', ToastAndroid.SHORT);

        }
    };

    state = {
      username: '', 
      password: ''
    }

    render() {

        let data_2 = [
            {id: 1, name: 'TEST1', subject_code: 'BIT301'},
            {id: 2, name: 'TEST2', subject_code: 'BIT302'},
            {id: 3, name: 'TEST3', subject_code: 'BIT303'},
            ]
    

    

      return (
        <View>
            <Header headerText={'University Admin - Home'} navigation={this.props.navigation} />
            <Text>University Admin - Home Page{'\n'}</Text>
            {data_2.map(r => 

            <View>
                <Text>{r.id} : {r.subject_code} : {r.name}</Text>
                {/* <Button title="View" key={r.id} onPress={this.gotoPage.bind(this,r.id)}/> */}
                <TouchableHighlight onPress={this.gotoPage.bind(this,r.id)}>
                    <Text>Go to {r.name}</Text>
                </TouchableHighlight>
                <Text>{"\n"}</Text>
            </View>
            )}


            <Button title="Back" onPress={() => this.props.navigation.navigate('Login')} />
        </View>
      );
    }
}

export { UniHomeScreen };