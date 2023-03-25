import "core-js/full/symbol/async-iterator";

import { Amplify } from "aws-amplify";
import HomeScreen from "./src/screens/HomeScreen";
import MatchesScreen from "./src/screens/MatchesScreen";
import { NavigationContainer } from "@react-navigation/native";
import ProfileScreen from "./src/screens/ProfileScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import TopHeader from "./src/components/TopHeader";
import awsconfig from "./src/aws-exports";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { withAuthenticator } from "aws-amplify-react-native";

Amplify.configure(awsconfig);
const Stack = createNativeStackNavigator();

const App = () =>{
  const [activeScreen, setActiveScreen] = useState("Home");

  return (
    <SafeAreaView className='flex-1'>
      <NavigationContainer>
        <TopHeader
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
        />
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
          <Stack.Screen
            name='Profile'
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default withAuthenticator(App);
