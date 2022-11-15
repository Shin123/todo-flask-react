import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Card } from '../Components/Card/card';
import { Form } from '../Components/Form/form';

export const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [addTodo, setAddTodo] = useState('');

  const getTodos = async () => {
    try {
      console.log(5555);
      const res = await axios.get(`/todos`);
      setTodos(res.data || []);
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => getTodos, []);

  const handleFormChange = (inputValue) => {
    setAddTodo(inputValue);
  };

  const handleFormSubmit = async () => {
    try {
      const res = await axios.post(`/todos/`, { task: addTodo });
      if (res.data) {
        setAddTodo('');
        getTodos();
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Form
        userInput={addTodo}
        onFormChange={handleFormChange}
        onFormSubmit={handleFormSubmit}
      />
      <Card listOfTodos={todos} />
    </>
  );
};
