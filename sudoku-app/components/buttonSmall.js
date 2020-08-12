import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function ButtonSmall({ text, onPress }) {  
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
    width: 80,
    borderRadius: 15,
    marginHorizontal: 5
  },
  btnText: {
    color: "#ffffff",
    fontSize: 12,
    textTransform: "uppercase",
    textAlign: "center",
  },
});
