import { ImageBackground, StyleSheet, Text, View } from "react-native";

import React from 'react'

const Card = ({ user }) => {
  const { image, name, bio } = user;
  return (
    <View
      className='w-[100%] h-[80%] bg-[#fefefe] rounded-lg'
      style={styles.shadow}
    >
      <ImageBackground
        source={{
          uri: image,
        }}
        className='w-[100%] h-[100%] rounded-lg overflow-hidden flex justify-end'
      >
        <View className='m-4 space-y-1'>
          <Text className='text-3xl text-white font-bold '>{name}</Text>
          <Text className='text-lg text-white leading-[24px]'>
            {bio}
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
