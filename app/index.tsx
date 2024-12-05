import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeF from "@/pages/HomeF";
import ClockDigital from "@/pages/ClockDigital";
import LottoGenerator from "@/pages/LottoGenerator";
import TouchableOpacity from "@/pages/TouchableOpacity";
import SimpleTodo from "@/pages/SimpleTodo";
import Calc from "@/pages/Calc";
import Diary from "@/pages/Diary";

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeF} />
      <Stack.Screen name="ClockDigital" component={ClockDigital} />
      <Stack.Screen name="LottoGenerator" component={LottoGenerator} />
      <Stack.Screen name="TouchableOpacity" component={TouchableOpacity} />
      <Stack.Screen name="SimpleTodo" component={SimpleTodo} />
      <Stack.Screen name="Calc" component={Calc} />
      <Stack.Screen name="Diary" component={Diary} />
    </Stack.Navigator>
  );
}
