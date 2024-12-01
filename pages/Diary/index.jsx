import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import List from "./List";
import Detail from "./Detail";
import Form from "./Form";

const Stack = createStackNavigator();

function Diary() {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
}

export default Diary;
