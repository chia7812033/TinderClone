import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { Image, View, useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";

import Card from "./src/components/Card";
import Like from "./assets/images/LIKE.png";
import Nope from "./assets/images/nope.png";
import users from "./assets/data/users";

const ROTATION = 60;
const SWIPE_VELOCITY = 800;

export default function App() {
  const { height, width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);
  const currentProfile = users[currentIndex];
  const nextProfile = users[nextIndex];

  const hiddenTranslateX = 2 * width;

  const translateX = useSharedValue(0);
  const rotate = useDerivedValue(
    () =>
      interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION]) +
      "deg"
  );

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        rotate: rotate.value,
      },
    ],
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-hiddenTranslateX, 0, hiddenTranslateX],
          [1, 0.8, 1]
        ),
      },
    ],
    opacity: interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.2, 1]
    ),
  }));

  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, hiddenTranslateX / 4], [0, 1]),
  }));

  const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-hiddenTranslateX / 4, 0], [1, 0]),
  }));

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: (event) => {
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
        translateX.value = withSpring(0);
        return;
      }
      translateX.value = withSpring(
        event.velocityX > 0 ? hiddenTranslateX : -hiddenTranslateX,
        {},
        () => runOnJS(setCurrentIndex)(currentIndex + 1)
      );
    },
  });

  useEffect(() => {
    translateX.value = 0;
    setNextIndex(currentIndex + 1);
  }, [currentIndex]);

  return (
    <View className='justify-center items-center flex-1'>
      <GestureHandlerRootView>
        {nextProfile && (
          <Animated.View
            style={nextCardStyle}
            className='absolute top-0 right-0 left-0 bottom-0 justify-center items-center'
          >
            <Card user={nextProfile} />
          </Animated.View>
        )}

        {currentProfile && (
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View
              style={cardStyle}
              className='w-[95%] flex-1 justify-center items-center'
            >
              <Animated.Image
                source={Like}
                className='w-[150px] h-[150px] absolute top-20 left-10 z-50'
                resizeMode='contain'
                style={likeStyle}
              />
              <Animated.Image
                source={Nope}
                className='w-[170px] h-[170px] absolute top-20 right-10 z-50'
                resizeMode='contain'
                style={nopeStyle}
              />
              <Card user={currentProfile} />
            </Animated.View>
          </PanGestureHandler>
        )}
      </GestureHandlerRootView>
    </View>
  );
}
