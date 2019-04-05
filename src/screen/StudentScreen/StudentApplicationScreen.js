import React from 'react';
import { View, Text } from 'react-native';
import { Header, CardItem, Card } from '../../components/common';
import firebase from 'firebase';
import { SwipeListView } from 'react-native-swipe-list-view';

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
        return this.state.applications.map(application =>
            <CardItem>
                <Text>{application.university}</Text>
            </CardItem>);
    }

    render() {
      return (
        <View>
            <Header headerText={'Student application'} navigation={this.props.navigation} />
            <Text>Student Application Screen</Text>
            <Card>
                {this.renderApplications()}
            </Card>
            <SwipeListView
                useFlatList
                data={this.state.listViewData}
                renderItem={ (data, rowMap) => (
                    <View style={styles.rowFront}>
                        <Text>I am {data.item} in a SwipeListView</Text>
                    </View>
                )}
                renderHiddenItem={ (data, rowMap) => (
                    <View style={styles.rowBack}>
                        <Text>Left</Text>
                        <Text>Right</Text>
                    </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-75}
            />
        </View>
      );
    }
  }

  export { StudentApplicationScreen };
