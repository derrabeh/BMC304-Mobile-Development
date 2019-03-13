import React from 'react';
import { View } from 'react-native';

const Container = (props) => (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: 'transparent', 
        justifyContent: 'flex-start', 
        flexDirection: 'row',
        borderColor: 'white',
        position: 'relative',
        marginLeft: 50,
        marginRight: 50,
    }
};

export { Container };