import * as React from "react";
import { SafeAreaView, Text, View, Button, StyleSheet } from "react-native";
import Constant from "expo-constants";
import _ from "lodash";
import styled from "styled-components/native";

let numbers = [];
_.times(45, (n) => numbers.push(n + 1));

const Ball = styled.View`
  width: 50px;
  height: 50px;
  background: ${(props) => {
    if (props.value < 11) {
      return "#e5e251";
    } else if (props.value < 21) {
      return "#517FE5";
    } else if (props.value < 31) {
      return "#E54036";
    } else if (props.value < 41) {
      return "#e5e5e5";
    } else {
      return "#43BF74";
    }
  }};
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

export default function LottoGenerator() {
  const [displayNumbers, setNumbers] = React.useState(_.shuffle(numbers));
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        {displayNumbers.slice(0, 6).map((number, index) => (
          <Ball key={index} value={number}>
            <Text style={styles.text}>{number}</Text>
          </Ball>
        ))}
      </View>

      <Button
        title="다시하기"
        onPress={() => {
          setNumbers(_.shuffle(numbers));
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constant.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 24,
  },
  text: {
    borderColor: "#000000",
    fontSize: 20,
    fontWeght: "bold",
  },
});
