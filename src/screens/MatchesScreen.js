import { Image, Text, View } from "react-native";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import users from "../../assets/data/users";

const MatchesScreen = () => {
  return (
    <SafeAreaView>
      <View className='px-5'>
        <Text className='font-bold text-lg text-[#F63A6E]'>New Matches</Text>
        <View className='flex-row flex-wrap gap-5'>
          {users.map((user) => (
            <View className='w-20 h-20 rounded-full border-[#F63A6E] border-2 p-0.5' key={user.id}>
              <Image
                source={{ uri: user.image }}
                className='w-full h-full rounded-full'
              />
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MatchesScreen;
