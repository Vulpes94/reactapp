import React, { useEffect, useState } from "react";
import { ScrollView, Button, View, Text } from "react-native";
import styled from "styled-components/native";
import RequestChangeMoney from "../api/RequestChangeMoney";
import newDate from "../Util/Date";

export default function ChangeMoney() {
  const [moneyList, setMoneyList] = useState([]);
  const [keyword, setKeyword] = useState(1);
  const [pressBoolean, setPressBoolean] = useState(false);

  useEffect(() => {
    async function start() {
      const resultData = await RequestChangeMoney(newDate);
      if (!resultData) {
        console.log("error");
      } else {
        console.log(resultData.data);
        setMoneyList(resultData.data);
      }
    }
    start();
  }, []);

  const handlerBtn = () => {
    setPressBoolean(!pressBoolean);
  };

  return (
    <ScrollView>
      <Header>
        <HeaderText>환율 계산</HeaderText>
      </Header>
      <TextInputContainer>
        <TextInputText
          value={keyword}
          onChangeText={(text) => {
            setKeyword(text);
            setPressBoolean(false);
          }}
        />
        <TextExplainView>
          <TextExplain>THB</TextExplain>
        </TextExplainView>
        <Button
          title="환전"
          onPress={() => {
            handlerBtn();
          }}
        />
      </TextInputContainer>
      <View>
        {pressBoolean
          ? moneyList.map((item, index) => {
              return item.cur_nm === "태국 바트" ? (
                <ItemBox key={index}>
                  <MoneyName>{item.cur_nm}</MoneyName>
                  <Text>{keyword}</Text>
                  <MoneyType>{item.cur_unit}</MoneyType>
                  <Money>
                    {(item.deal_bas_r.replace(/,/g, "") * keyword).toFixed(0)}
                  </Money>
                  <MoneyType>원</MoneyType>
                </ItemBox>
              ) : (
                ""
              );
            })
          : ""}
      </View>
      <Header>
        <HeaderText>환율(기준날짜:{newDate})</HeaderText>
      </Header>

      {moneyList.map((item, index) => {
        return item.cur_nm === "한국 원" ? (
          ""
        ) : (
          <ItemBox key={index + 50}>
            <MoneyName>{item.cur_nm}</MoneyName>
            <MoneyType>{item.cur_unit}</MoneyType>
            <Money>{item.deal_bas_r}원</Money>
          </ItemBox>
        );
      })}
    </ScrollView>
  );
}

const ItemBox = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
  height: 25px;
  padding-left: 20px;
  padding-right: 20px;
`;

const MoneyName = styled.Text`
  font-weight: bold;
  margin-right: 10px;
`;

const Money = styled.Text`
  padding-left: 10px;
`;

const MoneyType = styled.Text`
  font-size: 11px;
  padding-left: 3px;
`;

const Header = styled.View`
  flex: 1;
  height: 60px;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const TextInputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
`;
const TextInputText = styled.TextInput`
  background-color: silver;
  flex: 2;
  height: 40px;
  padding-left: 10px;
`;
const TextExplainView = styled.View`
  flex: 1;
  background-color: silver;
  height: 40px;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
`;
const TextExplain = styled.Text`
  font-size: 11px;
  color: black;
`;
