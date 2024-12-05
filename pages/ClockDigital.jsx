import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import styled from "styled-components/native";

const image = { uri: "https://picsum.photos/1280/1280" };

export default function ClockDigital() {
  const [date, setDate] = useState(DateTime.now());

  useEffect(() => {
    const id = setInterval(() => {
      setDate(DateTime.now());
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={styles.row}>
      <Container source={image} resizeMode="stretch">
        <TimeText>{date.toFormat("HH:mm")}</TimeText>
        <Second>{date.toFormat("ss")}</Second>
      </Container>
    </View>
  );
}

const Container = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TimeText = styled.Text`
  font-size: 64px;
  font-weight: bold;
`;

const Second = styled.Text`
  font-size: 30px;
  font-weight: bold;
  margintop: 12px;
`;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
