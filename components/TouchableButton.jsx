import { Text, TouchableOpacity } from "react-native";

export default function TouchableButton({ title }) {
  return (
    <TouchableOpacity
      style={{ backgroundColor: "red", padding: 20 }}
      onPress={() => console.log("click!")}
    >
      <Text style={{ color: "white" }}>{title}</Text>
    </TouchableOpacity>
  );
}
