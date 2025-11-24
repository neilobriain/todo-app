import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Button } from 'react-native';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [todoText, setTodoText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (): void => {
    if (todoText.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now(),
      text: todoText,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodoText('');
  };

  const toggleTodo = (id: number): void => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={todoText}
          onChangeText={setTodoText}
          placeholder="Enter a new to-do"
        />
        <Button title="Add" onPress={addTodo} />
      </View>

      <ScrollView style={styles.scrollView}>
        {todos.length === 0 ? (
          <Text style={styles.emptyText}>No to-dos yet. Add one above!</Text>
        ) : (
          todos.map(todo => (
            <TouchableOpacity
              key={todo.id}
              style={[styles.todoItem, todo.completed && styles.completedTodo]}
              onPress={() => toggleTodo(todo.id)}
            >
              <Text style={[styles.todoText, todo.completed && styles.completedText]}>
                {todo.text}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Text>Total: {todos.length}</Text>
        <Text>Completed: {todos.filter(todo => todo.completed).length}</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  todoItem: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  completedTodo: {
    backgroundColor: '#d0ffd6',
  },
  todoText: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});
