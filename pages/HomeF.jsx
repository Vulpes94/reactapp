import React, { useCallback } from "react";
import { FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";

const screenList = [
  { key: "ClockDigital", title: "디지털 시계", link: "ClockDigital" },
  { key: "LottoGenerator", title: "로또 번호 생성기", link: "LottoGenerator" },
  { key: "SimpleTodo", title: "할일관리", link: "SimpleTodo" },
  { key: "List", title: "일기", link: "List" },
  { key: "ZipCodeFinder", title: "주소검색", link: "ZipCodeFinder" },
  { key: "Money", title: "환율", link: "Money" },
];

export default function HomeF({ navigation }) {
  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate(item.link);
        }}
      >
        <Text style={styles.buttonText}>{item.title}</Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <FlatList
      data={screenList}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#00BFFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
