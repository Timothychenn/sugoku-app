import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

export default function ButtonMedium({ text, onPress }) {  
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.btnContainer}>
        <Text style={styles.btnText}> {text} </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: "#255c99",
    paddingVertical: 8,
    width: 150,
    borderRadius: 5,
  },
  btnText: {
    color: "#ffffff",
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
  },
});
