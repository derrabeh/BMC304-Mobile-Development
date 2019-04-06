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
			selectedValue: ''
		}
	}

	componentDidMount(){
		const { navigation } = this.props;
		this.state.userID = navigation.getParam('userID', null);

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
							console.log(this.state.names);
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

		if (this.state.isLoading) {
			return (
				<View>
					<Text>Loading</Text>
				</View>
			)
		}

		saveQuali = () => {
			if (this.state.userID == ''){
			firebase.database().ref('qualificationObtained/').push({
        userID: this.state.userID,
				score: this.state.score,
				qualificationID: this.state.qualificationID,
      });
			Alert.alert(
				'SUCCESS',
				'Confirm To Add Qualification?',
				[
					{text: 'Cancel'},
					{text: 'OK', onPress:() => this.props.navigation.push('StudentQualification',{
						userID: this.state.userID,
						score: this.state.score,
						qualificationID: this.state.qualificationID,
					})
				}
			],
		);
		}
		else {
			firebase.database().ref('qualificationObtained/').set({
				userID: this.state.userID,
				score: this.state.score,
				qualificationID: this.state.qualificationID,
		})
		Alert.alert(
			'SUCCESS',
			'Confirm To Update Qualification?',
			[
				{text: 'Cancel'},
				{text: 'OK', onPress:() => this.props.navigation.push('StudentQualification',{
					userID: this.state.userID,
					score: this.state.score,
					qualificationID: this.state.qualificationID,
				})
			}
		],
	);
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
				(value, index) => this.setState({qualificationID: value})
			}
			>

			{this.renderPicker()}

			</Picker>

			<Card>
			<TextInput
			keyboardType="numeric" onChangeText={score => this.setState({score})} value= {this.state.score}
			label="Score" placeholder="Enter your score" blurRadius={1}
			/>
			</Card>

			<Button title="SAVE" onPress={saveQuali} />
			</ScrollView>
			</KeyboardAvoidingView>

		);
	}
}

		export { AddQualification };
