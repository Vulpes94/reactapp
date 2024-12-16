import React from "react";
import Container from "@/components/Diary/Container";
import Contents from "@/components/Diary/Contents";
import Button from "@/components/Diary/Button";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

export default function Form({ navigation }) {
  const [date, setDate] = React.useState("");
  const [text, setText] = React.useState("");

  // 날짜 포맷 자동 적용
  const handleDateInput = (value) => {
    // 숫자만 입력받음
    const onlyNumbers = value.replace(/[^0-9]/g, "");

    // 형식 자동 적용 (YYYY-MM-DD)
    let formattedDate = onlyNumbers.slice(0, 4); // 연도
    if (onlyNumbers.length > 4) {
      formattedDate += "-" + onlyNumbers.slice(4, 6); // 월
    }
    if (onlyNumbers.length > 6) {
      formattedDate += "-" + onlyNumbers.slice(6, 8); // 일
    }

    setDate(formattedDate);
  };

  const store = async () => {
    // 날짜 형식 체크 (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(date)) {
      Alert.alert("오류", "날짜 형식이 올바르지 않습니다.");
      return;
    }

    if (text === "") {
      Alert.alert("오류", "내용을 입력해주세요.");
      return;
    }

    let list = await AsyncStorage.getItem("list");
    if (list === null) {
      list = [];
    } else {
      list = JSON.parse(list);
    }

    list.push({
      date,
      text,
    });

    await AsyncStorage.setItem("list", JSON.stringify(list));
    navigation.goBack();
  };

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // 키보드 위 여백 설정
          style={{ flex: 1 }}
        >
          <Contents>
            <Label>날짜</Label>
            <Input
              placeholder={"YYYY-MM-DD"}
              value={date}
              onChangeText={handleDateInput}
              keyboardType="number-pad"
            />
            <Label>내용</Label>
            <Input
              multiline={true}
              style={{ height: 200 }}
              value={text}
              onChangeText={(value) => setText(value)}
            />
          </Contents>
          <Button onPress={store}>저장</Button>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
}

const Label = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Input = styled.TextInput`
  width: 100%;
  border: 1px solid #666666;
  padding: 8px;
  font-size: 20px;
  margin-bottom: 12px;
`;
