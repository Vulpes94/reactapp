import { useCallback } from "react";
import { Button, FlatList } from "react-native";

const screenList = [
  { key: "ClockDigital", title: "디지털 시계", link: "ClockDigital" },
  { key: "LottoGenerator", title: "로또 번호 생성기", link: "LottoGenerator" },
  { key: "TouchableOpacity", title: "터치", link: "TouchableOpacity" },
  { key: "SimpleTodo", title: "할일관리", link: "SimpleTodo" },
  { key: "Calc", title: "계산기", link: "Calc" },
  { key: "Diary", title: "일기", link: "Diary" },
];

function HomeF({ navigation }) {
  const renderItem = useCallback(({ item }) => {
    return (
      <Button
        title={item.title}
        onPress={() => {
          navigation.navigate(item.link);
        }}
      />
    );
  }, []);

  return (
    <>
      <FlatList data={screenList} renderItem={renderItem} />
    </>
  );
}

export default HomeF;
