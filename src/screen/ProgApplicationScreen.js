import React from 'react';
import { View, Text, Button } from 'react-native';
import { Header, Input } from '../components/common';


class ProgApplicationScreen extends React.Component {
    static navigationOptions = {
        title: 'prog_app'
    };


    render() {
    let d = this.props.navigation;
    // console.log(d.state.params.prog_name);
      return (
        <View>
            <Header headerText={'Prog App'} navigation={this.props.navigation} />
            <Text>Prog app - {d.state.params.name}</Text>
            <Button title="Back" onPress={() => this.props.navigation.navigate('Uni_Home')} />
        </View>
      );
    }
}

export { ProgApplicationScreen };