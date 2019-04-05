import React from 'react';
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, 
        ImageBackground } from 'react-native';
import { SearchBar } from '../../components/common/SearchBar';

class ApplicantHomeScreen extends React.Component {
    constructor(props) {
        super(props);
        const navigation = this.props.navigation;
        this.setState({ userID: navigation.state.params.userID });
        this.state = { searchValue: '' };
    }
    
    render() {
        const { containerStyle, searchBarContainer, imageContainerStyle,
                buttonStyle, buttonTextStyle } = styles;
        const logo = require('../../../assets/logo.png');
        const background = require('../../../assets/background.jpg');
        

      return (
        <ImageBackground style={containerStyle} source={background} blurRadius={2} >
            <KeyboardAvoidingView behavior='padding' enabled>
                <View style={imageContainerStyle}>
                    <Image source={logo} />
                </View>
                <View style={searchBarContainer}>
                    <SearchBar 
                        onChangeText={(searchValue) => this.setState({ searchValue })} 
                        value={this.state.searchValue}
                        placeholder='Type in a programme name'
                    />
                </View>
                <TouchableOpacity 
                    style={buttonStyle}
                    onPress={()=> this.props.navigation.navigate('ProgList', 
                            { searchVAL: this.state.searchValue, userID: this.state.userID })}
                >
                    <Text style={buttonTextStyle}>Search</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ImageBackground>
      );
    }
  }

const styles = {
    containerStyle: {
        flex: 1, 
        paddingTop: 25, 
        backgroundColor: 'green', 
        justifyContent: 'center', 
        alignItems: 'stretch'
    }, 
    searchBarContainer: {
        marginLeft: 30, 
        marginRight: 30, 
        alignItems: 'stretch'
    }, 
    imageContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center', 
        marginBottom: 20
    }, 
    buttonStyle: {
        marginLeft: 65, 
        marginRight: 65, 
        backgroundColor: '#2ecc71', 
        padding: 10, 
        marginTop: 15, 
        height: 40, 
        borderRadius: 40/2, 
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    buttonTextStyle: {
        color: 'white', 
        fontSize: 18
    }
}

  export { ApplicantHomeScreen };
