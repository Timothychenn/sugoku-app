import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";

export default function SudokuBoard(props) {
  const { board, loading, handleInputChange } = props;

  if (loading) {
    return (
      <View style={styles.boardContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      {board && (
        <View style={styles.boardContainer}>
          {board.map((array, indexCol) => {
            return (
              <View style={styles.rowBoard} key={indexCol}>
                {array.map((data, indexRow) => {
                  if (data.editable === true) {
                    return (
                      <TextInput
                        style={styles.input}
                        key={indexRow}
                        maxLength={1}
                        onChangeText={(text) =>
                          handleInputChange(indexCol, indexRow, text)
                        }
                        keyboardType="number-pad"
                      >
                        {data.number.toString()}
                      </TextInput>
                    );
                  } else {
                    return (
                      <Text style={styles.box} key={indexRow}>
                        {data.number}
                      </Text>
                    );
                  }
                })}
              </View>
            );
          })}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    borderWidth: 1,
    height: 30,
    width: 30,
    margin: 3,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: 'white'
  },
  box: {
    borderColor: "black",
    borderWidth: 1,
    height: 30,
    width: 30,
    margin: 3,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#dddddd",
    fontWeight: "bold",
  },
  boardContainer: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  rowBoard: {
    flexDirection: "row",
  },
});
