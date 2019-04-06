import React from 'react';
import { View, Text, ListView, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import firebase from 'firebase';
import { Avatar, Icon } from 'react-native-elements';
import { SearchBar } from '../../components/common/SearchBar';
import { Spinner } from '../../components/common';
import Swipable from 'react-native-swipeable-row';

// import console = require('console');

class QualificationScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '', 
            isLoading: true
        };

        this.arrayHolder = [];
    }

    componentDidMount() {
        const ref = firebase.database().ref('qualification');

        ref.once('value')
            .then((snapshot) => {
                const qualiRetrieved = [];

                snapshot.forEach((childSnapshot) => {
                    // pushing all qualifications to array
                    qualiRetrieved.push({
                        key: childSnapshot.key,
                        name: childSnapshot.val().name, 
                        maxScore: childSnapshot.val().maxScore
                    });
                });

                qualiRetrieved.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1);

                const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(qualiRetrieved),
                    }, 
                    () => { this.arrayHolder = qualiRetrieved; }
                );
                
            });
    }

    // navigate to 'new qualification' screen
    addNewQuali = () => {
        this.props.navigation.push('NewQualification');
    }

    // filter qualifcation - not functioning yet
    filterQualification(searchText) {
        console.log(searchText);
        const filteredData = this.arrayHolder.filter(
            (qualification) => {
                const name = qualification.name.toUpperCase();
                const value = searchText.toUpperCase();
                
                return name.indexOf(value) > -1;
            }
        );
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(filteredData),
            searchText: searchText
        })
    }

    askDelete(key) {
        const navigation = this.props.navigation;
        Alert.alert(
            'Delete Qualification?', 
            '',
            [
                { text: 'No', onPress: () => console.log('No is pressed') }, 
                { text: 'yes', 
                    onPress: () => {
                        console.log(key);
                        const ref = firebase.database().ref('qualification/' + key); 
                        ref.remove();
                        console.log(navigation);
                        navigation.push('Qualification');
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
                    alignItems: 'center', backgroundColor: '#2ecc71' }}
                onPress={()=> this.props.navigation.push('EditQualification', {
                    qualificationID: rowData.key })}
            >  
                <View style={{ flex: 1/5 }}>
                    <Icon
                        name='pencil'
                        type='font-awesome'
                        color='white'
                        size={28}
                        
                    />
                </View>
                
            </TouchableHighlight>,
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
                    onPress={() => { this.props.navigation.push('QualificationDetail', {
                                    qualificationID: rowData.key });
                            }}
                    delayPressIn='70' 
                >
                    <View style={rowContainerStyle}>
                        <View style={avatarContainerStyle} >
                            <Avatar 
                                rounded 
                                title={rowData.name.substring(0, 1).toUpperCase()}
                                size='medium'
                                containerStyle={avatarStyle}
                                overlayContainerStyle={{ backgroundColor: '#34495e' }}
                            />
                        </View>
                        <View style={rowTextContainerStyle} >
                            <Text style={rowText1Style} >{rowData.name.toUpperCase()}</Text>
                            <Text style={rowText2Style} >Maximum Score: {rowData.maxScore}</Text>
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
        const { headerContainerStyle, headerTextStyle, searchBarDiv, 
                floatButtonStyle, floatButtonContainerStyle, 
                headerTextContainerStyle, headerIcon1ContainerStyle, 
                headerIcon2ContainerStyle } = styles;
        console.log('dataSource: ' + this.state.dataSource);
        console.log(this.state.isLoading);

        if (this.state.isLoading) {
            return (
                <View style={{ backgroundColor: '#bdc3c7', flex: 1 }} >
                <View style={searchBarDiv} >
                    <SearchBar 
                        onChangeText={()=>{console.log(this.state.qualifications)}} 
                        value={this.state.searchText}
                        placeholder='Search for qualification'
                    />
                </View>
                <Spinner />
                <View style={floatButtonContainerStyle}>
                    <TouchableOpacity 
                        onPress={() => this.addNewQuali()} 
                        style={floatButtonStyle}
                    >
                        <Icon
                            name='plus'
                            type='font-awesome'
                            color='white'
                            style={{ margin: 5 }} 
                            activeOpacity='0.8'
                            underlayColor='#34495e'
                        />
                    </TouchableOpacity>
                </View>
            </View>
            );
        }

        return (
            <View style={{ backgroundColor: '#bdc3c7', flex: 1 }} >
                <View style={searchBarDiv} >
                    <SearchBar 
                        onChangeText={(searchText) => this.filterQualification(searchText)} 
                        value={this.state.searchText}
                        placeholder='Search for qualification'
                    />
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
                <View style={floatButtonContainerStyle}>
                    <TouchableOpacity 
                        onPress={() => this.addNewQuali()} 
                        style={floatButtonStyle}
                    >
                        <Icon
                            name='plus'
                            type='font-awesome'
                            color='white'
                            style={{ margin: 5 }} 
                            activeOpacity='0.8'
                            underlayColor='#34495e'
                        />
                    </TouchableOpacity>
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
      headerContainerStyle: {
          backgroundColor: '#2c3e50',
          height: 70,
          alignItems: 'center',
          justifyContent: 'center', 
          flexDirection: 'row'
      },
      headerTextStyle: {
          color: 'white',
          fontWeight: 'bold',
          fontSize: 20, 
      },
      searchBarDiv: {
        backgroundColor: '#bdc3c7', 
        paddingLeft: 5, 
        paddingRight: 5, 
        paddingTop: 25,
        paddingBottom: 7
      }, 
      avatarStyle: {
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
      iconContainerStyle: {
          flex: 1
      }, 
      floatButtonContainerStyle: {
          position: 'absolute',
          bottom: 20,
          right: 20, 
        }, 
        floatButtonStyle: {
            borderRadius: 50 / 2, 
            backgroundColor: '#2c3e50', 
            height: 50, 
            width: 50,
            justifyContent: 'center', 
            alignItems: 'center'
        }, 
        headerTextContainerStyle: {
            flex: 8, 
            justifyContent: 'center', 
            alignItems: 'center'
        }, 
        headerIcon1ContainerStyle: {
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center'
        },
        headerIcon2ContainerStyle: {
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginRight: 5
        }
  };


  export { QualificationScreen };
