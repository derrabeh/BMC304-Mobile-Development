import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, 
        TouchableOpacity, ScrollView } from 'react-native';
import firebase from 'firebase';
import { Icon } from 'react-native-elements';

// import console = require('console');

class NewQualificationScreen extends React.Component {
    state = { name: '', min: '', max: '', grades: '', description: '' }

    saveQualification = () => {

        const name = this.state.name;
        const min = this.state.min;
        const max = this.state.max;
        const grades = this.state.grades;
        const description = this.state.description;
        

        if (name !== '' && min !== '' && max !== '' && 
            grades !== '' && description !== '' ) {

            const qualification = {
                name, 
                minScore: min, 
                maxScore: max, 
                grades,
                description
            };


            try {
                console.log('sucess');
                const dir = firebase.database().ref('/qualification');
                dir.push(qualification);
                this.props.navigation.push('Qualification');
            }
            catch (error) {
                console.log(error);
            }

        }
        else {
            console.log('failed');
        }
    }

    render() {
        const { headerStyle, nameTextFieldStyle, nameInputContainerStyle,
                iconContainerStyle, bodyContainerStyle, textInputStyle,
                inputContainerStyle, inputTextStyle } = styles;

      return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' enabled >
            <ScrollView style={{flex: 1}}>
                <View style={headerStyle}>
                    <View style={iconContainerStyle}>
                        <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Qualification')}
                        >
                            <View style={{ paddingLeft: 13, paddingRight: 13, paddingTop: 5, 
                                paddingBottom: 5 }}
                        >
                                <Icon
                                    name='times'
                                    type='font-awesome'
                                    color='white'
                                    size={28}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.saveQualification}
                        >
                            <View style={{ paddingLeft: 13, paddingRight: 13, paddingTop: 5, 
                                paddingBottom: 5  }}>
                                <Icon
                                name='check'
                                type='font-awesome'
                                color='white' 
                                size={28}
                                />
                            </View>
                        </TouchableOpacity>  
                    </View>
                    <View style={nameInputContainerStyle}>
                        <TextInput
                            style={nameTextFieldStyle}
                            onChangeText={(name) => this.setState({ name })}
                            value={this.state.name}
                            autoFocus
                            placeholder='Qualification Name'
                        />
                    </View>
                </View>
                <View style={bodyContainerStyle}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={inputContainerStyle} >
                        <Text style={inputTextStyle} >Minimum Score</Text>
                        <TextInput
                            onChangeText={(min) => this.setState({ min })}
                            value={this.state.min}
                            style={textInputStyle}
                        />
                    </View>
                    <View style={inputContainerStyle}>
                        <Text style={inputTextStyle} >Maximum Score</Text>
                        <TextInput
                            onChangeText={(max) => this.setState({ max })}
                            value={this.state.max}
                            style={textInputStyle}
                        />
                    </View>
                    <View style={inputContainerStyle}>
                        <Text style={inputTextStyle} >List of Possible Grades</Text>
                        <TextInput style={inputTextStyle} 
                            onChangeText={(grades) => this.setState({ grades })}
                            value={this.state.grades}
                            style={textInputStyle}
                        />
                    </View>
                    <View style={inputContainerStyle}>
                        <Text style={inputTextStyle} >Description</Text>
                        <TextInput
                            onChangeText={(description) => this.setState({ description })}
                            value={this.state.description}
                            style={textInputStyle}
                        />
                    </View>
                    </View>
                </View>
            </ScrollView>
            
        </KeyboardAvoidingView>
      );
    }
  }

  const styles = {
      headerStyle: {
          height: 180, 
          backgroundColor: '#34495e',  
          alignItems: 'stretch', 
          marginTop: 20, 
          flex: 3
      }, 
      nameTextFieldStyle: {
          color: 'white', 
          borderColor: 'white', 
          borderBottomWidth: 1, 
          height: 70, 
          fontSize: 30, 
      }, 
      nameInputContainerStyle: {
          flex: 8, 
          alignItems: 'stretch', 
          justifyContent: 'center', 
          marginLeft: 40, 
          marginRight: 40, 
          marginTop: 20, 
          marginBottom: 20
      }, 
      iconContainerStyle: {
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          flex: 2, 
          alignItems: 'center', 
      }, 
      bodyContainerStyle: {
          marginLeft: 40, 
          marginRight: 40, 
          flex: 7, 
          paddingTop: 10, 
          justifyContent: 'flex-end'
      }, 
      textInputStyle: {
          borderWidth: 1, 
          borderColor: 'grey', 
          padding: 5, 
          height: 40
      }, 
      inputContainerStyle: {
          marginTop: 10, 
          marginBottom: 10
      }, 
      inputTextStyle: {
          color: 'grey'
      }
  }

  export { NewQualificationScreen };
