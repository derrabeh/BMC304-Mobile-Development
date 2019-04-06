import React from 'react';
import { Picker, TouchableHighlight, Button, ScrollView,RefreshControl, StyleSheet, Text,TextInput, View, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-swipeable-row';
import { Header, Input, Card} from '../../components/common';
import firebase from 'firebase';

class StudentQualification extends React.Component {
	static navigationOptions = {
		title: 'Academic Qualification',
	};
	constructor(props){
		super(props);
		this.state ={
			qualificationID:'',
			score: 0,
			userID:'',
		};
	}

	componentWillMount(){
		const { navigation } = this.props;
		this.state.userID = navigation.getParam('userID', null);

		var ref = firebase.database().ref('qualificationObtained/');
		ref.once("value", function(snapshot) {
			this.setState({
				qualificationID: snapshot.val().qualificationID,
				score: snapshot.val().score,
			});
	}.bind(this));
	}

	render(){
		const { qualificationID , score, userID } = this.state;

		QualificationCond =() => {
		  if (this.state.qualificationID == ""){
		    return(
		      <View>
		      <TouchableOpacity style={styles.addButton}
		      onPress={() => {this.props.navigation.navigate('AddQualification', { userID: this.state.userID })}}
		      >
		      <Text style={styles.addButtonText}>+</Text>
		      </TouchableOpacity>
		      </View>
		    )}

		    else{
		      return(
		        <View>
		        <ScrollView
		        scrollEnabled={!this.state.isSwiping}>
		        <Card>
		        <Swipeable
		        onSwipeStart={() => this.setState({isSwiping: true})}
		        onSwipeRelease={() => this.setState({isSwiping: false})}
		        rightButtons = {[
		          <TouchableHighlight style={styles.swipeBtn} onPress={() => {this.props.navigation.navigate('AddQualification', { userID: this.state.userID })}} >
		          <Text style={styles.swipeText}> EDIT</Text>
		          </TouchableHighlight>
		        ]}
		        >
		        <Text style={styles.typeItem}>Qualification Type : {this.state.qualificationID}</Text>
		        <Text style={styles.scoreItem}>Score : {this.state.score}</Text>
		        </Swipeable>
		        </Card>
		        </ScrollView>
		        </View>
		      )}
		      return null;
		    }
					return(
						<View>
							<Header headerText={'Academic Qualification'}/>
								{QualificationCond()}
						</View>
					);
				}
			}

		const styles = StyleSheet.create({

			addButton:{
				position: 'absolute',
				left: '40%',
				bottom: -600,
				backgroundColor: '#E91E63',
				width: 90,
				height: 90,
				borderRadius: 50,
				alignItems:'center',
				justifyContent: 'center',
				elevation: 8
			},
			addButtonText:{
				color: '#fff',
				fontSize: 24,
			},

			typeItem:{
				fontSize: 22,
				fontWeight: 'bold',

			},

			scoreItem:{
				fontSize: 20,
				fontStyle: 'italic',
				color: '#4B4B4C',
				paddingLeft: 15,
			},

			swipeBtn:{
				marginTop: 15,
				height: 20,
			},

			swipeText:{
				fontSize: 18,
				color: '#000',
				alignItems: 'center',
			}

		});

		export { StudentQualification };
