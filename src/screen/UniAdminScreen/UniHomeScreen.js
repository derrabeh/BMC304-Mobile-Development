import React from 'react';
import { View, Text, ListView, TouchableOpacity, TouchableHighlight, Alert ,ToastAndroid} from 'react-native';
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
            isLoading: true,
            count : 0
        };

        this.arrayHolder = [];
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount() {
        const ref = firebase.database().ref('program');

        ref.once('value')
            .then((snapshot) => {
                const qualiRetrieved = []
                snapshot.forEach((childSnapshot) => {
                  
                    // pushing all qualifications to array
                    // this.countApplicant(childSnapshot.key);
                    qualiRetrieved.push({
                        key: childSnapshot.key,
                        progName: childSnapshot.val().progName, 
                        desc: childSnapshot.val().description,
                        closingDate : childSnapshot.val().closingDate,
                        // count : 'wwww',
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
        // console.log(d.state.params.userID);
        this.props.navigation.navigate('NewProgram', {userID : d.state.params.userID});
    }

    // countApplicant(key){
    //     const ref = firebase.database().ref('applicantions');

    //     ref.once('value')
    //     .then((snapshot) => {
    //         snapshot.forEach((child)=>{
    //             console.log(child.val())
    //         })
    //     })
    // }

    handleDelete(key){
        let d = this.props.navigation;

        Alert.alert(
            'Are you sure want to delete this program?', 
            '',
            [
                { text: 'No', onPress: () => console.log('No is pressed') }, 
                { text: 'Yes', 
                    onPress: () => {
                        console.log(key);
                        const ref = firebase.database().ref('program/' + key); 
                        ref.remove();
                        ToastAndroid.show('Deleted!', ToastAndroid.SHORT);
                        setTimeout(()=>{
                            this.props.navigation.push('Uni_Home',{userID : d.state.params.userID})
                        },500)
                    }
                }, 
            ], 
            { cancelable: false }
        );
    }

    // filter qualifcation - not functioning yet
    filterQualification(searchText) {
        // console.log(searchText);
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
        let d = this.props.navigation;

        const { rowContainerStyle, avatarStyle, rowTextContainerStyle, rowText1Style,
            avatarContainerStyle, iconContainerStyle, rowText2Style } = styles;

            const rightButtons = [
                <TouchableHighlight 
                    style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-start', 
                        alignItems: 'center', backgroundColor: '#2ecc71' }}
                    onPress={()=> this.props.navigation.push('EditProgram', {
                        userID: d.state.params.userID,
                        progName : rowData.progName,
                        progDesc : rowData.desc,
                        closingDate : rowData.closingDate,   
                        key : rowData.key,
                    
                    })}
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
                    onPress={()=> this.handleDelete(rowData.key)}
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
                // onPress={() => { this.props.navigation.push('QualificationDetail', {
                //                 qualificationID: rowData.key });
            onPress={() => this.props.navigation.push('App_Prog', {  
                        prog_name: rowData.progName,
                        prog_id : rowData.key,
                        uni: rowData.uniID, })}

                delayPressIn='70' 
            >
                <View style={rowContainerStyle}>
                    <View style={avatarContainerStyle} >
                        <Avatar 
                            rounded 
                            title={rowData.progName.substring(0, 1).toUpperCase()}
                            size='medium'
                            containerStyle={avatarStyle}
                            overlayContainerStyle={{ backgroundColor: '#34495e' }}
                        />
                    </View>
                    <View style={rowTextContainerStyle} >
                        <Text style={rowText1Style} >{rowData.progName}</Text>
                        <Text style={rowText2Style} >Description: {rowData.desc}</Text>
                        <Text style={rowText2Style}>Closing Date: {rowData.closingDate}</Text>
                    </View>
                    <View>
                    <Text>{rowData.count}</Text>
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
            
            // <View>
            //     <TouchableOpacity
            //     style={styles.item}
            //     key={rowData.key}
            //     onPress={() => this.props.navigation.navigate('App_Prog', {  
            //         prog_name: rowData.progName,
            //         prog_id : rowData.key,
            //         uni: rowData.uniID, })}
            //     >
            //     </TouchableOpacity>
            //   <Text>{rowData.progName}</Text>
            // </View>
        );
    }

    // render the whole screen view
    render() {
        const { headerContainerStyle, headerTextStyle, searchBarDiv, 
                floatButtonStyle, floatButtonContainerStyle, 
                headerTextContainerStyle, headerIcon1ContainerStyle, 
                headerIcon2ContainerStyle } = styles;
        // console.log('dataSource: ' + this.state.dataSource);
        // console.log(this.state.isLoading);

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
          height: 100, 
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
        },
        item: {
            backgroundColor: '#d7dae0',
            borderRadius: 10,
            padding: 20,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 17,
            justifyContent: 'center',
            alignItems: 'center',
            shadowRadius: 3,
            shadowOpacity: 0.8,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
              width: 0,
              height: 3
            }
          },
  };


  export { UniHomeScreen };
