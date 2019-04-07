import React from 'react';
import { View, Text, ListView, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import firebase from 'firebase';
import { Avatar, Icon } from 'react-native-elements';
import { SearchBar } from '../../components/common/SearchBar';
import { Spinner } from '../../components/common';
import Swipable from 'react-native-swipeable-row';

class UniAdminScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };

    this.arrayHolder = [];
  }


  componentDidMount() {
    const { navigation } = this.props;
    this.state.uniID = navigation.getParam('uniID', null);
    //console.log(this.state.uniID);

    const ref = firebase.database().ref('users');
      ref.once('value')
      .then((snapshot) => {
        const uniAdminRetrieved =[];

        if (childSnapshot.val().uniID == this.state.uniID){
          snapshot.forEach((childSnapshot) => {

            uniAdminRetrieved.push({
              key: childSnapshot.key,
              name: childSnapshot.val().name,
              email:  childSnapshot.val().email,
              username: childSnapshot.val().username,
            });
        });
      }

        uniAdminRetrieved.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1);

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(uniAdminRetrieved),
            },
            () => { this.arrayHolder = uniAdminRetrieved; }
        );

        });
      }

  addNewUniAdmin = () => {
    this.props.navigation.push('AddUniAdmin');
  }

  askDelete(key) {
    const navigation = this.props.navigation;
    Alert.alert(
      'Delete this university admin?',
      '',
      [
        { text: 'No', onPress: () => console.log('No is pressed') },
        { text: 'yes',
        onPress: () => {
          console.log(key);
          const ref = firebase.database().ref('users/' + key);
          ref.remove();
          const uniRef = firebase.database().ref('uniAdmin/' + key);
          uniRef.remove();
          navigation.push('UniAdminScreen');
        }
      },
    ],
    { cancelable: false }
  );
}

renderRow(rowData) {
  const { rowContainerStyle, avatarStyle, rowTextContainerStyle, rowText1Style,
    avatarContainerStyle, iconContainerStyle, rowText2Style } = styles;

    const rightButtons = [
      <TouchableHighlight
        style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-start',
        alignItems: 'center', backgroundColor: '#2ecc71' }}
        onPress={()=> this.props.navigation.push('EditUniAdmin', {
          uniAdminID: rowData.key,
          userID: rowData.userID
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
          onPress={() => { this.props.navigation.push('AddUniAdmin', {
            uniID: rowData.key });
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

  render(){
    const { headerContainerStyle, headerTextStyle, searchBarDiv,
      floatButtonStyle, floatButtonContainerStyle,
      headerTextContainerStyle, headerIcon1ContainerStyle,
      headerIcon2ContainerStyle } = styles;
      console.log('dataSource: ' + this.state.dataSource);
      console.log(this.state.isLoading);

      if (this.state.isLoading) {
        return (
          <View style={{ backgroundColor: '#bdc3c7', flex: 1 }} >
          <Spinner />
          <View style={floatButtonContainerStyle}>
          <TouchableOpacity
          onPress={() => this.addNewUni()}
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

        <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        />
        <View style={floatButtonContainerStyle}>
        <TouchableOpacity
        onPress={() => this.addNewUniAdmin()}
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

  export { UniAdminScreen };
