import React from 'react';
import { View, Text, ListView, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Icon, Avatar } from 'react-native-elements';
import Swipable from 'react-native-swipeable-row';
import { Spinner } from '../../components/common/';

class StudentApplicationScreen extends React.Component {
    state = { applications: [], userID: '', isLoading: true };

    componentWillMount() {
        const { navigation } = this.props;
        this.state.userID = navigation.getParam('userID', null);

        console.log(this.state.userID);
        
        const dir = firebase.database().ref().child('applications');
        console.log("This is directory :" + dir);

        dir.once('value').then(snapshot => {
            const applications = [];

            snapshot.forEach((application) => {
                if (application.val().applicantID === 'USERIDHERE') {
                    applications.push({
                        key: application.key,
                        date: application.val().date,
                        programme: application.val().programID,
                        status: application.val().status,
                    });
                }
            });

            // console.log(applications);

            const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

            this.setState({
                dataSource: ds.cloneWithRows(applications), 
                isLoading: false
            });
        });
    }

    askDelete(key) {
        const navigation = this.props.navigation;
        Alert.alert(
            'Are you sure to withdraw this application?', 
            '',
            [
                { text: 'No', onPress: () => console.log('No is pressed') }, 
                { text: 'yes', 
                    onPress: () => {
                        console.log(key);
                        const ref = firebase.database().ref('applications/' + key); 
                        // ref.remove();
                        // console.log(navigation);
                        // navigation.push('StudentApplication');
                    }
                }, 
            ], 
            { cancelable: false }
        );
    }

    // function to render data for list view
    renderRow(rowData) {
        const { rowContainerStyle, avatarStyle, rowTextContainerStyle, rowText1Style,
                avatarContainerStyle, iconContainerStyle, rowText2Style } = styles;

        const rightButtons = [
            <TouchableHighlight 
                style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-start', 
                    alignItems: 'center', backgroundColor: '#e74c3c' }}
                onPress={()=> this.askDelete(rowData.key)}
            >  
                <View style={{ flex: 1/5 }}>
                    <Icon
                        name='trash'
                        type='font-awesome'
                        color='white'
                        size={28}
                        
                    />
                </View>
            </TouchableHighlight>
            
        ];

        return (
            <Swipable rightButtons={rightButtons} >
                <TouchableOpacity 
                    onPress={() => console.log('hello world')}
                    delayPressIn='70' 
                >
                    <View style={rowContainerStyle}>
                        <View style={avatarContainerStyle} >
                            <Avatar 
                                rounded 
                                title={rowData.programme.substring(0, 1).toUpperCase()}
                                size='medium'
                                containerStyle={avatarStyle}
                                overlayContainerStyle={{ backgroundColor: '#34495e' }}
                            />
                        </View>
                        <View style={rowTextContainerStyle} >
                            <Text style={rowText1Style} >{rowData.programme}</Text>
                            <Text style={rowText2Style} >Status: {rowData.status}</Text>
                        </View>
                        <View style={iconContainerStyle}>
                            <Icon
                                name='chevron-right'
                                type='font-awesome'
                                color='grey' 
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipable>
            
        );
    }

    // render the whole screen view
    render() {
        const { headerStyle, nameContainerStyle, nameStyle, bodyStyle } = styles;
        console.log('dataSource: ' + this.state.dataSource);
        console.log(this.state.isLoading);

        if (this.state.isLoading) {
            return (
                <View style={{ backgroundColor: '#bdc3c7', flex: 1 }} >
                    <Spinner />
                </View>
            );
        }

        return (
            <View style={{ backgroundColor: '#bdc3c7', flex: 1 }} >
                <View style={headerStyle}>
                    <View style={nameContainerStyle}>
                        <Text style={nameStyle} >Applications</Text>
                    </View>
                </View>
                <View style={bodyStyle}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </View>
                
            </View>
            
        );
    }
  }

  const styles = {
    rowContainerStyle: {
        flex: 1,
        flexDirection: 'row', 
        backgroundColor: 'white', 
        marginBottom: 1,
        height: 80, 
        padding: 10, 
        alignItems: 'center', 
        paddingLeft: 30,
        paddingRight: 30
    }, 
    headerStyle: {
        flex: 1, 
        backgroundColor: '#34495e',
        paddingTop: 25
    },
    nameContainerStyle: {
        alignItems: 'center', 
        justifyContent: 'center', 
        flex: 7
    }, 
    nameStyle: {
        fontSize: 20, 
        color: 'white'
    }, 
    rowTextContainerStyle: {
        flexDirection: 'column',
        flex: 7
    }, 
    rowText1Style: {
        fontSize: 20
    }, 
    rowText2Style: {
        color: 'grey'
    },
    avatarContainerStyle: {
        flex: 2
    }, 
    bodyStyle: {
        flex: 9
    }
};

  export { StudentApplicationScreen };
