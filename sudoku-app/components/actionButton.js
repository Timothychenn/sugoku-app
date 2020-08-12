import React from "react";
import { StyleSheet, View } from "react-native";
import CustomButtonSmall from "./buttonSmall";

export default function ActionButton(props) {
  const { submitSudokuBoard, getSolution, getEmpyBoard } = props;

  return (
    <View style={styles.buttonContainer}>
      <CustomButtonSmall text="Submit" onPress={() => submitSudokuBoard()} />
      <CustomButtonSmall text="Solution" onPress={() => getSolution()} />
      <CustomButtonSmall text="Clear" onPress={() => getEmpyBoard()} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 15,
    color: "#005086",
  },
});
