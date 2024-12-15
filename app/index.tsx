import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeF from "@/pages/HomeF";
import ClockDigital from "@/pages/ClockDigital";
import LottoGenerator from "@/pages/LottoGenerator";
import SimpleTodo from "@/pages/SimpleTodo";
import List from "@/pages/Diary/List";
import Form from "@/pages/Diary/Form";
import Detail from "@/pages/Diary/Detail";
import ZipCodeFinder from "@/pages/ZipCodeFinder";
import Money from "@/pages/Money";
import 'react-native-get-random-values';

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeF} />
      <Stack.Screen name="ClockDigital" component={ClockDigital} />
      <Stack.Screen name="LottoGenerator" component={LottoGenerator} />
      <Stack.Screen name="SimpleTodo" component={SimpleTodo} />
      <Stack.Screen
        name="List"
        component={List}
        options={{ title: "일기 목록" }}
      />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen
        name="Form"
        component={Form}
        options={{ title: "일기 작성" }}
      />
      <Stack.Screen name="ZipCodeFinder" component={ZipCodeFinder} />
      <Stack.Screen name="Money" component={Money} />
    </Stack.Navigator>
  );
}
