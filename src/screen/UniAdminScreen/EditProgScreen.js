import React from 'react';
import { View, Text, Button, TextInput, ToastAndroid } from 'react-native';
import { Header, Input } from '../../components/common';
import firebase from 'firebase';


class EditProgScreen extends React.Component {

    constructor(props){
        super(props);
       
        this.state = { 
            desc: '' , 
            closingDate : '', 
            progName : '',
            key : '',
        }

        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        let p = this.props.navigation;
        this.setState({
            desc: p.state.params.progDesc , 
            closingDate : p.state.params.closingDate, 
            progName : p.state.params.progName,
            key : p.state.params.key,
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
        try {
            var program = firebase.database().ref('program/'+this.state.key);
            program.update({ 
                closingDate: this.state.closingDate,
                description: this.state.desc,
                progName: this.state.progName,
            });
            ToastAndroid.show('Program Updated!', ToastAndroid.SHORT);
            setTimeout(()=>{
              this.props.navigation.push('Uni_Home', {userID : d.state.params.userID})
            },1000);
          }
          catch (error) {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
          }


        // try{
        //     const dir = firebase.database().ref('/program').push();
        //     const pk = dir.key;
    
        //     dir.set({
        //         closingDate: this.state.closingDate,
        //         description: this.state.desc,
        //         progName: this.state.progName,
        //         uniID: '-LbglPfKTozIcAXzYlK0',
        //     });

        //     ToastAndroid.show('Program '+this.state.progName+'  Created!', ToastAndroid.SHORT);
        //     setTimeout(()=>{
        //       this.props.navigation.push('Uni_Home',{ userID : d.state.params.userID})
        //     },1000);
        // }catch(e){
        //     ToastAndroid.show(e, ToastAndroid.SHORT);

        // }
    }

    render() {
      let d = this.props.navigation;

    // console.log(this.state.allA,'wwww----------');

      return (

        <View>
            <Header headerText={'Edit Program'}/>
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

export { EditProgScreen };