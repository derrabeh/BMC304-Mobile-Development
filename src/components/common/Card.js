import React from 'react';
import { View } from 'react-native';

const Card = (props) => (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );

const styles = {
    containerStyle: {
        borderTopWidth: 3,
        borderBottomWidth: 3 ,
        borderColor: '#c6c6c6',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        }, 
        shadowOpacity: 0.1,
        shadowRadius: 2,
        marginLeft: 5, 
        marginRight: 5, 
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 10,
        paddingTop: 10
    }
};

export { Card };
