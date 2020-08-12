import React from "react";
import { StyleSheet, View } from "react-native";
import CustomButtonSmall from "./buttonSmall";

export default function LevelButton(props) {
  const { generateSudokuBoard } = props;

  return (
    <View style={styles.buttonContainer}>
      <CustomButtonSmall text="Easy" onPress={() => generateSudokuBoard("easy")} />
      <CustomButtonSmall text="Medium" onPress={() => generateSudokuBoard("medium")} />
      <CustomButtonSmall text="Hard" onPress={() => generateSudokuBoard("hard")} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    color: "#005086",
    marginVertical: 15
  },
  selectButton: {
    margin: 10,
  },
});
