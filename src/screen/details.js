import React,{ Component } from 'react';
import { FlatList, View, Text, Button, TouchableOpacity } from 'react-native';
import { Header, Input, Card } from '../components/common';
import * as firebase from 'firebase';

export default class StudentProgDetails extends Component {
  static navigationOptions = {
    title: 'Programme',
  };

  export { StudentProgDetails };