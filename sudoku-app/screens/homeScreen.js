import React, { useState } from "react";
import { Text, View, Button, TextInput, StyleSheet, Alert } from "react-native";
import CustomButton from "../components/buttonMedium";
import { useDispatch } from "react-redux";
import { setUserName } from "../store/actions/index.js";

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  function handlePlay() {
    if (username) {
      dispatch(setUserName(username));
      navigation.navigate("Sudoku", { username: username });
    } else {
      Alert.alert(
        "Sudoku",
        "Please input your name!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sudoku Game</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        onChangeText={(text) => {
          setUsername(text);
        }}
      />
      <CustomButton text="Play" onPress={() => handlePlay()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#98C3F5",
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 225,
    marginBottom: 50,
    color: "black",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    height: 30,
    width: 200,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "white",
  },
  buttonSelect: {
    color: "#d54062",
    margin: 5,
  },
});
