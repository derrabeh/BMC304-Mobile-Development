import React from 'react';
import { FontAwesome } from '@expo/vector-icons'
import { Picker, TouchableHighlight, Button, ScrollView,RefreshControl, StyleSheet, Text,TextInput, View, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-swipeable-row';
import { Header, Input, Card} from '../components/common';
import firebase from 'firebase';

class StudentQualification extends React.Component {
	static navigationOptions = {
		title: 'Academic Qualification',
	};
	constructor(props){
		super(props);
		this.state ={
			allUser: {},
			Q_type:'',
			score: 0,
		};
	}

	componentDidMount(){
		var ref = firebase.database().ref('/users')
		var query = ref.orderByKey().equalTo("0iGG0hc6pZhAulrHcGqXR9J5gt33");
		query.once("value", function(snapshot) {
			this.setState({
				allUser: snapshot.val(),
				Q_type: snapshot.val().Q_type,
				score: snapshot.val().score
			});


			/*snapshot.forEach(function(child) {
				const k = child.key;
				const q = child.val().Q_type;
				//console.log(child.key, child.val().Q_type);
			});*/

		}.bind(this));
	}

	render(){
		let d = this.props.navigation;
		let g = JSON.stringify(this.state.allUser);
		let allUser = JSON.parse(g);

		//console.log(allUser);
		return(
			<View>
			<Header headerText={'Academic Qualification'} navigation={this.props.navigation} />

			{Object.keys(allUser).map((item, index) => {
				if (allUser[item].Q_type == '' && allUser[item].score ==0){
					return(
						<View>
						<TouchableOpacity style={styles.addButton}
						key={item.key}
						onPress={() => {this.props.navigation.navigate('AddQualification')}}
						>
						<Text style={styles.addButtonText}>+</Text>
						</TouchableOpacity>
						</View>
						);
					}

					else {
						return(
						<View>
						<ScrollView
						scrollEnabled={!this.state.isSwiping}>
						<Card>
						<Swipeable
						onSwipeStart={() => this.setState({isSwiping: true})}
						onSwipeRelease={() => this.setState({isSwiping: false})}
						rightButtons = {[
							<TouchableHighlight style={styles.swipeBtn} key={item.key} onPress={() => {this.props.navigation.navigate('AddQualification')}}>
							<Text style={styles.swipeText}> EDIT </Text>
							</TouchableHighlight>,
							/*
							<TouchableHighlight style={styles.swipeBtn} onPress={() => this.removeQualification(item.Q_type)}>
							<Text style={styles.swipeText}> DELETE </Text>
							</TouchableHighlight> */
						]}
							>


							<Text style={styles.typeItem}> Qualification Type : {allUser[item].Q_type} </Text>
							<Text style={styles.scoreItem}> Score : {allUser[item].score} </Text>


							</Swipeable>
							</Card>
							</ScrollView>
							</View>
							);
						}
					})
				}
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
