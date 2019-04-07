import React from 'react';
import { View, Text, Button, TextInput, ToastAndroid } from 'react-native';
import { Header, Input } from '../../components/common';
import firebase from 'firebase';


class NewProgScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = { desc: '' , closingDate : '', progName : ''}

        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
      this.setState({
        desc : '',
        closingDate : '',
        progName : ''
      })
    }

    handleDescChange(desc){
        this.setState({
            desc : desc
        })
    }

    handleNameChange(name){
        this.setState({
            progName : name
        })
    }

    handleDateChange(date){
        this.setState({
            closingDate : date
        })
    }

    handleSubmit(){
        let d = this.props.navigation;
        console.log(this.state.desc)
        console.log(this.state.closingDate)
        try{
            const dir = firebase.database().ref('/program').push();
            const pk = dir.key;
    
            dir.set({
                closingDate: this.state.closingDate,
                description: this.state.desc,
                progName: this.state.progName,
                uniID: '-LbglPfKTozIcAXzYlK0',
            });

            ToastAndroid.show('Program '+this.state.progName+'  Created!', ToastAndroid.SHORT);
            setTimeout(()=>{
              this.props.navigation.push('Uni_Home',{ userID : d.state.params.userID})
            },1000);
        }catch(e){
            ToastAndroid.show(e, ToastAndroid.SHORT);

        }
    }

    render() {
      let d = this.props.navigation;

    // console.log(this.state.allA,'wwww----------');

      return (

        <View>
            <Header headerText={'NEW PROG'}/>
            <View style={styles.inputContainer}>
            <TextInput
                style={styles.textInput}
                placeholder="Program Name"
                maxLength={40}
                value={this.state.progName}
                onChangeText={this.handleNameChange}
                />
            <TextInput
            style={styles.textInput}
            placeholder="Program Desc"
            maxLength={50}
            value={this.state.desc}
            onChangeText={this.handleDescChange}
            />
            <TextInput
            style={styles.textInput}
            placeholder="Closing Date"
            maxLength={20}
            value={this.state.closingDate}
            onChangeText={this.handleDateChange}
            />
            </View>
            <View style={styles.buttonBack}>
            <Button title="SUBMIT" onPress={() => this.handleSubmit()} />

            <Button title="Back" onPress={() => this.props.navigation.push('Uni_Home',{userID : d.state.params.userID})} />
            </View>
        </View>
      );
    }
}

const styles = {
  buttonBack:{
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    // width:40,
    // justifyContent: 'center',
  },
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  }
};

export { NewProgScreen };