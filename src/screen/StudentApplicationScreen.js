import React from 'react';
import { View, Text } from 'react-native';
import { Header } from '../components/common';
import firebase from 'firebase';

class StudentApplicationScreen extends React.Component {
    state = { applications: [], userID: '' };

    componentWillMount() {
        const { navigation } = this.props;
        this.state.userID = navigation.getParam('userID', null);

        console.log(this.state.userID);
        
        const dir = firebase.database().ref().child('application/' + this.state.userID);
        console.log("This is directory :" + dir);

        dir.once('value').then(snapshot => {
            const applications = [];

            snapshot.forEach((application) => {
                applications.push({
                    date: application.val().date,
                    programme: application.val().programme,
                    status: application.val().status,
                    university: application.val().university,
                });
            });

            this.setState({ applications: applications });
            // console.log(this.state.applications);

            const today = new Date();
            const date = today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();

            if (snapshot.val() == null) {
                dir.set(
                {    
                    application: {
                        programme: 'BIT', 
                        university: 'HELP', 
                        status: 'NEW', 
                        date: date
                    }
                });
            }
            else {
                dir.child('application2').set(   
                    {
                        programme: 'BIT', 
                        university: 'Sunway', 
                        status: 'NEW', 
                        date: date
                    }
                )
            }
        });
    }

    renderApplications() {
        return this.state.applications.map(application => <Text>{application.university}</Text>);
    }

    render() {
      return (
        <View>
            <Header headerText={'Student application'} navigation={this.props.navigation} />
            <Text>Student Application Screen</Text>
            {this.renderApplications()}
        </View>
      );
    }
  }

  export { StudentApplicationScreen };
