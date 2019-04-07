import React from 'react';
import { Alert, Picker, Button, StyleSheet, Text,TextInput, View, TouchableOpacity, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Header, Input, Card} from '../../components/common';
import firebase from 'firebase';
import MailCore from 'react-native-mailcore';

class AddQualification extends React.Component {
	static navigationOptions = {
		title: 'New Qualification',
	};

	constructor(props){
		super(props);
		this.state = {
			userID:'',
			qualificationID: '',
			score:0,
			isLoading: true,
			isExist: false,
			key: '',
			newQuali:'',
		}
	}

	componentWillMount(){
		const { navigation } = this.props;
		this.setState({
			 userID: navigation.getParam('userID', null),
			 isExist: navigation.getParam('isExist', null),
			 key: navigation.getParam('key', null)
		});

		const ref = firebase.database().ref('/qualification');
		ref.once('value')
		.then((snapshot) => {
			const qualification = [];
			const names = [];

			snapshot.forEach((childSnapshot) => {
				qualification.push({
					id: childSnapshot.key,
					name: childSnapshot.val().name
				});
				// console.log(qualification);
			});
			this.setState({
				qualificationRetrived: qualification,
				isLoading: false
			})
		});

	}


	renderPicker() {
		return this.state.qualificationRetrived.map((qualification) => {
			return (
				<Picker.Item key={qualification.id} value={qualification.id} label={qualification.name} />
			)
		})
	}



	render(){

		const { userID, qualificationID, qualificationName, score } = this.state;
		// console.log(this.state.qualificationRetrived);

		pickerOptionText = () => {
			if (this.state.qualificationID == 'OTHERS'){
				return(
				<View>
				<TextInput
				onChangeText={newQuali => this.setState({newQuali})} value= {this.state.newQuali}
				label="Qaulification Name" placeholder="Enter the Qualification Name" blurRadius={1}
				/>

			<Button title="SEND FOR VERIFICATION" onPress={sendNoti} />
			</View>

			)}

			else{
				return(
				<View>
				<Card>
				<TextInput
				keyboardType="numeric" onChangeText={score => this.setState({score})} value= {this.state.score}
				label="Score" placeholder="Enter your score" blurRadius={1}
				/>
				</Card>

				<Button title="SAVE" onPress={saveQuali} />
				</View>
			)}
		}

		if (this.state.isLoading) {
			return (
				<View>
				<Text>Loading</Text>
				</View>
			)
		}

		sendNoti =() =>{
			firebase.database().ref('notification/').push
			({
				newQuali: this.state.newQuali,
			});

			Alert.alert(
				'SUCCESS',
				'Your Qualification is sent to admin for verification',
				[
					{text: 'Cancel'},
					{text: 'OK',  onPress: () => {this.props.navigation.push('StudentQualification')}
				}
				]
			)
			}

		saveQuali = () => {
			//console.log(this.state.isExist);
			//console.log(this.state.key);
			if (this.state.isExist == false){
				firebase.database().ref('qualificationObtained/').push
				({
					userID: this.state.userID,
					score: this.state.score,
					qualificationID: this.state.qualificationID,
				});

				Alert.alert(
					'SUCCESS',
					'Confirm To Add Qualification?',
					[
						{text: 'Cancel'},
						{text: 'OK',  onPress: () => {this.props.navigation.push('StudentQualification',
							{
								userID: this.state.userID,
								score: this.state.score,
								qualificationID: this.state.qualificationID,
							}
						)}
					}
					]
				)
				}

				if (this.state.isExist == true) {
					firebase.database().ref('qualificationObtained/' + this.state.key).update({
						userID: this.state.userID,
						score: this.state.score,
						qualificationID: this.state.qualificationID,
					})
					Alert.alert(
						'SUCCESS',
						'Confirm To Update Qualification?',
						[
							{text: 'Cancel'},
							{text: 'OK', 	onPress: () => {this.props.navigation.push('StudentQualification',
								{
									userID: this.state.userID,
									score: this.state.score,
									qualificationID: this.state.qualificationID,
								}
							)}
							}
						]
					)
					}
				}

			return(
				<KeyboardAvoidingView behavior='padding' enabled>
				<ScrollView>
				<Header headerText={'New Qualification'} navigation={this.props.navigation} />

				<Picker
				selectedValue={this.state.qualificationID}
				style
				onValueChange={
					(value, index) => {this.setState({qualificationID: value}); console.log(value);}
				}
				>
				{this.renderPicker()}
				<Picker.Item label='others' value='OTHERS'/>

				</Picker>

				<View>
				 {pickerOptionText()}
				</View>

				</ScrollView>
				</KeyboardAvoidingView>

			);
		}
	}

	export { AddQualification };
