import React from 'react';
import { View, Button, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Header } from '../../components/common';

class AdminHomeScreen extends React.Component {
  state = { userID: '' };
  
  componentWillMount() {
    const { navigation } = this.props;
    this.state.userID = navigation.getParam('userID', null);
    
  }  
  
  render() {
      const { buttonStyle, headerStyle, bodyStyle, containerStyle } = styles;
      const logo = require('../../../assets/logo.png');
      const background = require('../../../assets/background.jpg');

      return (
        <View style={containerStyle}>
            <ImageBackground style={headerStyle} source={background} blurRadius={2}>
              <Image source={logo} />
            </ImageBackground>
            <View style={bodyStyle}>
              {/* <Button 
                  title='Set Qualitification' 
                  onPress={() => this.props.navigation.navigate('Qualification')} 
                  style={{ marginBottom: 10, paddingBottom: 10 }} 
              />
              <Button 
                  title='Register Uni' 
                  onPress={() => this.props.navigation.navigate('StudentApplication', { userID: this.state.userID })} 
                  style={buttonStyle} 
              /> */}
              <TouchableOpacity style={buttonStyle}>
                <Text>Qualifications</Text>
              </TouchableOpacity>
            </View>
            
        </View>
      );
    }
  }

  const styles = {
    headerStyle: {
      flex: 7, 
      backgroundColor: 'yellow', 
      alignItems: 'center', 
      justifyContent: 'center'
    }, 
    bodyStyle: {
      flex: 3, 
      backgroundColor: 'green'
    }, 
    containerStyle: {
      flex: 1, 
      marginTop: 20
    }, 
    buttonStyle: {
      padding: 5, 
      backgroundColor: 'red'
    }
  };

  export { AdminHomeScreen };
