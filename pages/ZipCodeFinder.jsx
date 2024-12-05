import { StatusBar } from "expo-status-bar";
import axios from "axios";
import React, { useState, useCallback } from "react";
import Constants from "expo-constants";
import {
  Platform,
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from "react-native";
import Row from "@/components/ZipCodeFinder/Row";
import Padding from "@/components/ZipCodeFinder/Padding";
import AddressItem from "@/components/ZipCodeFinder/AddressItem";

export default function ZipCodeFinder() {
  const [keyword, setKeyword] = useState("");
  const [list, setList] = useState([]);
  const search = useCallback(() => {
    axios
      .get("https://business.juso.go.kr/addrlink/addrLinkApi.do", {
        params: {
          confmKey: "",
          currentPage: 1,
          countPerPage: 100,
          keyword,
          resultType: "json",
        },
      })
      .then((response) => {
        setList(response.data.results.juso);
      })
      .catch(console.warn);
  }, [keyword, list]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Padding style={{ flex: 1 }}>
        <Row>
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1, // 테두리 두께 설정
              borderColor: "#000", // 테두리 색상 설정 (검정)
              borderRadius: 4, // 둥근 모서리
              padding: 8, // 내부 여백 추가
            }}
            value={keyword}
            onChangeText={(text) => setKeyword(text)}
          />
          <Button title="검색" onPress={search} />
        </Row>
        <FlatList
          data={list}
          renderItem={(item) => <AddressItem item={item.item} />}
          keyExtractor={(item) => item.rnMgtSn + item.roadAddr}
          style={{ flex: 1 }}
        />
      </Padding>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
});
