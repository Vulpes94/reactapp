import React from "react";
import { View } from "react-native";

export default function Padding({ children, padding, style }) {
  return <View style={[{ padding: padding ?? 20 }, style]}>{children}</View>;
}
