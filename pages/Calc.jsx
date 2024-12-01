import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Button, { ButtonTypes } from "@/components/Button";

function Calc() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>Calc app</Text>
      <Button
        title="1"
        onPress={() => console.log(1)}
        buttonStyle={{
          width: 100,
          height: 100,
          marginTop: 1,
        }}
        buttonType={ButtonTypes.NUMBER}
      />
      <Button
        title="0"
        onPress={() => console.log(0)}
        buttonStyle={{
          width: 200,
          height: 100,
          marginTop: 1,
        }}
        buttonType={ButtonTypes.NUMBER}
      />
      <Button title="title" onPress={() => console.log("click!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 60,
    fontWeight: "700",
    color: "#ff0000",
    paddingBottom: 30,
    paddingRight: 30,
  },
});

export default Calc;
