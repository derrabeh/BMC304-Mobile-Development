import React from 'react';
import { Picker, TouchableHighlight, Button, ScrollView, RefreshControl, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-swipeable-row';
import { Header, Input, Card } from '../../components/common';
import firebase from 'firebase';
import { Icon, Avatar } from 'react-native-elements';

class StudentQualification extends React.Component {
	static navigationOptions = {
		title: 'Qualification',
	};
	constructor(props) {
		super(props);
		this.state = {
			qualificationID: '',
			score: 0,
			userID: '',
			isExist: false,
			username: ''
		};
	}

	componentWillMount() {
		const { navigation } = this.props;
		this.state.userID = navigation.getParam('userID', null);

		const ref = firebase.database().ref('qualificationObtained');
		ref.once('value').then((snapshot) => {
			snapshot.forEach((childSnapshot) => {
				if (childSnapshot.val().userID == this.state.userID) {
					this.setState({
						qualificationID: childSnapshot.val().qualificationID,
						score: childSnapshot.val().score,
						isExist: true,
						key: childSnapshot.key
					});
				}
			});
			console.log('first-', this.state.isExist);
			console.log('first-', this.state.key);
		});

		const ref2 = firebase.database().ref('users/' + this.state.userID);
		ref2.once('value').then((snapshot) => {
			this.setState({ username: snapshot.val().username });
		});
	}

	render() {
		const { qualificationID, score, userID, isExist } = this.state;
		const { headerStyle, bodyStyle, floatButtonContainerStyle, floatButtonStyle,
				nameContainerStyle, nameStyle, nameTextStyle } = styles;

		QualificationCond = () => {
			if (!this.state.isExist){
				return (
					<TouchableOpacity 
						onPress={() => {this.props.navigation.push('AddQualification', 
								{ userID: this.state.userID, isExist: this.state.isExist })}} 
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
				);
			}
				
			return (
				<View>
					<TouchableOpacity 
						onPress={() => {this.props.navigation.push('AddQualification', 
						{ userID: this.state.userID, isExist: this.state.isExist, key: this.state.key })}}
						style={floatButtonStyle}
					>
						<Icon
							name='pencil'
							type='font-awesome'
							color='white'
							style={{ margin: 5 }} 
							activeOpacity='0.8'
							underlayColor='#34495e'
						/>
					</TouchableOpacity>
				</View>
				);
			};

			return (
				<View style={{flex: 1}}>
					<View style={{flex: 1, backgroundColor: 'green'}}>
						<View style={headerStyle}>
							<View style={nameContainerStyle}>
								<Text style={nameStyle} >Qualification</Text>
							</View>
						</View>
						<View style={bodyStyle}>
							<View style={{alignItems: 'center', justifyContent: 'center', flex: 6}}>
								<Avatar 
									rounded title={this.state.username.substring(0,1)} 
									size='xlarge'
								/>
								<Text style={nameTextStyle}>{this.state.username}</Text>
								
							</View>
							<View style={{flex: 4, alignItems: 'center'}}>
								<Text style={{marginBottom: 5}}>Your Qualification: </Text>
								<Text>{this.state.key} ( {this.state.score} )</Text>
							</View>
							
							<View style={floatButtonContainerStyle}>
								{QualificationCond()}
							</View>
						</View>
					</View>
				</View>
			);
		}
	}

		const styles = StyleSheet.create({

			addButton: {
				position: 'absolute',
				left: '40%',
				bottom: -600,
				backgroundColor: '#E91E63',
				width: 90,
				height: 90,
				borderRadius: 50,
				alignItems: 'center',
				justifyContent: 'center',
				elevation: 8
			},
			addButtonText: {
				color: '#fff',
				fontSize: 24,
			},

			typeItem: {
				fontSize: 22,
				fontWeight: 'bold',

			},

			scoreItem: {
				fontSize: 20,
				fontStyle: 'italic',
				color: '#4B4B4C',
				paddingLeft: 15,
			},

			swipeBtn: {
				marginTop: 15,
				height: 20,
			},

			swipeText: {
				fontSize: 18,
				color: '#000',
				alignItems: 'center',
			}, 
			headerStyle: {
				flex: 1, 
				backgroundColor: '#34495e', 
				paddingTop: 20
			}, 
			bodyStyle: {
				backgroundColor: 'white',
				flex: 9
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
			nameTextStyle: {
				fontSize: 30, 
				marginTop: 10
			}

		});

		export { StudentQualification };
