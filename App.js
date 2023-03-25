import AnimatedStack from "./src/components/AnimatedStack";
import Card from "./src/components/Card";
import { View } from "react-native";
import users from "./assets/data/users";

export default function App() {

  const onSwipeLeft = (user) => {
    console.log("onSwipeLeft", user.name);
  };

  const onSwipeRight = (user) => {
    console.log("onSwipeRight", user.name);
  }


  return (
    <View className='justify-center items-center flex-1'>
      <AnimatedStack
        users={users}
        renderItem={({ item }) => <Card user={item} />}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
    </View>
  );
}
