import React from 'react';
import { View, Text, Button, TextInput, ToastAndroid, Alert, Keyboard } from 'react-native';
import { Header, Input } from '../../components/common';
import firebase from 'firebase';

class UniAdminProfileScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = { password: '' , confirm_password : ''}

        this.handlePwChange = this.handlePwChange.bind(this);
        this.handleCPwChange = this.handleCPwChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
      this.setState({
        password : '',
        confirm_password : '',
      })
      let p = this.props.navigation;
      console.log(p.state.params.userID);
    }

    handlePwChange(pw){
        this.setState({
            password : pw
        })
    }
    handleCPwChange(cpw){
        this.setState({
            confirm_password : cpw
        })
    }

    handleSubmit(){
        Keyboard.dismiss();
        let d = this.props.navigation;
        // console.log(this.state.desc)
        // console.log(this.state.closingDate)
        let pw = this.state.password;
        let cpw = this.state.confirm_password;
        if(pw == '' || cpw == ''){
            ToastAndroid.show('No Empty Password / Confirm Password !', ToastAndroid.SHORT);

        }
        else{
            if(pw != cpw){
                ToastAndroid.show('Confirm Password Does Not Match!', ToastAndroid.SHORT);
            }
            else{
                let user = firebase.auth().currentUser;
            
                user.updatePassword(pw).then(() => {
                    ToastAndroid.show('Password Updated !', ToastAndroid.SHORT);
                    setTimeout(()=>{
                        this.props.navigation.push('Uni_Home',{userID : d.state.params.userID});
                    },1000)
                }, (error) => {
                    console.log(error);
                });
            }
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
            secureTextEntry={true}
            placeholder="New Password"
            maxLength={50}
            value={this.state.password}
            onChangeText={this.handlePwChange}
            />
            <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="Confirm Password"
            maxLength={20}
            value={this.state.confirm_password}
            onChangeText={this.handleCPwChange}
            />
            </View>
            <View style={styles.buttonBack}>
            <Button title="SUBMIT" onPress={() => this.handleSubmit()} />
            <Text>{'\n'}</Text>
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

export { UniAdminProfileScreen };