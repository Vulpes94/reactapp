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

import { ZIP_URL_KEY, ZIP_API_KEY } from "@env";

export default function ZipCodeFinder() {
  const [keyword, setKeyword] = useState("");
  const [list, setList] = useState([]);
  const search = useCallback(() => {
    axios
      .get(ZIP_URL_KEY, {
        params: {
          confmKey: ZIP_API_KEY,
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
            placeholder={"도로명 주소를 입력하세요"}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#000",
              borderRadius: 4,
              padding: 8,
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
