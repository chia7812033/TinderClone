import { Auth, DataStore } from "aws-amplify";
import { Image, Text, View } from "react-native";
import { Match, User } from "../models/";
import { useEffect, useState } from "react";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import users from "../../assets/data/users";

const MatchesScreen = () => {
  const [matches, setMatches] = useState([]);
  const [me, setMe] = useState(null);

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
      setMe(dbUser);
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (!me) {
      return;
    }
    const getMatches = async () => {
      setMatches(
        await DataStore.query(Match, (c) =>
          c.and((c) => [
            c.or((c) => [c.user1ID.eq(me.id), c.user2ID.eq(me.id)]),
            c.isMatch.eq(true),
          ])
        )
      );
    };
    getMatches();
  }, []);

  console.log(matches)

  return (
    <SafeAreaView>
      <View className='px-5'>
        <Text className='font-bold text-lg text-[#F63A6E]'>New Matches</Text>
        <View className='flex-row flex-wrap gap-5'>
          {matches.map((m) => (
            <View
              className='w-20 h-20 rounded-full border-[#F63A6E] border-2 p-0.5'
              key={m.id}
            >
              <Text>{m.id}</Text>
              {/* <Image
                source={{ uri: m.User1.image }}
                className='w-full h-full rounded-full'
              /> */}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MatchesScreen;
