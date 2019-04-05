import React from 'react';
import { View, Text, Button , BackHandler,TouchableHighlight , ToastAndroid} from 'react-native';
import { Header, Input, Card, CardItem } from '../../components/common';
import firebase from 'firebase';


class ProgListScreen extends React.Component {
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
    let prv = this.props.navigation;

      return (
        <View>
            <Header headerText={'Programme'} navigation={this.props.navigation} />
            <Text>Programme List - {prv.state.params.catName}{'\n'}</Text>
            {
            Object.keys(g).map((d, i) => {
                if(g[d].cat.toLowerCase() === prv.state.params.cat.toLowerCase()){
                    return(  
                    <Card>
                        <CardItem>
                        <Text>
                        Cat: {g[d].cat} - prv: {prv.state.params.cat} {'\n'}
                        Name: {g[d].prog_name} {'\n'}
                        ID  : {g[d].id} {'\n'}
                        UNI : {g[d].uni} {'\n'}
                    </Text>
                    <Button title="View Details" onPress={() => this.props.navigation.navigate('ProgDetail', {
                        prog_name: g[d].prog_name,
                        prog_id : g[d].id,
                        uni: g[d].uni,
                        key : i,
                        userID : prv.state.params.userID,
                        })} />
                    <Text>{'\n'}</Text>
                        </CardItem>
                    </Card>
                    );
                }
            }
            )
            }
            <Button title="Back" onPress={() => this.props.navigation.navigate('Student_Home')} />
        </View>
      );
    }
}

export { ProgListScreen };