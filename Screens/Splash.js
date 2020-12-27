import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";


export default Splash = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LottieView
        autoPlay
        height={700}
        width={400}
        source={require("../assets/splash.json")}
        
        //onAnimationFinish={() => navigation.navigate("Options")}
      />
    </View>
  );
};
