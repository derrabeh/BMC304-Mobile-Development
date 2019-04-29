import React from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import firebase from 'firebase';
import { Icon } from 'react-native-elements';

class AddUniversity extends React.Component {
  static navigationOptions = {
    title: 'Register University',
  };
  constructor(props){
    super(props);
    this.state={
      uniName:''
    }
  }

  saveUni = () => {
    const { uniName } = this.state;

    if (uniName !== '') {
      try{
        firebase.database().ref('university/').push({
          uniName: uniName,
        });
    this.props.navigation.push('UniversityScreen');
    }
    catch(error){
      console.log(error);
    }
  }
  else{
    console.log("FAILED, NTG HAPPENED");
  }
}

  render() {
    const { containerStyle, headerStyle, bodyStyle, iconContainerStyle,
      headerInputContainerStyle, headerInputStyle, textGroupContainerStyle,textHeaderStyle,textGroupStyle,
      buttonStyle, buttonTextStyle, buttonGroupStyle, buttonStyle2, } = styles;

      return (
        <KeyboardAvoidingView style={containerStyle} behavior='padding' enabled >
          <View style={headerStyle}>
            <View style={iconContainerStyle}>
              <Icon
                name='chevron-left'
                type='font-awesome'
                color='white'
                size={28}
                containerStyle={{alignItems: 'flex-start'}}
                onPress={() => this.props.navigation.navigate('UniversityScreen')}
              />
            </View>

            <View style={textGroupStyle}>
                <Text style={textHeaderStyle}>University Name</Text>
                <TextInput
                    style={headerInputStyle}
                    onChangeText={uniName => this.setState({uniName})}
                    value={this.state.uniName}
                />
            </View>

        <View style={buttonGroupStyle}>
        <TouchableOpacity style={buttonStyle} onPress={this.saveUni}>
            <Text style={buttonTextStyle}>
                Save
            </Text>
        </TouchableOpacity>
        </View>

        </View>
        </KeyboardAvoidingView>
      );
    }
  }
  const styles = {
    containerStyle: {
      flex: 1,
      backgroundColor: '#34495e'
    },
    headerStyle: {
      flex: 6,
      paddingTop: 20,
      backgroundColor: 'grey'
    },
    bodyStyle: {
      flex: 4,
      backgroundColor: 'white',
      paddingLeft: 40,
      paddingRight: 40
    },
    ContainerStyle: {
      backgroundColor: '#34495e',
      justifyContent: 'flex-start',
      padding: 10,
      flex: 2
    },
    headerInputStyle: {
      marginLeft: 15,
      marginRight: 15,
      height: 40,
      borderColor: '#bdc3c7',
      borderBottomWidth: 1,
      fontSize: 30,
      textAlign: 'center'
    },
    textGroupStyle: {
      borderBottomWidth: 1,
      borderColor: '#bdc3c7',
      paddingBottom: 5,
      paddingTop: 5,
      marginTop: 10,
      marginBottom: 10
    },
    textHeaderStyle: {
      color: 'white',
      fontSize: 15,
      paddingLeft: 15,
      paddingBottom:30,
      marginBottom: 20,
      marginTop: 50,
    },
    textStyle: {
      fontSize: 20,
      padding: 5
    },
    buttonStyle: {
      backgroundColor: '#2ecc71',
      borderRadius: 40/2,
      height: 40,
      padding: 10,
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonTextStyle: {
      color: 'white',
      fontSize: 15
    },
    buttonGroupStyle: {
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'center',
      flex: 5,
      marginBottom: 20,
    },
  }

  export { AddUniversity };
