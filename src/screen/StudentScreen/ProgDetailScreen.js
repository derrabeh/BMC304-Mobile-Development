import React from 'react';
import { View, Text, Button, ToastAndroid, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';
import { Spinner } from '../../components/common';

class ProgDetailScreen extends React.Component {
    static navigationOptions = {
        title: 'App_Detail'
    };

    constructor(props) {
      super(props);
      this.state = {
        approveStatus: false,
        status: '',
        isLoading: false
      };
      this.checkApplicationStatus = this.checkApplicationStatus.bind(this);
    }

    componentDidMount() {
      this.checkApplicationStatus();
    }

    checkApplicationStatus() {
      const pv = this.props.navigation;
      
      firebase.database().ref('/applications')
      .once('value', snapshot => {
          snapshot.forEach((child) => {
              if (pv.state.params.userID == child.val().applicantID && 
              pv.state.params.prog_id == child.val().programID) {
                this.setState({
                  approveStatus: true,
                  status: child.val().status,
                });
              }

              this.setState({
                isLoading: false
              });
          });
      });
    }

    applyProg(key, applicantID, name ) {
      console.log(key, 'www');
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!

        let yyyy = today.getFullYear();
        if (dd < 10) {
        dd = `0${  dd}`;
        } 
        if (mm < 10) {
        mm = `0${  mm}`;
        } 
        today = `${dd  }/${  mm  }/${  yyyy}`;

        const all = this.props.navigation;

          try {
            const dir = firebase.database().ref('/applications').push();
            const pk = dir.key;

            dir.set({
              applicantID,
              date: today,
              programName: name,
              programID: all.state.params.prog_id,
              status: 'New'
            });

            ToastAndroid.show('Applied Successfully!', ToastAndroid.SHORT);
            setTimeout(() => {
              this.props.navigation.push('StudentApplication');
              // const navigation = this.props.navigation;
              // const navigateAction = navigation.navigate({
              //   routeName: '',
              //   params: {},
              
              //   // navigate can have a nested navigate action that will be run inside the child router
              //   action: navigation.navigate({ routeName: 'Student_Home' }),
              // });

              // Promise.all([
              //   navigation.dispatch(navigateAction)
              // ]).then(() => navigation.push('Student_Home'));
                // this.props.navigation.push('Student_Home',{userID:all.state.params.userID})
            }, 1000);
          } catch (e) {
            ToastAndroid.show(e, ToastAndroid.SHORT);
          }
    }

    renderButton(isApproved) {
      const { buttonGroupStyle, buttonStyle, buttonTextStyle } = styles;

      const pv = this.props.navigation;

      if (!isApproved) {
        return (
          <View style={buttonGroupStyle}>
            <TouchableOpacity 
                style={buttonStyle}
                onPress={() => this.applyProg(pv.state.params.key, pv.state.params.userID, pv.state.params.prog_name)}
            >
                <Text style={buttonTextStyle}>
                    Apply
                </Text>
            </TouchableOpacity>
          </View>
        );  
      }

      return <View style={buttonGroupStyle} />
    }

    render() {
      const d = this.props.navigation;

      const { headerStyle, bodyStyle, containerStyle, iconContainerStyle,
              nameStyle, nameContainerStyle, textGroupContainerStyle, 
              textGroupStyle } = styles;

      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <Spinner />
          </View>
        );
      }

      return (
        <View style={containerStyle}>
            <View style={headerStyle}>
                <View style={iconContainerStyle}>
                    <TouchableOpacity 
                    onPress={() => this.props.navigation.goBack()}
                    >
                        <View 
                            style={{ paddingLeft: 13,
                                    paddingRight: 13,
                                    paddingTop: 5, 
                                    paddingBottom: 5 }}
                        >
                            <Icon
                                name='chevron-left'
                                type='font-awesome'
                                color='white'
                                size={28}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={nameContainerStyle}>
                    <Text style={nameStyle} >{d.state.params.prog_name}</Text>
                </View>
                
            </View>
            <View style={bodyStyle}>
              <View style={textGroupContainerStyle}>
                <View style={textGroupStyle}>
                  <Text style={{color: 'grey', marginBottom: 10}}>University: </Text>
                  <Text style={{fontSize: 18, textAlign: 'center'}}>{d.state.params.uni}</Text>
                </View>
                <View style={textGroupStyle}>
                  <Text style={{color: 'grey', marginBottom: 10}}>Description: </Text>
                  <Text style={{fontSize: 18}}>{d.state.params.description}</Text>
                </View>
              </View>
              
              {this.renderButton(this.state.approveStatus)}
            </View>
            
        </View>
      );
    }
}

const styles = {
  containerStyle: {
    backgroundColor: '#34495e', 
    paddingTop: 20, 
    flex: 1
  },
  headerStyle: {
    flex: 3, 
    backgroundColor: '#34495e',
  }, 
  bodyStyle: {
    flex: 7, 
    backgroundColor: 'white', 
    paddingLeft: 40, 
    paddingRight: 40
  }, 
  iconContainerStyle: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    flex: 3, 
    alignItems: 'center'
  }, 
  nameStyle: {
    fontSize: 25, 
    color: 'white'
  }, 
  nameContainerStyle: {
    justifyContent: 'center', 
    alignItems: 'center',
    flex: 7, 
  },
  buttonStyle: {
    backgroundColor: '#2ecc71', 
    borderRadius: 40 / 2, 
    height: 40, 
    padding: 10, 
    margin: 5, 
    justifyContent: 'center', 
    alignItems: 'center'
    },  
  buttonStyle2: {
      backgroundColor: '#e74c3c', 
      borderRadius: 40 / 2, 
      height: 40, 
      padding: 10, 
      margin: 5, 
      justifyContent: 'center', 
      alignItems: 'center'
  }, 
  buttonTextStyle: {
      color: 'white', 
      fontSize: 15
  }, 
  buttonGroupStyle: {
    alignItems: 'stretch', 
    justifyContent: 'center', 
    flex: 3, 
    marginBottom: 20
  }, 
  textGroupContainerStyle: {
    flex: 7, 
    paddingTop: 15, 
    paddingBottom: 15, 
    justifyContent: 'center'
  }, 
  textGroupStyle: {
    marginBottom: 25
  }
};

export { ProgDetailScreen };
