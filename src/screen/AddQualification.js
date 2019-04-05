import React from 'react';
import { Alert, Picker, Button, StyleSheet, Text,TextInput, View, TouchableOpacity, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Header, Input, Card} from '../components/common';
import firebase from 'firebase';

class AddQualification extends React.Component {
	static navigationOptions = {
		title: 'New Qualification',
	};

	constructor(props){
		super(props);
		this.state = {
			userID:'',
			Q_type: '',
			score:0,
		}
	}

	componentWillMount(){
		const { navigation } = this.props;
		this.state.userID = navigation.getParam('userID', null);

		// console.log(this.state.userID);
		var ref = firebase.database().ref('/users/' + this.state.userID);
		ref.once("value", function(snapshot) {
			this.setState({
				Q_type: snapshot.val().Q_type,
				score: snapshot.val().score,
			});
		}.bind(this));
	}


	render(){

		const { Q_type, score } = this.state;

		return(
			<KeyboardAvoidingView behavior='padding' enabled>
			<ScrollView>
			<Header headerText={'New Qualification'} navigation={this.props.navigation} />

			<Picker
			selectedValue={this.state.Q_type}
			style
			onValueChange={
				(Q_type) => this.setState({ Q_type})
			}>

			<Picker.Item label="Select qualification type" value="null" />
			<Picker.Item label="STPM" value="STPM" />
			<Picker.Item label="A-levels" value="A-levels" />
			<Picker.Item label="Australian Matriculation" value="Australian Matriculation" />
			<Picker.Item label="Canadian Pre-University" value="Canadian Pre-University" />
			<Picker.Item label="Unified Examination Certificate (UEC)" value="Unified Examination Certificate (UEC)" />
			<Picker.Item label="International Baccalaureate" value="International Baccalaureate" />
			<Picker.Item label="Other" value="other" />
			</Picker>

			<Card>
			<TextInput
			keyboardType="numeric" onChangeText={score => this.setState({score})} value= {this.state.score}
			label="Score" placeholder="Enter your score" blurRadius={1}
			/>
			</Card>

			<Button title="SAVE" />
			</ScrollView>
			</KeyboardAvoidingView>

		);
	}
}

		export { AddQualification };
