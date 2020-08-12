import React from "react";
import { Alert, Text, View } from "react-native";
import CountDown from "react-native-countdown-component";

export default function Timer(props) {
  const { navigateToHome, solveTime, userTime, setUserTime } = props;

  return (
      <CountDown
        timeToShow={["M", "S"]}
        timeLabels={{ m: null, s: null }}
        digitStyle={{
          backgroundColor: "#FFF",
          borderWidth: 2,
          borderColor: "#00bcd4",
        }}
        digitTxtStyle={{ color: "#00bcd4" }}
        until={solveTime}
        onChange={() => setUserTime(userTime + 1)}
        onFinish={() =>
          Alert.alert(
            "Sudoku",
            "Times'up!",
            [{ text: "OK", onPress: () => navigateToHome() }],
            { cancelable: false }
          )
        }
        size={20}
      />
  );
}
