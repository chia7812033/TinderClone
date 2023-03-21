import { ImageBackground, StyleSheet, Text, View } from "react-native";

import React from 'react'

const Card = () => {
  return (
    <View
      className='w-[95%] h-[70%] bg-red-600 rounded-lg'
      style={styles.shadow}
    >
      <ImageBackground
        source={{
          uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg",
        }}
        className='w-[100%] h-[100%] rounded-lg overflow-hidden flex justify-end'
      >
        <View className='m-4 space-y-1'>
          <Text className='text-3xl text-white font-bold '>Zuck</Text>
          <Text className='text-lg text-white leading-[24px]'>
            No need to send me your nudes, I already saw them
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Card

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
