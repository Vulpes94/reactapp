import { Text, TouchableOpacity } from "react-native";

function Button({ title }) {
  return (
    <TouchableOpacity
      style={{ backgroundColor: "red", padding: 20 }}
      onPress={() => console.log("click!")}
    >
      <Text style={{ color: "white" }}>{title}</Text>
    </TouchableOpacity>
  );
}
export default Button;
