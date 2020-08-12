import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../components/buttonMedium";

export default function HomeScreen({ navigation }) {
  const { highScore } = useSelector((state) => {
    return {
      highScore: state.highScore,
    };
  });

  function secondToMinute(second) {
    let minute;
    let remainingSecond;
    if (second < 60) {
      return `${second} second`;
    } else {
      minute = Math.floor(second / 60);
      remainingSecond = second - minute * 60;
      return `${minute} min ${remainingSecond} second`;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Congratulation!</Text>
      <Text style={styles.text}>You have finished the board</Text>
      <View style={styles.containerLeaderboard}>
        <Text style={styles.text}>Leaderboard</Text>
        {highScore.map((data, index) => {
          return (
            <Text style={styles.textBoard} key={index}>
              {index} | {data.usernameStore} | {secondToMinute(data.userTime)}
            </Text>
          );
        })}
      </View>
      <CustomButton
        text="Again"
        onPress={() => {
          navigation.navigate("Sudoku");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#98C3F5",
    alignItems: "center",
    // justifyContent: "center",
  },
  containerLeaderboard: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 50,
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  textBoard: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    height: 30,
    width: 200,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
  buttonSelect: {
    color: "#d54062",
    margin: 5,
  },
});
