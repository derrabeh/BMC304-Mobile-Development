import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header } from '../components/common';

class QualificationScreen extends React.Component {
    render() {
      const { buttonStyle, innerButtonStyle } = styles;

      return (
        <View>
            <Header headerText={'Qualification'} navigation={this.props.navigation} />
            <Text>Qualification Screen</Text>
            <TouchableOpacity style={buttonStyle} >
              <View style={innerButtonStyle}>
                <Text>
                  hello
                </Text>
              </View> 
            </TouchableOpacity>
        </View>
      );
    }
  }

  const styles = {
    buttonStyle: {
      backgroundColor: 'red', 
      borderRadius: 50, 
      width: 100, 
      height: 100
    },
    innerButtonStyle: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center'
    }
  };

  export { QualificationScreen };
