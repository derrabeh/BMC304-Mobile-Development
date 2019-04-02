import React from 'react';
import firebase from 'firebase';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';


class QualificationDetailsScreen extends React.Component {
    state = { key: '', name: '', maxScore: '', minScore: '', grades: '', description: '' };
  
    componentWillMount() {
        const { navigation } = this.props;
        
        this.state.key = navigation.getParam('qualificationID', null);

        const ref = firebase.database().ref('qualification/' + this.state.key);

        ref.once('value')
            .then((snapshot) => {
                this.setState({ name: snapshot.val().name });
                this.setState({ maxScore: snapshot.val().maxScore });
                this.setState({ minScore: snapshot.val().minScore });
                this.setState({ grades: snapshot.val().grades });
                this.setState({ description: snapshot.val().description });
            }
        );
    }

    askDelete() {
        const key = this.state.key;
        const navigation = this.props.navigation;
        Alert.alert(
            'Delete Qualification?', 
            '',
            [
                { text: 'No', onPress: () => console.log('No is pressed') }, 
                { text: 'yes', 
                    onPress: () => {
                        console.log(key);
                        const ref = firebase.database().ref('qualification/' + key); 
                        ref.remove();
                        console.log(navigation);
                        navigation.push('Qualification');
                    }
                }, 
            ], 
            { cancelable: false }
        );
    }

    render() {
        const { headerStyle, bodyStyle, containerStyle, iconContainerStyle,
                nameStyle, nameContainerStyle, buttonStyle, buttonTextStyle,
                buttonGroupStyle, textGroupContainerStyle, buttonStyle2,
                textGroupStyle, textHeaderStyle, textStyle, textGroupStyle2 } = styles;

      return (
        <View style={containerStyle}>
            <View style={headerStyle}>
                <View style={iconContainerStyle}>
                    <TouchableOpacity 
                    onPress={() => this.props.navigation.push('Qualification')}
                    >
                        <View 
                            style={{ paddingLeft: 13, paddingRight: 13, paddingTop: 5, 
                            paddingBottom: 5 }}
                        >
                            <Icon
                                name='chevron-left'
                                type='font-awesome'
                                color='white'
                                size={28}
                            />
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity 
                    onPress={() => console.log('hello world')}
                    >
                        <View 
                            style={{ paddingLeft: 13, paddingRight: 13, paddingTop: 5, 
                            paddingBottom: 5 }}
                        >
                            <Icon
                                name='pencil'
                                type='font-awesome'
                                color='white'
                                size={28}
                            />
                        </View>
                    </TouchableOpacity> */}
                </View>
                <View style={nameContainerStyle}>
                    <Text style={nameStyle} >{this.state.name}</Text>
                </View>
                
            </View>
            <View style={bodyStyle}>
                <View style={textGroupContainerStyle}>
                    <View style={textGroupStyle2}>
                        <View>
                            <Text style={textHeaderStyle}>Minimum Score</Text>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={textStyle}>{this.state.minScore}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={textHeaderStyle}>Maximum Score</Text>
                            <View>
                                <Text style={textStyle}>{this.state.maxScore}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={textGroupStyle}>
                        <Text style={textHeaderStyle}>List of possible grades</Text>
                        <Text style={textStyle}>{this.state.grades}</Text>
                    </View>
                    <View style={textGroupStyle}>
                        <Text style={textHeaderStyle}>Description</Text>
                        <Text style={textStyle}>{this.state.description}</Text>
                    </View>
                    
                </View>
                <View style={buttonGroupStyle}>
                    <TouchableOpacity style={buttonStyle}>
                        <Text style={buttonTextStyle}>
                            Update
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={buttonStyle2}
                        onPress={this.askDelete.bind(this)}
                    >
                        <Text style={buttonTextStyle}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      );
    }
  }

  const styles = {
      containerStyle: {
          flex: 1, 
          backgroundColor: 'grey'
      },
      headerStyle: {
          flex: 3, 
          backgroundColor: '#34495e',
          paddingTop: 25
      }, 
      bodyStyle: {
          flex: 7, 
          backgroundColor: 'white', 
          paddingLeft: 40, 
          paddingRight: 40
      }, 
      iconContainerStyle: {
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          flex: 3, 
          alignItems: 'center'
      }, 
      nameStyle: {
        fontSize: 40, 
        color: 'white'
      }, 
      nameContainerStyle: {
        alignItems: 'center', 
        justifyContent: 'center', 
        flex: 7
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
      buttonStyle2: {
          backgroundColor: '#e74c3c', 
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
        alignItems: 'stretch', 
        justifyContent: 'center', 
        flex: 3, 
        marginBottom: 20, 
      }, 
      textGroupContainerStyle: {
        flex: 7, 
        paddingTop: 15, 
        paddingBottom: 15, 
        justifyContent: 'center'
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
          color: 'grey'
      }, 
      textStyle: {
          fontSize: 16, 
          padding: 5
      }, 
      textGroupStyle2: {
        borderBottomWidth: 1, 
        borderColor: '#bdc3c7', 
        paddingBottom: 5, 
        paddingTop: 5, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 10, 
        marginBottom: 10
        },
  };

  export { QualificationDetailsScreen };
