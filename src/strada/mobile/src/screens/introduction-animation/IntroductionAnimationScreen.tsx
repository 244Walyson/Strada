import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  useWindowDimensions,
  Animated,
  Easing,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  SplashView,
  SecondView,
  CareView,
  MoodDiaryView,
  WelcomeView,
  TopBackSkipView,
  CenterNextButton,
} from "./scenes";
import { useRouter } from "expo-router";
import LoginScreen from "../login/LoginView";
import { lightTheme } from "@/src/constants/theme";

const IntroductionAnimationScreen: React.FC = () => {
  const navigation = useNavigation();
  const window = useWindowDimensions();
  const router = useRouter();

  const theme = lightTheme;

  const [currentPage, setCurrentPage] = useState(0);

  const animationController = useRef<Animated.Value>(new Animated.Value(0));
  const animValue = useRef<number>(0);

  useEffect(() => {
    animationController.current.addListener(({ value }) => {
      animValue.current = value;
      setCurrentPage(value);
    });
  }, []);

  const relaxTranslateY = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: [window.height, 0, 0, 0, 0, 0],
  });

  const playAnimation = useCallback(
    (toValue: number, duration: number = 1600) => {
      Animated.timing(animationController.current, {
        toValue,
        duration,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1.0),
        // here it is false only cause of width animation in 'NextButtonArrow.tsx', as width doesn't support useNativeDriver: true
        // TODO:- find better solution so we can use true here and animation also work
        useNativeDriver: false,
      }).start();
    },
    []
  );

  const onNextClick = useCallback(() => {
    let toValue;
    if (animValue.current === 0) {
      toValue = 0.2;
    } else if (animValue.current >= 0 && animValue.current <= 0.2) {
      toValue = 0.4;
    } else if (animValue.current > 0.2 && animValue.current <= 0.4) {
      toValue = 0.6;
    } else if (animValue.current > 0.4 && animValue.current <= 0.6) {
      toValue = 0.8;
    } else if (animValue.current > 0.6 && animValue.current <= 0.8) {
      toValue = 1;
    }

    toValue !== undefined && playAnimation(toValue);
  }, [playAnimation, navigation]);

  const onBackClick = useCallback(() => {
    let toValue;
    if (animValue.current >= 0.2 && animValue.current < 0.4) {
      toValue = 0.0;
    } else if (animValue.current >= 0.4 && animValue.current < 0.6) {
      toValue = 0.2;
    } else if (animValue.current >= 0.6 && animValue.current < 0.8) {
      toValue = 0.4;
    } else if (animValue.current === 0.8) {
      toValue = 0.6;
    } else if (animValue.current === 1) {
      toValue = 0.8;
    }

    toValue !== undefined && playAnimation(toValue);
  }, [playAnimation]);

  const onSkipClick = useCallback(() => {
    playAnimation(0.8, 1200);
  }, [playAnimation]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar translucent backgroundColor="transparent" />
      <SplashView {...{ onNextClick, animationController }} />

      <Animated.View
        style={[
          styles.scenesContainer,
          {
            transform: [{ translateY: relaxTranslateY }],
          },
        ]}
      >
        <SecondView {...{ animationController }} />

        <CareView {...{ animationController }} />

        <MoodDiaryView {...{ animationController }} />

        <WelcomeView {...{ animationController }} />

        <LoginScreen {...{ animationController }} />
      </Animated.View>

      <TopBackSkipView {...{ onBackClick, onSkipClick, animationController }} />

      <CenterNextButton {...{ onNextClick, animationController }} />
    </View>
  );
};

const styles = StyleSheet.create({
  scenesContainer: {
    justifyContent: "center",
    ...StyleSheet.absoluteFillObject,
  },
});

export default IntroductionAnimationScreen;
