import React from 'react';
import { View, Text, ListView, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import firebase from 'firebase';
import { Avatar, Icon } from 'react-native-elements';
import { SearchBar } from '../../components/common/SearchBar';
import { Spinner } from '../../components/common';
import Swipable from 'react-native-swipeable-row';

// import console = require('console');

class UniHomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '', 
            isLoading: true
        };

        this.arrayHolder = [];
    }
    componentDidMount() {
        const ref = firebase.database().ref('program');

        ref.once('value')
            .then((snapshot) => {
                const qualiRetrieved = [];

                snapshot.forEach((childSnapshot) => {
                    // pushing all qualifications to array
                    qualiRetrieved.push({
                        key: childSnapshot.key,
                        progName: childSnapshot.val().progName, 
                        desc: childSnapshot.val().description
                    });
                });

                qualiRetrieved.sort((a, b) => (a.progName.toUpperCase() > b.progName.toUpperCase()) ? 1 : -1);

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
    addNewProg = () => {
        let d = this.props.navigation;
        console.log(d.state.params.userID);
        this.props.navigation.navigate('NewProgram', {userID : d.state.params.userID});
    }

    // filter qualifcation - not functioning yet
    filterQualification(searchText) {
        console.log(searchText);
        const filteredData = this.arrayHolder.filter(
            (qualification) => {
                const name = qualification.progName.toUpperCase();
                const value = searchText.toUpperCase();
                
                return name.indexOf(value) > -1;
            }
        );
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(filteredData),
            searchText: searchText
        })
    }

    // function to render data for list view
    renderRow(rowData) {
        return (
            <View>
              <Text>{rowData.progName}</Text>
            </View>
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
                        onPress={() => this.addNewProg()} 
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
                        onPress={() => this.addNewProg()} 
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


  export { UniHomeScreen };
