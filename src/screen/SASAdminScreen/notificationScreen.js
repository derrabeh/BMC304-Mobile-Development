import React from 'react';
import { View, Text, ListView, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import firebase from 'firebase';
import { Avatar, Icon } from 'react-native-elements';
import { SearchBar } from '../../components/common/SearchBar';
import { Spinner } from '../../components/common';
import Swipable from 'react-native-swipeable-row';

class notificationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      isLoading: true
    };

    this.arrayHolder = [];
  }

  componentDidMount() {
    const ref = firebase.database().ref('notification');
    ref.once('value')
    .then((snapshot) => {
      const notiRetrieved = [];

      snapshot.forEach((childSnapshot) => {

        notiRetrieved.push({
          key: childSnapshot.key,
          newQuali: childSnapshot.val().newQuali,
        });
      });
      //console.log(uniRetrieved)

      notiRetrieved.sort((a, b) => (a.newQuali.toUpperCase() > b.newQuali.toUpperCase()) ? 1 : -1);

      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(notiRetrieved),
      },
      () => { this.arrayHolder = notiRetrieved; }
    );

  });
}

askDelete(key) {
  const navigation = this.props.navigation;
  Alert.alert(
    'Delete this qualification?',
    '',
    [
      { text: 'No', onPress: () => console.log('No is pressed') },
      { text: 'yes',
      onPress: () => {
        console.log(key);
        const ref = firebase.database().ref('notification/' + key);
        ref.remove();
        navigation.push('notificationScreen');
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
      <View style={rowContainerStyle}>
        <View style={rowTextContainerStyle} >
          <Text style={rowText1Style} >{rowData.newQuali.toUpperCase()}</Text>
        </View>
      </View>
      </Swipable>
    );
  }

  render(){
    const { headerContainerStyle, headerTextStyle, headerTextStyle2,
      headerTextContainerStyle, headerContainerStyle2 } = styles;

      if (this.state.isLoading) {
        return (
          <View style={{ backgroundColor: '#bdc3c7', flex: 1 }} >
            <Text> Loading </Text>
          </View>
        );
      }

      return (
        <View style={{ backgroundColor: '#bdc3c7', flex: 1 }} >
            <View style={headerContainerStyle} >
                <Text style={headerTextStyle}> Notification </Text>
            </View>

            <View style={headerContainerStyle2}>
              <Text style={headerTextStyle2}> This is the qualification that not found in the system. </Text>
            </View>

        <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        />
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
    headerContainerStyle2:{
      backgroundColor: 'grey',
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    headerTextStyle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
    },
    headerTextStyle2: {
      color: 'white',
      fontSize: 15,
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
  }

  export { notificationScreen }
