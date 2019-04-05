import React,{ Component } from 'react';
import { FlatList, View, Text, Button, TouchableOpacity } from 'react-native';
import { Header, Input, Card } from '../components/common';
import * as firebase from 'firebase';

export default class StudentHomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);
    this.state ={ catName: [] }
  };
  

  componentDidMount() {
    var ref = firebase.database().ref('/category')
    ref.once('value')
      .then(
        function(snapshot) { 
          const cat =[]
      
          snapshot.forEach(categories => {
            const temp = categories.val();
            cat.push(temp);

      });
        this.setState({
          cat
        })
        }.bind(this)); 
}


render(){
  let prv = this.props.navigation;

  return(
    <View> 
    <Header headerText={'HOME PAGE'} navigation={this.props.navigation} /> 
    <Text>{prv.state.params.userID} hello</Text>
    <FlatList 
      data={this.state.cat}
      renderItem={({ item, index }) => (  
      <Card>
      <TouchableOpacity style={styles.itemStyle} onPress={() => this.props.navigation.navigate('ProgList',{
        cat:item.cat_short,
        catName:'Information Technology',
        userID : prv.state.params.userID,
        })}>
          <Text style={styles.item}> {item.cat_name} </Text>
      </TouchableOpacity>
      </Card> 
      )} 
    />

    <Button
        title="Back"
        onPress={() => this.props.navigation.navigate('Login')}
    />
      </View>
    );
}
}

const styles = {

  item: {
    padding: 10,
    fontSize: 15,
    height: 44,
  },

  itemStyle:{
    justifyContent:'center',
    padding: 5,
    borderRadius: 5,
    borderColor: '#32CD32'
  },

  buttonStyle: {
    marginTop: 20,
  }

}


export { StudentHomeScreen };

