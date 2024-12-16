import React from "react";
import {
  Platform,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import _ from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";

export default function SimpleTodo() {
  const [list, setList] = React.useState([]);
  const [inputTodo, setInputTodo] = React.useState("");
  const [editingId, setEditingId] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    AsyncStorage.getItem("list")
      .then((data) => {
        if (data !== null) {
          setList(JSON.parse(data));
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const store = (newList) => {
    setList(newList);
    AsyncStorage.setItem("list", JSON.stringify(newList));
  };

  return (
    <>
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            style={{ flex: 1 }}
          >
            <Contents>
              {list.map((item) => {
                const isEditing = editingId === item.id;
                return (
                  <Todoltem key={item.id}>
                    <Check
                      onPress={() => {
                        store(
                          produce(list, (draft) => {
                            const index = list.indexOf(item);
                            draft[index].done = !list[index].done;
                          })
                        );
                      }}
                    >
                      <Checklcon>{item.done ? "\u2611" : "\u25A1"}</Checklcon>
                    </Check>
                    {isEditing ? (
                      <Input
                        value={editingText}
                        onChangeText={(value) => setEditingText(value)}
                      />
                    ) : (
                      <TodoltemText>{item.todo}</TodoltemText>
                    )}
                    {item.done ? (
                      isEditing ? (
                        <TodoltemButton
                          title="저장"
                          onPress={() => {
                            store(
                              produce(list, (draft) => {
                                const index = list.indexOf(item);
                                draft[index].todo = editingText;
                              })
                            );
                            setEditingId(null);
                            setEditingText("");
                          }}
                        />
                      ) : (
                        <TodoltemButton
                          title="수정"
                          onPress={() => {
                            setEditingId(item.id);
                            setEditingText(item.todo);
                          }}
                        />
                      )
                    ) : (
                      <TodoltemButton
                        title="삭제"
                        onPress={() => {
                          store(
                            _.reject(list, (element) => element.id === item.id)
                          );
                        }}
                      />
                    )}
                  </Todoltem>
                );
              })}
            </Contents>
            <InputContainer>
              <Input
                value={inputTodo}
                onChangeText={(value) => setInputTodo(value)}
              />
              <Button
                title="전송"
                onPress={() => {
                  if (inputTodo === "") {
                    return;
                  }
                  const newItem = {
                    id: uuidv4(),
                    todo: inputTodo,
                    done: false,
                  };
                  store([...list, newItem]);
                  setInputTodo("");
                }}
              />
            </InputContainer>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Container>
    </>
  );
}
const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: $(Constants.statusBarHeight) px;
`;

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

const Contents = styled.ScrollView`
  flex: 1;
  padding: 8px 24px;
`;

const Todoltem = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TodoltemText = styled.Text`
  font-size: 20px;
  flex: 1;
`;

const TodoltemButton = styled.Button``;

const InputContainer = styled.View`
  flex-direction: row;
  padding: 8px 24px;
`;

const Input = styled.TextInput`
  border: 1px solid #000000;
  flex: 1;
`;

const Check = styled.TouchableOpacity`
  margin-right: 4px;
`;

const Checklcon = styled.Text`
  font-size: 20px;
`;
