import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  Animated,
  useWindowDimensions,
<<<<<<< HEAD
=======
  Dimensions,
>>>>>>> 7882329 (funcional 1)
  View,
} from "react-native";
import { AppImages } from "../../../assets";
import { lightTheme, Theme } from "@/src/constants/theme";
import Video from "react-native-video";

interface Props {
  animationController: React.RefObject<Animated.Value>;
}

const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 250;

const WelcomeView: React.FC<Props> = ({ animationController }) => {
  const window = useWindowDimensions();
  const theme = lightTheme;
<<<<<<< HEAD
  const styles = getStyles(theme, window);
=======
  const styles = getStyles(theme);
>>>>>>> 7882329 (funcional 1)

  const careRef = useRef<Text | null>(null);

  const slideAnim = animationController.current!.interpolate({
    inputRange: [0, 0.6, 0.8],
    outputRange: [window.width, window.width, 0],
  });

  const textEndVal = 26 * 2;
  const welcomeTextAnim = animationController.current!.interpolate({
    inputRange: [0, 0.6, 0.8],
    outputRange: [textEndVal, textEndVal, 0],
  });

  const imageEndVal = IMAGE_WIDTH * 4;
  const imageAnim = animationController.current!.interpolate({
    inputRange: [0, 0.6, 0.8],
    outputRange: [imageEndVal, imageEndVal, 0],
  });

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: slideAnim }] }]}
    >
      <View style={styles.videoContainer}>
        <Video
          source={AppImages.welcome_video}
          style={styles.video}
          muted={true}
          repeat={true}
          resizeMode="cover"
          playInBackground={false}
          playWhenInactive={false}
          ignoreSilentSwitch="ignore"
          onError={(e) => console.log("Erro no vídeo:", e)}
        />
        <View style={styles.overlay} />
      </View>

<<<<<<< HEAD
      <View style={styles.contentContainer}>
        <Animated.View style={{ flexDirection: "row" }}>
          <Animated.Text
            style={[
              styles.title,
              { transform: [{ translateX: welcomeTextAnim }] },
            ]}
            ref={careRef}
          >
            Stra
          </Animated.Text>
          <Animated.Text
            style={[
              styles.title,
              styles.titlePink,
              { transform: [{ translateX: welcomeTextAnim }] },
            ]}
            ref={careRef}
          >
            da
          </Animated.Text>
        </Animated.View>
        <Text style={styles.subtitle}>
          Sua carona está pronta. Vamos{"\n"}
          compartilhar a estrada juntos?
        </Text>
      </View>
=======
      <Animated.View style={{ flexDirection: "row" }}>
        <Animated.Text
          style={[
            styles.title,
            { transform: [{ translateX: welcomeTextAnim }] },
          ]}
          ref={careRef}
        >
          Stra
        </Animated.Text>
        <Animated.Text
          style={[
            styles.title,
            styles.titlePink,
            { transform: [{ translateX: welcomeTextAnim }] },
          ]}
          ref={careRef}
        >
          da
        </Animated.Text>
      </Animated.View>
      <Text style={styles.subtitle}>
        Sua carona está pronta. Vamos{"\n"}
        compartilhar a estrada juntos?
      </Text>
>>>>>>> 7882329 (funcional 1)
    </Animated.View>
  );
};

<<<<<<< HEAD
const getStyles = (theme: Theme, window: { width: number; height: number }) =>
=======
const { width, height } = Dimensions.get("window");

const getStyles = (theme: Theme) =>
>>>>>>> 7882329 (funcional 1)
  StyleSheet.create({
    container: {
      position: "absolute",
      left: 0,
<<<<<<< HEAD
      top: 0,
      width: window.width,
      height: window.height,
      backgroundColor: "#452132",
      alignItems: "center",
    },
    videoContainer: {
      position: "absolute",
      width: window.width,
      height: window.height,
      top: 0,
      left: 0,
      zIndex: 1,
    },
    video: {
      width: "100%",
      height: "100%",
=======
      right: 0,
      alignItems: "center",
      paddingBottom: 100,
    },
    image: {
      maxWidth: IMAGE_WIDTH,
      maxHeight: IMAGE_HEIGHT,
      marginTop: 450,
    },
    videoContainer: {
      position: "absolute",
      width: width,
      height: height,
      left: 0,
      top: -350,
    },
    video: {
      width: width,
      height: height,
>>>>>>> 7882329 (funcional 1)
      position: "absolute",
    },
    overlay: {
      position: "absolute",
      width: "100%",
      height: "100%",
<<<<<<< HEAD
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    contentContainer: {
      position: "absolute",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2,
=======
      backgroundColor: "rgba(0, 0, 0, 0.6)",
>>>>>>> 7882329 (funcional 1)
    },
    title: {
      color: theme.primaryBlueDarkTheme,
      fontSize: 80,
      textAlign: "center",
      fontFamily: "WorkSans-Bold",
    },
    titlePink: {
      color: theme.primary,
    },
    subtitle: {
      color: theme.backgroundAccent,
      textAlign: "center",
      fontFamily: "WorkSans-Regular",
      paddingHorizontal: 64,
      paddingVertical: 16,
    },
  });

export default WelcomeView;
