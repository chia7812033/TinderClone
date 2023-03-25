import { Auth, DataStore } from "aws-amplify";
import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";

import { Picker } from "@react-native-picker/picker";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from "../models/";
import { useState } from "react";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState();
  const [lookingFor, setLookingFor] = useState();

  const isValid = () => {
    return name && bio && gender && lookingFor;
  };

  const save = async () => {
    if (!isValid()) {
      console.log("invalid");
      return;
    }

    const user = await Auth.currentAuthenticatedUser();

    const newUser = new User({
      name,
      bio,
      gender,
      lookingFor,
      image:
        "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg",
    });
    try {
      await DataStore.save(newUser);
      console.log("saved");
    } catch (e) { console.log(e) }
  };

  return (
    <SafeAreaView className=''>
      <View className='m-2'>
        <TextInput
          placeholder='Name...'
          value={name}
          onChangeText={setName}
          className='border-b border-gray-200 m-2'
        />
        <TextInput
          multiline
          numberOfLines={3}
          placeholder='Bio...'
          value={bio}
          onChangeText={setBio}
          className='border-b border-gray-200 m-2'
        />

        <Text>Gender</Text>
        <Picker
          label={"Gender"}
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        >
          <Picker.Item label='Male' value='MALE' />
          <Picker.Item label='Female' value='FEMALE' />
          <Picker.Item label='Other' value='OTHER' />
        </Picker>

        <Text className='mt-2'>Looking For</Text>
        <Picker
          label={"Looking for"}
          selectedValue={lookingFor}
          onValueChange={(itemValue, itemIndex) => setLookingFor(itemValue)}
        >
          <Picker.Item label='Male' value='MALE' />
          <Picker.Item label='Female' value='FEMALE' />
          <Picker.Item label='Other' value='OTHER' />
        </Picker>

        <TouchableOpacity
          onPress={save}
          className='m-2 rounded-xl p-4 bg-[#F63A6E]'
        >
          <Text className='text-center font-bold text-white'>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Auth.signOut()}
          className=' m-2 rounded-xl p-4 bg-[#F63A6E]'
        >
          <Text className='text-center font-bold text-white'>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
