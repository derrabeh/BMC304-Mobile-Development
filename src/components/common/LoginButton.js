import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const LoginButton = ({ onPress, children }) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'white', 
        borderRadius: 15, 
        borderWidth: 1,
        borderColor: 'white',
        marginLeft: 5, 
        marginRight: 5
    }, 
    textStyle: {
        alignSelf: 'center', 
        color: '#68C2E8', 
        fontSize: 16, 
        fontWeight: '600',
        paddingTop: 10, 
        paddingBottom: 10
    }
};

export { LoginButton };
