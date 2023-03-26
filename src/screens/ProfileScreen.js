import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Auth, DataStore } from "aws-amplify";
import { useEffect, useState } from "react";

import { Picker } from "@react-native-picker/picker";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from "../models/";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState();
  const [lookingFor, setLookingFor] = useState();

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await Auth.currentAuthenticatedUser();

      const dbUsers = await DataStore.query(User, (c) =>
        c.sub.eq(user.attributes.sub)
      );
      if (dbUsers.length < 0) {
        return;
      }
      const dbUser = dbUsers[0];
      setUser(dbUser);

      setName(dbUser.name);
      setBio(dbUser.bio);
      setGender(dbUser.gender);
      setLookingFor(dbUser.lookingFor);
    };
    getCurrentUser();
  }, []);

  const isValid = () => {
    return name && bio && gender && lookingFor;
  };

  const save = async () => {
    if (!isValid()) {
      console.log("invalid");
      return;
    }

    if (user) {
      const updatedUser = User.copyOf(user, (draft) => {
        draft.name = name;
        draft.bio = bio;
        draft.gender = gender;
        draft.lookingFor = lookingFor;
      });

      try {
        await DataStore.save(updatedUser);
        Alert.alert("User updated successfully");
      } catch (e) {
        console.log(e);
      }
    } else {
      const authUser = await Auth.currentAuthenticatedUser();

      const newUser = new User({
        sub: authUser.attributes.sub,
        name,
        bio,
        gender,
        lookingFor,
        image:
          "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg",
      });
      try {
        await DataStore.save(newUser);
        Alert.alert("User saved successfully");
      } catch (e) {
        console.log(e);
      }
    }
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
