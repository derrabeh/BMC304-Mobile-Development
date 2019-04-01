import React from 'react';
import { View, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

const SearchBar = ({ onChangeText, value, placeholder }) => {
    const { textInputStyle, textInputContainerStyle, iconStyle } = styles;

    return (
        <View style={textInputContainerStyle}>
            <Icon
                style={iconStyle}
                name='search'
                type='font-awesome'
                color='grey' 
            />
            <TextInput
                placeholder={placeholder}
                style={textInputStyle}
                onChangeText={onChangeText}
                value={value}
                textAlign='center'
            />
        </View>
    );
};

const styles = {
    textInputStyle: {
        height: 35, 
        backgroundColor: 'white',
        flex: 19, 
        margin: 5,
        marginLeft: 8,
        marginRight: 8
    }, 
    textInputContainerStyle: {
        borderRadius: 20,
        backgroundColor: 'white', 
        height: 40, 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingLeft: 15,
        paddingRight: 15
    }, 
    iconStyle: {
        flex: 1
    }
};

export { SearchBar };
