import { Auth, DataStore } from "aws-amplify";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Match, User, UserMatch } from "../models/";
import { TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";

import AnimatedStack from "../components/AnimatedStack";
import Card from "../components/Card";

export default function HomeScreen() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
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
    const fetchUsers = async () => {
      setUsers(await DataStore.query(User));
    };
    fetchUsers();
  }, []);

  const onSwipeLeft = () => {
    if (!currentUser || !me) {
      return;
    }
  };

  const onSwipeRight = async () => {
    if (!currentUser || !me) {
      return;
    }

    const myMatches = await DataStore.query(Match, (c) =>
      c.and((c) => [c.user1ID.eq(me.id), c.user2ID.eq(currentUser.id)])
    );

    if (myMatches.length > 0) {
      console.log("You already have a match!");
      return;
    }

    const hisMatches = await DataStore.query(Match, (c) =>
      c.and((c) => [c.user1ID.eq(currentUser.id), c.user2ID.eq(me.id)])
    );

    if (hisMatches.length > 0) {
      console.log("This is your new match!");
      const hisMatch = hisMatches[0];

      await DataStore.save(Match.copyOf(hisMatch, updatedMatch => (updatedMatch.isMatch = true)));
      return;
    }

    try {
      const newMatch = await DataStore.save(
        new Match({
          user1ID: me.id,
          user2ID: currentUser.id,
          isMatch: false,
        })
      );

      await DataStore.save(
        new UserMatch({
          match: newMatch,
          user: me,
        })
      );
      await DataStore.save(
        new UserMatch({
          match: newMatch,
          user: currentUser,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className='flex-1 w-full items-center bg-[#ededed]'>
      <AnimatedStack
        users={users}
        renderItem={({ item }) => <Card user={item} />}
        setCurrentUser={setCurrentUser}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
      <View className='flex-row justify-around w-full py-4 px-2'>
        <TouchableOpacity className='p-3 rounded-full bg-white'>
          <FontAwesome name='undo' size={30} color='#FBD88B' />
        </TouchableOpacity>
        <TouchableOpacity className='p-3 rounded-full bg-white'>
          <Entypo name='cross' size={30} color='#F76C6B' />
        </TouchableOpacity>
        <TouchableOpacity className='p-3 rounded-full bg-white'>
          <FontAwesome name='star' size={30} color='#3AB4CC' />
        </TouchableOpacity>
        <TouchableOpacity className='p-3 rounded-full bg-white'>
          <FontAwesome name='heart' size={30} color='#4FCC94' />
        </TouchableOpacity>
        <TouchableOpacity className='p-3 rounded-full bg-white'>
          <Ionicons name='flash' size={30} color='#A65CD2' />
        </TouchableOpacity>
      </View>
    </View>
  );
}
