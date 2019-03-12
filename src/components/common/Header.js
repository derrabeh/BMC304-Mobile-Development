/* eslint-disable quotes */
// Import libraries for making a component
import React from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";

// Make a component
const Header = (props) => {
  const { textStyle, containerStyle, imageStyle, textContainerStyle, iconContainerStyle } = styles;
  const menuIcon = require('../../../assets/drawer.png');

  return (
    <View style={containerStyle}>
      <View style={iconContainerStyle}>
        <TouchableHighlight onPress={() => props.navigation.openDrawer()}>
          <Image style={imageStyle} source={menuIcon} />
        </TouchableHighlight>
      </View>
      <View style={textContainerStyle}>
        <Text style={textStyle}> { props.headerText }</Text>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: "#F8F8F8",
    height: 60,
    paddingTop: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    position: 'relative',
    flexDirection: 'row'
  },
  textStyle: {
    fontSize: 24, 
  }, 
  imageStyle: {
    height: 25, 
    width: 25
  }, 
  textContainerStyle: {
    flex: 10, 
    justifyContent: 'center', 
    alignItems: "flex-start"
  }, 
  iconContainerStyle: {
    flex: 2,
    justifyContent: 'center', 
    alignItems: 'center'
  }
};

// Make the component available to other parts of the app
export { Header };
