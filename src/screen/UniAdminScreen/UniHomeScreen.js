import React from 'react';
import { View, Text , BackHandler,
    TouchableHighlight , ToastAndroid, Image,TouchableOpacity} from 'react-native';
import { Header, Input, Card, CardItem } from '../../components/common';
import firebase from 'firebase';
import { Button } from 'react-native-elements';
import { SearchBar } from '../components/common/SearchBar';



class UniHomeScreen extends React.Component {
    static navigationOptions = {
        title: 'uni_home'
    };
    constructor(props){
        super(props);
        this.state = {
            allProg:{},
            searchText : ''
          };
    }
    componentDidMount(){
      this.setAllData();
    }

    setAllData(){
      firebase.database().ref('/prog').once('value', function (snapshot) {
        // console.log(snapshot.val())
        // console.log(snapshot.numChildren(),'count'); //get 3
        for (var p in snapshot.val()) {
            // console.log(p,'-----sss');  //get prog1 prog2 prog3
            }
        this.setState({
            allProg: snapshot.val(),
        });
    }.bind(this));
    }

    filterProgram(searchText){
      console.log(searchText);
      // this.setAllData();
      const filteredData = this.state.allProg.filter(
        (q) => {
            const name = q.prog_name.toUpperCase();
            const value = searchText.toUpperCase();
            
            return name.indexOf(value) > -1;
        }
    );

    // console.log(filteredData);
    
      this.setState({
        allProg : filteredData,
        searchText: searchText
    })
    }

    render() {

    let d = JSON.stringify(this.state.allProg);
    let g = JSON.parse(d);
    // console.log(g,'wwwwww')

      return (
        <View>
            <Header headerText={'University Admin - Home Page'} navigation={this.props.navigation} />
            <SearchBar 
                        onChangeText={(searchText) => this.filterProgram(searchText)} 
                        value={this.state.searchText}
                        placeholder='Search for qualification'
                    />
            {
            Object.keys(g).map((d, i) => {
                if(g[d].uni == 'HELP'){
                    return( 
                      
                    // <Card>
                    //     <CardItem>
                    //     <Text>
                    //     Name: {g[d].prog_name} {'\n'}
                    //     {/* ID  : {g[d].id} {'\n'} */}
                    //     University : {g[d].uni} {'\n'}
                    // </Text>
                    // <Button title="View Applicant" onPress={() => this.props.navigation.navigate('App_Prog', {
                    //     prog_name: g[d].prog_name,
                    //     prog_id : g[d].id,
                    //     uni: g[d].uni,
                    //     })} />
                    // <Text>{'\n'}</Text>
                    //     </CardItem>
                    // </Card>
                    <TouchableOpacity
                    style={styles.item}
                    key={d}
                    onPress={() => this.props.navigation.navigate('App_Prog', {  
                        prog_name: g[d].prog_name,
                        prog_id : g[d].id,
                        uni: g[d].uni, })}
                    >
                    <Text style={{ fontSize: 20 }}>{g[d].prog_name}</Text>

                    </TouchableOpacity>

                    );
                }
            }
            )
            }
            <View style={styles.buttonBack}>
            <Button title="Back" type="outline" onPress={() => this.props.navigation.navigate('Login')} />
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

export { UniHomeScreen };