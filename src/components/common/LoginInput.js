import React from 'react';
import { TextInput, View, Text, Image } from 'react-native';

// eslint-disable-next-line arrow-body-style
const LoginInput = ({ icon, value, onChangeText, placeholder, secureTextEntry }) => {
    const { inputStyle, iconStyle, containerStyle, iconContainerStyle } = styles;

    return (
        <View style={containerStyle} >
            <View style={iconContainerStyle}>
                <Image source={icon} style={iconStyle} />
            </View>
            <TextInput
                autocorrect={false}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={inputStyle}
                secureTextEntry={secureTextEntry}
                placeholderTextColor='white'
            />
        </View>
    );
};

const styles = {
    inputStyle: {
        color: 'white',
        paddingRight: 5,
        paddingLeft: 5, 
        fontSize: 15,
        lineHeight: 23, 
        flex: 10
    }, 
    iconStyle: {
        height: 30,
        width: 30,
    }, 
    containerStyle: {
        height: 40, 
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center'
    }, 
    iconContainerStyle: {
        flex: 2, 
        flexDirection: 'row',
        // justifyContent: 'flex-end',
        paddingRight: 20
    }
};

export { LoginInput };
