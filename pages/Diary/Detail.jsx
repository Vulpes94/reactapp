import React from "react";
import Container from "@/components/Diary/Container";
import Contents from "@/components/Diary/Contents";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Text = styled.Text`
  font-size: 20px;
  line-height: 28px;
`;

function Detail({ navigation, route }) {
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    navigation.setOptions({ title: route.params.date });

    AsyncStorage.getItem("list").then((data) => {
      const list = JSON.parse(data);
      const diary = list.find((element) => element.date === route.params.date);
      setText(diary.text);
    });
  }, [navigation, route.params.date]);

  return (
    <Container>
      <Contents>
        <Text>{text}</Text>
      </Contents>
    </Container>
  );
}
export default Detail;
