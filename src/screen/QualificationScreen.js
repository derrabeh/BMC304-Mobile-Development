import React from 'react';
import { View, Text, ListView, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Avatar, Icon } from 'react-native-elements';
import { SearchBar } from '../components/common/SearchBar';

// import console = require('console');

class QualificationScreen extends React.Component {
    state = { qualifications: [], searchText: '' };

    componentWillMount() {
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
                // sort the array
                qualiRetrieved.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1);
                this.setState({ qualifications: qualiRetrieved });
                console.log(this.state.qualifications);
            });
    }

    addNewQuali = () => {
        this.props.navigation.navigate('NewQualification');
    }

    filterQualification(searchText) {

        let filteredQuali = [];
        // console.log(searchText);
        // console.log(this.state.qualifications);
        const qualifications = this.state.qualifications;
        if (searchText !== '') {
            filteredQuali = qualifications.filter((searchText) => {
                return qualifications.name === searchText;
            });
        }
        console.log(filteredQuali);
    }

    renderRow(rowData) {
        const { rowContainerStyle, avatarStyle, rowTextContainerStyle, rowText1Style,
                avatarContainerStyle, iconContainerStyle, rowText2Style } = styles;

        return (
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
            
        );
    }

    render() {
        const { headerContainerStyle, headerTextStyle, searchBarDiv, 
                floatButtonStyle, floatButtonContainerStyle, 
                headerTextContainerStyle, headerIcon1ContainerStyle, 
                headerIcon2ContainerStyle } = styles;
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        // console.log(this.state.qualifications);

        this.state = {
            dataSource: ds.cloneWithRows(this.state.qualifications),
          };

        return (
            <View style={{ backgroundColor: '#bdc3c7', flex: 1 }} >
                {/* <View style={headerContainerStyle} >
                    <TouchableOpacity 
                        style={headerIcon1ContainerStyle} 
                        onPress={() => this.props.navigation.navigate('Admin_Home')}
                    >
                        <Icon
                            name='chevron-left'
                            type='font-awesome'
                            color='white'
                        />
                    </TouchableOpacity>
                    
                    <View style={headerTextContainerStyle}>
                        <Text style={headerTextStyle} >Qualification</Text>
                    </View>
                    <View style={headerIcon2ContainerStyle}>
                        <Icon
                            name='sort'
                            type='sort-alpha-down'
                            color='white'
                        />
                    </View>
                    
                </View> */}
                <View style={searchBarDiv} >
                    <SearchBar 
                        onChangeText={()=>{console.log(this.state.qualifications)}} 
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
