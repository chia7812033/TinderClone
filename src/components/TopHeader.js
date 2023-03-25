import {
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import React from 'react'
import {
  useNavigation,
} from "@react-navigation/native";

const TopHeader = ({activeScreen , setActiveScreen}) => {

  const navigation = useNavigation();
  const color = "#b5b5b5";
  const activeColor = "#F76C6B";

  return (
    <View
      className='flex-row justify-around p-4 w-full bg-white'
      style={styles.shadow}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
          setActiveScreen("Home");
        }}
      >
        <Fontisto
          name='tinder'
          size={30}
          color={activeScreen === "Home" ? activeColor : color}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Matches");
          setActiveScreen("Matches");
        }}
      >
        <MaterialCommunityIcons
          name='star-four-points'
          size={30}
          color={activeScreen === "Matches" ? activeColor : color}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name='ios-chatbubbles' size={30} color={color} />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome name='user' size={30} color={color} />
      </TouchableOpacity>
    </View>
  );
}

export default TopHeader

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
