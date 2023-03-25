import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

import AnimatedStack from "../components/AnimatedStack";
import Card from "../components/Card";
import TopHeader from "../components/TopHeader";
import users from "../../assets/data/users";

export default function HomeScreen() {
  const onSwipeLeft = (user) => {
    console.log("onSwipeLeft", user.name);
  };

  const onSwipeRight = (user) => {
    console.log("onSwipeRight", user.name);
  };

  return (
    <View className='flex-1 w-full items-center bg-[#ededed]'>
      <AnimatedStack
        users={users}
        renderItem={({ item }) => <Card user={item} />}
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
