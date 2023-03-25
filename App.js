import HomeScreen from "./src/screens/HomeScreen";
import MatchesScreen from "./src/screens/MatchesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopHeader from "./src/components/TopHeader";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {

  const [activeScreen, setActiveScreen] = useState("Home");

  return (
    <SafeAreaView className='flex-1'>
      <NavigationContainer>
        <TopHeader activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Matches'
            component={MatchesScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
