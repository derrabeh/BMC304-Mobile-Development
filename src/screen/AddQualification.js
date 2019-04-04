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
			Q_type: '',
			sub1:'',
			grade1:'',
			sub2:'',
			grade2:'',
			sub3:'',
			grade3:'',
			sub4:'',
			grade4:'',
			sub5:'',
			grade5:'',
			sub6:'',
			grade6:'',
			score:0,
		}
	}

	componentDidMount(){
		var ref = firebase.database().ref('/users')
		var query = ref.orderByKey().equalTo("0iGG0hc6pZhAulrHcGqXR9J5gt33");
		query.once("value", function(snapshot) {
			this.setState({
				Q_Type: snapshot.val().Q_Type,
				score: snapshot.val().score
			});
		}.bind(this));
	}


	render(){
		const {Q_type} = this.state;

		pickerOptionText = () => {
			if (this.state.Q_type=='STPM') {
				return (
					<ScrollView>
					<Text>Please Enter the grade of your best 3 subjects:</Text>

					<Picker
					selectedValue={this.state.sub1}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub1: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 1" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<Picker
					selectedValue={this.state.grade1}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ grade1: itemValue, gradeIndex: itemIndex })
					}>

					<Picker.Item label="Select Grade" value="null" />
					<Picker.Item label="A" value="4.00" />
					<Picker.Item label="A-" value="3.67" />
					<Picker.Item label="B+" value="3.33" />
					<Picker.Item label="B" value="3.00" />
					<Picker.Item label="B-" value="2.67" />
					<Picker.Item label="C+" value="2.33" />
					<Picker.Item label="C" value="2.00" />
					<Picker.Item label="C-" value="1.67" />
					<Picker.Item label="D+" value="1.33" />
					<Picker.Item label="D" value="1.00" />
					<Picker.Item label="f" value="0.00" />
					</Picker>

					<Picker
					selectedValue={this.state.sub2}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub2: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 2" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<Picker
					selectedValue={this.state.grade2}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ grade2: itemValue, gradeIndex: itemIndex })
					}>

					<Picker.Item label="Select Grade" value="null" />
					<Picker.Item label="A" value="4.00" />
					<Picker.Item label="A-" value="3.67" />
					<Picker.Item label="B+" value="3.33" />
					<Picker.Item label="B" value="3.00" />
					<Picker.Item label="B-" value="2.67" />
					<Picker.Item label="C+" value="2.33" />
					<Picker.Item label="C" value="2.00" />
					<Picker.Item label="C-" value="1.67" />
					<Picker.Item label="D+" value="1.33" />
					<Picker.Item label="D" value="1.00" />
					<Picker.Item label="f" value="0.00" />
					</Picker>

					<Picker
					selectedValue={this.state.sub3}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub3: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 3" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<Picker
					selectedValue={this.state.grade3}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ grade3: itemValue, gradeIndex: itemIndex })
					}>

					<Picker.Item label="Select Grade" value="null" />
					<Picker.Item label="A" value="4.00" />
					<Picker.Item label="A-" value="3.67" />
					<Picker.Item label="B+" value="3.33" />
					<Picker.Item label="B" value="3.00" />
					<Picker.Item label="B-" value="2.67" />
					<Picker.Item label="C+" value="2.33" />
					<Picker.Item label="C" value="2.00" />
					<Picker.Item label="C-" value="1.67" />
					<Picker.Item label="D+" value="1.33" />
					<Picker.Item label="D" value="1.00" />
					<Picker.Item label="f" value="0.00" />
					</Picker>

					</ScrollView>

				);

			}
			if (this.state.Q_type=='A-levels') {
				return (

					<ScrollView>
					<Text>Please Enter the grade of your best 3 subjects:</Text>

					<Picker
					selectedValue={this.state.sub1}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub1: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 1" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<Picker
					selectedValue={this.state.grade1}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ grade1: itemValue, gradeIndex: itemIndex })
					}>

					<Picker.Item label="Select Grade" value="null" />
					<Picker.Item label="A" value="5" />
					<Picker.Item label="B" value="4" />
					<Picker.Item label="C" value="3" />
					<Picker.Item label="D" value="2" />
					<Picker.Item label="E" value="1" />
					</Picker>

					<Picker
					selectedValue={this.state.sub2}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub2: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 2" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<Picker
					selectedValue={this.state.grade2}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ grade2: itemValue, gradeIndex: itemIndex })
					}>

					<Picker.Item label="Select Grade" value="null" />
					<Picker.Item label="Select Grade" value="null" />
					<Picker.Item label="A" value="5" />
					<Picker.Item label="B" value="4" />
					<Picker.Item label="C" value="3" />
					<Picker.Item label="D" value="2" />
					<Picker.Item label="E" value="1" />
					</Picker>

					<Picker
					selectedValue={this.state.sub3}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub3: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 3" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<Picker
					selectedValue={this.state.grade3}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ grade3: itemValue, gradeIndex: itemIndex })
					}>

					<Picker.Item label="Select Grade" value="null" />
					<Picker.Item label="Select Grade" value="null" />
					<Picker.Item label="A" value="5" />
					<Picker.Item label="B" value="4" />
					<Picker.Item label="C" value="3" />
					<Picker.Item label="D" value="2" />
					<Picker.Item label="E" value="1" />
					</Picker>

					</ScrollView>

				);
			}

			if (this.state.Q_type=='Australian Matriculation') {
				return (

					<ScrollView>
					<Text>Please Enter the grade of 6 subjects:</Text>

					<Picker
					selectedValue={this.state.sub1}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub1: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 1" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<TextInput
					onChangeText={grade1 => this.setState({ grade1 })}
					value= {this.state.grade1}
					label="Grade"
					placeholder="Enter your grade ( 0-100% )"
					blurRadius={1}
					/>

					<Picker
					selectedValue={this.state.sub2}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub2: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 2" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<TextInput
					onChangeText={grade2 => this.setState({ grade2 })}
					value= {this.state.grade2}
					label="Grade"
					placeholder="Enter your grade ( 0-100% )"
					blurRadius={1}
					/>

					<Picker
					selectedValue={this.state.sub3}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub3: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 3" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<TextInput
					onChangeText={grade3 => this.setState({ grade3 })}
					value= {this.state.grade3}
					label="Grade"
					placeholder="Enter your grade ( 0-100%  )"
					blurRadius={1}
					/>

					<Picker
					selectedValue={this.state.sub4}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub4: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 4" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<TextInput
					onChangeText={grade4 => this.setState({ grade4 })}
					value= {this.state.grade4}
					label="Grade"
					placeholder="Enter your grade ( 0-100%  )"
					blurRadius={1}
					/>

					</ScrollView>
				)};

			if (this.state.Q_type=='Canadian Pre-University') {
				return (

					<ScrollView>
					<Text>Please Enter the grade of 6 subjects:</Text>

					<Picker
					selectedValue={this.state.sub1}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub1: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 1" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<TextInput
					onChangeText={grade1 => this.setState({ grade1 })}
					value= {this.state.grade1}
					label="Grade"
					placeholder="Enter your grade ( 0-100% )"
					blurRadius={1}
					/>

					<Picker
					selectedValue={this.state.sub2}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub2: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 2" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<TextInput
					onChangeText={grade2 => this.setState({ grade2 })}
					value= {this.state.grade2}
					label="Grade"
					placeholder="Enter your grade ( 0-100% )"
					blurRadius={1}
					/>

					<Picker
					selectedValue={this.state.sub3}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub3: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 3" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<TextInput
					onChangeText={grade3 => this.setState({ grade3 })}
					value= {this.state.grade3}
					label="Grade"
					placeholder="Enter your grade ( 0-100% )"
					blurRadius={1}
					/>

					<Picker
					selectedValue={this.state.sub4}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub4: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 4" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<TextInput
					onChangeText={grade4 => this.setState({ grade4 })}
					value= {this.state.grade4}
					label="Grade"
					placeholder="Enter your grade ( 0-100% )"
					blurRadius={1}
					/>

					<Picker
					selectedValue={this.state.sub5}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub5: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 5" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<TextInput
					onChangeText={grade5 => this.setState({ grade5 })}
					value= {this.state.grade5}
					label="Grade"
					placeholder="Enter your grade ( 0-100% )"
					blurRadius={1}
					/>

					<Picker
					selectedValue={this.state.sub6}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub6: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 6" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<TextInput
					onChangeText={grade6 => this.setState({ grade6 })}
					value= {this.state.grade6}
					label="Grade"
					placeholder="Enter your grade ( 0-100% )"
					blurRadius={1}
					/>

					</ScrollView>
				)
			};

					if (this.state.Q_type=='Unified Examination Certificate (UEC)') {
						return (

							<ScrollView>
							<Text>Please Enter the grade of your best 5 subjects:</Text>

							<Picker
							selectedValue={this.state.sub1}
							style
							onValueChange={(itemValue, itemIndex) =>
								this.setState({ sub1: itemValue, subIndex: itemIndex })
							}>

							<Picker.Item label="Select subject 1" value="null" />
							<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
							<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
							<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
							<Picker.Item label="Pengajian Am" value="Pengajian Am" />
							<Picker.Item label="Sejarah" value="Sejarah" />
							<Picker.Item label="Geografi" value="Geografi" />
							<Picker.Item label="Ekonomi" value="Ekonomi" />
							<Picker.Item label="Perakaunan" value="Perakaunann" />
							<Picker.Item label="Mathematics" value="Mathematics" />
							<Picker.Item label="Physics" value="Physic" />
							<Picker.Item label="Chemistry" value="Chemistry" />
							<Picker.Item label="Biology" value="Biology" />
							</Picker>

							<Picker
							selectedValue={this.state.grade1}
							style
							onValueChange={(itemValue, itemIndex) =>
								this.setState({ grade1: itemValue, gradeIndex: itemIndex })
							}>

							<Picker.Item label="Select Grade" value="null" />
							<Picker.Item label="A1" value="1" />
							<Picker.Item label="A2" value="2" />
							<Picker.Item label="B3" value="3" />
							<Picker.Item label="B4" value="4" />
							<Picker.Item label="B5" value="5" />
							<Picker.Item label="B6" value="6" />
							</Picker>


							<Picker
							selectedValue={this.state.sub2}
							style
							onValueChange={(itemValue, itemIndex) =>
								this.setState({ sub2: itemValue, subIndex: itemIndex })
							}>

							<Picker.Item label="Select subject 2" value="null" />
							<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
							<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
							<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
							<Picker.Item label="Pengajian Am" value="Pengajian Am" />
							<Picker.Item label="Sejarah" value="Sejarah" />
							<Picker.Item label="Geografi" value="Geografi" />
							<Picker.Item label="Ekonomi" value="Ekonomi" />
							<Picker.Item label="Perakaunan" value="Perakaunann" />
							<Picker.Item label="Mathematics" value="Mathematics" />
							<Picker.Item label="Physics" value="Physic" />
							<Picker.Item label="Chemistry" value="Chemistry" />
							<Picker.Item label="Biology" value="Biology" />
							</Picker>

							<Picker
							selectedValue={this.state.grade2}
							style
							onValueChange={(itemValue, itemIndex) =>
								this.setState({ grade2: itemValue, gradeIndex: itemIndex })
							}>

							<Picker.Item label="Select Grade" value="null" />
							<Picker.Item label="A1" value="1" />
							<Picker.Item label="A2" value="2" />
							<Picker.Item label="B3" value="3" />
							<Picker.Item label="B4" value="4" />
							<Picker.Item label="B5" value="5" />
							<Picker.Item label="B6" value="6" />
							</Picker>

							<Picker
							selectedValue={this.state.sub3}
							style
							onValueChange={(itemValue, itemIndex) =>
								this.setState({ sub3: itemValue, subIndex: itemIndex })
							}>

							<Picker.Item label="Select subject 3" value="null" />
							<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
							<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
							<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
							<Picker.Item label="Pengajian Am" value="Pengajian Am" />
							<Picker.Item label="Sejarah" value="Sejarah" />
							<Picker.Item label="Geografi" value="Geografi" />
							<Picker.Item label="Ekonomi" value="Ekonomi" />
							<Picker.Item label="Perakaunan" value="Perakaunann" />
							<Picker.Item label="Mathematics" value="Mathematics" />
							<Picker.Item label="Physics" value="Physic" />
							<Picker.Item label="Chemistry" value="Chemistry" />
							<Picker.Item label="Biology" value="Biology" />
							</Picker>

							<Picker
							selectedValue={this.state.grade3}
							style
							onValueChange={(itemValue, itemIndex) =>
								this.setState({ grade3: itemValue, gradeIndex: itemIndex })
							}>

							<Picker.Item label="Select Grade" value="null" />
							<Picker.Item label="A1" value="1" />
							<Picker.Item label="A2" value="2" />
							<Picker.Item label="B3" value="3" />
							<Picker.Item label="B4" value="4" />
							<Picker.Item label="B5" value="5" />
							<Picker.Item label="B6" value="6" />
							</Picker>

							<Picker
							selectedValue={this.state.sub4}
							style
							onValueChange={(itemValue, itemIndex) =>
								this.setState({ sub4: itemValue, subIndex: itemIndex })
							}>

							<Picker.Item label="Select subject 4" value="null" />
							<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
							<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
							<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
							<Picker.Item label="Pengajian Am" value="Pengajian Am" />
							<Picker.Item label="Sejarah" value="Sejarah" />
							<Picker.Item label="Geografi" value="Geografi" />
							<Picker.Item label="Ekonomi" value="Ekonomi" />
							<Picker.Item label="Perakaunan" value="Perakaunann" />
							<Picker.Item label="Mathematics" value="Mathematics" />
							<Picker.Item label="Physics" value="Physic" />
							<Picker.Item label="Chemistry" value="Chemistry" />
							<Picker.Item label="Biology" value="Biology" />
							</Picker>

							<Picker
							selectedValue={this.state.grade4}
							style
							onValueChange={(itemValue, itemIndex) =>
								this.setState({ grade4: itemValue, gradeIndex: itemIndex })
							}>

							<Picker.Item label="Select Grade" value="null" />
							<Picker.Item label="A1" value="1" />
							<Picker.Item label="A2" value="2" />
							<Picker.Item label="B3" value="3" />
							<Picker.Item label="B4" value="4" />
							<Picker.Item label="B5" value="5" />
							<Picker.Item label="B6" value="6" />
							</Picker>

							<Picker
							selectedValue={this.state.sub5}
							style
							onValueChange={(itemValue, itemIndex) =>
								this.setState({ sub5: itemValue, subIndex: itemIndex })
							}>

							<Picker.Item label="Select subject 5" value="null" />
							<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
							<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
							<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
							<Picker.Item label="Pengajian Am" value="Pengajian Am" />
							<Picker.Item label="Sejarah" value="Sejarah" />
							<Picker.Item label="Geografi" value="Geografi" />
							<Picker.Item label="Ekonomi" value="Ekonomi" />
							<Picker.Item label="Perakaunan" value="Perakaunann" />
							<Picker.Item label="Mathematics" value="Mathematics" />
							<Picker.Item label="Physics" value="Physic" />
							<Picker.Item label="Chemistry" value="Chemistry" />
							<Picker.Item label="Biology" value="Biology" />
							</Picker>

							<Picker
							selectedValue={this.state.grade5}
							style
							onValueChange={(itemValue, itemIndex) =>
								this.setState({ grade5: itemValue, gradeIndex: itemIndex })
							}>

							<Picker.Item label="Select Grade" value="null" />
							<Picker.Item label="A1" value="1" />
							<Picker.Item label="A2" value="2" />
							<Picker.Item label="B3" value="3" />
							<Picker.Item label="B4" value="4" />
							<Picker.Item label="B5" value="5" />
							<Picker.Item label="B6" value="6" />
							</Picker>

					</ScrollView>

				);
			}
			if (this.state.Q_type=='International Baccalaureate') {
				return (

					<ScrollView>
					<Text>Please Enter the grade of 6 subjects:</Text>

					<Picker
					selectedValue={this.state.sub1}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub1: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 1" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<TextInput
					onChangeText={grade1 => this.setState({ grade1 })}
					value= {this.state.grade1}
					label="Grade"
					placeholder="Enter your grade ( 0-7points )"
					blurRadius={1}
					/>

					<Picker
					selectedValue={this.state.sub2}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub2: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 2" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<TextInput
					onChangeText={grade2 => this.setState({ grade2 })}
					value= {this.state.grade2}
					label="Grade"
					placeholder="Enter your grade ( 0-7points )"
					blurRadius={1}
					/>

					<Picker
					selectedValue={this.state.sub3}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub3: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 3" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<TextInput
					onChangeText={grade3 => this.setState({ grade3 })}
					value= {this.state.grade3}
					label="Grade"
					placeholder="Enter your grade ( 0-7points  )"
					blurRadius={1}
					/>

					<Picker
					selectedValue={this.state.sub4}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub4: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 4" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<TextInput
					onChangeText={grade4 => this.setState({ grade4 })}
					value= {this.state.grade4}
					label="Grade"
					placeholder="Enter your grade ( 0-7points  )"
					blurRadius={1}
					/>

					<Picker
					selectedValue={this.state.sub5}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub5: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 5" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<TextInput
					onChangeText={grade5 => this.setState({ grade5 })}
					value= {this.state.grade5}
					label="Grade"
					placeholder="Enter your grade ( 0-7points  )"
					blurRadius={1}
					/>

					<Picker
					selectedValue={this.state.sub6}
					style
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ sub6: itemValue, subIndex: itemIndex })
					}>

					<Picker.Item label="Select subject 6" value="null" />
					<Picker.Item label="Bahasa Melayu" value="Bahasa Melayu" />
					<Picker.Item label="Bahasa Cina" value="Bahasa Cina" />
					<Picker.Item label="Malaysian Univerity English Test" value="Malaysian Univerity English Test" />
					<Picker.Item label="Pengajian Am" value="Pengajian Am" />
					<Picker.Item label="Sejarah" value="Sejarah" />
					<Picker.Item label="Geografi" value="Geografi" />
					<Picker.Item label="Ekonomi" value="Ekonomi" />
					<Picker.Item label="Perakaunan" value="Perakaunann" />
					<Picker.Item label="Mathematics" value="Mathematics" />
					<Picker.Item label="Physics" value="Physic" />
					<Picker.Item label="Chemistry" value="Chemistry" />
					<Picker.Item label="Biology" value="Biology" />
					</Picker>

					<TextInput
					onChangeText={grade6 => this.setState({ grade6 })}
					value= {this.state.grade6}
					label="Grade"
					placeholder="Enter your grade ( 0-7points  )"
					blurRadius={1}
					/>

					</ScrollView>
				);
			}

			else {
				return (
					<TextInput
					onChangeText={Q_type => this.setState({Q_type})}
					value= {this.state.Q_type}
					label="Qualification type"
					placeholder="Enter your Qualification Type Name"
					blurRadius={1}
					/>
				);
			}
			return null;
		}

		return(
			<KeyboardAvoidingView behavior='padding' enabled>
			<ScrollView>
			<Header headerText={'New Qualification'} navigation={this.props.navigation} />

			<Picker
			selectedValue={this.state.Q_type}
			style
			onValueChange={(itemValue, itemIndex) =>
				this.setState({ Q_type: itemValue, userIndex: itemIndex })
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

			<ScrollView>
			{pickerOptionText()}
			</ScrollView>


			<Card>
			<TextInput
			keyboardType="numeric"
			onChangeText={score => this.setState({ score })}
			value= {this.state.score}
			label="Score"
			placeholder="Enter your score"
			blurRadius={1}
			/>
			</Card>


			<Button title="SAVE" onPress={this.saveVal} />
			</ScrollView>
			</KeyboardAvoidingView>

		)}

		saveVal = async () => {
			try {
				var qlf = firebase.database().ref('users/0iGG0hc6pZhAulrHcGqXR9J5gt33');
				qlf.update({
					Q_type: this.state.Q_type,
					score: this.state.score,
					sub1: this.state.sub1,
					grade1: this.state.grade1,
					sub2: this.state.sub2,
					grade2: this.state.grade2,
					sub3: this.state.sub3,
					grade3: this.state.grade3,
					sub4: this.state.sub4,
					grade4: this.state.grade4,
					sub5: this.state.sub5,
					grade5: this.state.grade5,
					sub6: this.state.sub6,
					grade6: this.state.grade6,
				});

				Alert.alert(
					'SUCCESS',
					'Your qualification is successfully recorded',
					[
						{text: 'Cancel'},
						{text: 'OK', onPress:() => this.props.navigation.push('StudentQualification',{
							Q_type: this.state.Q_type,
							score: this.state.score
						})
					}
				],
			);

		} catch (e) {
			ToastAndroid.show(e, ToastAndroid.SHORT);
		} finally {
			this.setState({ loading: false });
		}
	};

}



export { AddQualification };
