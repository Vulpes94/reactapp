import React from "react";
import Container from "@/components/Diary/Container";
import Contents from "@/components/Diary/Contents";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import Button from "@/components/Diary/Button";

export default function Detail({ navigation, route }) {
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    navigation.setOptions({ title: route.params.date });

    AsyncStorage.getItem("list").then((data) => {
      const list = JSON.parse(data);
      const diary = list.find((element) => element.date === route.params.date);
      setText(diary.text);
    });
  }, [navigation, route.params.date]);

  const deleteDiary = async () => {
    Alert.alert(
      "삭제 확인",
      "정말로 이 항목을 삭제하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "삭제",
          onPress: async () => {
            let list = await AsyncStorage.getItem("list");
            list = JSON.parse(list);

            // 현재 일기 가져오기
            list = list.filter((diary) => diary.date !== route.params.date);

            // 리스트 다시 저장
            await AsyncStorage.setItem("list", JSON.stringify(list));

            // 돌아가기
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Container>
      <Contents>
        <Text>{text}</Text>
      </Contents>

      <Button onPress={deleteDiary}>일기 삭제</Button>
    </Container>
  );
}

const Text = styled.Text`
  font-size: 20px;
  line-height: 28px;
  flex: 1;
`;
