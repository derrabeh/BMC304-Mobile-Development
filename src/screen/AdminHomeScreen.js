import React from 'react';
import { View, Button } from 'react-native';
import { Header } from '../components/common';

class AdminHomeScreen extends React.Component {
  state = { userID: '' };
  
  componentWillMount() {
    const { navigation } = this.props;
    this.state.userID = navigation.getParam('userID', null);
    
  }  
  
  render() {
      const { buttonStyle } = styles;

      return (
        <View>
            <Header headerText={'Admin_Home Screen'} navigation={this.props.navigation} />
            <Button 
                title='Set Qualitification' 
                onPress={() => this.props.navigation.navigate('Qualification')} 
                style={{ marginBottom: 10, paddingBottom: 10 }} 
            />
            <Button 
                title='Register Uni' 
                onPress={() => this.props.navigation.navigate('StudentApplication', { userID: this.state.userID })} 
                style={buttonStyle} 
            />
        </View>
      );
    }
  }

  const styles = {
    buttonStyle: {
      marginBottom: 10
    }
  }

  export { AdminHomeScreen };
