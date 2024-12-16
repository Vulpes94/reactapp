import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";

const CalcButtonTypes = {
  NUMBER: "NUMBER",
  OPERATOR: "OPERATOR",
};
const Colors = {
  NUMBER: ["#71717a", "#3f3f46"],
  OPERATOR: ["#f59e0b", "#b45309"],
};

export default function CalcButton({
  title,
  onPress,
  buttonStyle,
  buttonType,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor:
            buttonType === CalcButtonTypes.NUMBER ? "#71717a" : "#f59e0b",
        },
        pressed && {
          backgroundColor:
            buttonType === CalcButtonTypes.NUMBER ? "#3f3f46" : "#b45309",
        },
        buttonStyle,
      ]}
      onPressOut={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: 50,
  },
});

export { CalcButtonTypes };
