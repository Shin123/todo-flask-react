import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../Components/Button/button';
import { useNavigate } from 'react-router-dom';

export const Show = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState([]);
  const [isEditting, setIsEditting] = useState(false);
  const [editTodo, setEditTodo] = useState('');

  const navigate = useNavigate();
  console.log(todo);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/todos/${id}`);
      setTodo([res.data]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  const handleDeleteTodo = async () => {
    try {
      const res = await axios.delete(`/todos/${id}`);
      if (res.data) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
    navigate('/');
  };

  const handleOnChangeTodo = async (e) => {
    try {
      const res = await axios.put(`/todos/${id}`, {
        task: editTodo,
        done: false,
      });
      if (res.data) {
        toast.success(res.data.message);
        fetchData();
        setIsEditting(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  let todoContent;
  if (isEditting) {
    todoContent = (
      <>
        <input
          value={todo.task}
          onChange={(e) => setEditTodo(e.target.value)}
        />
        <input
          type='checkbox'
          value={todo.done}
          onChange={(e) => setEditTodo(e.target.value)}
        ></input>
        <Button handleOnClick={handleOnChangeTodo} title='Save' />
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.task}
        <Button handleOnClick={() => setIsEditting(true)} title='Edit' />
      </>
    );
  }

  return (
    <>
      {todo.length > 0 &&
        todo.map((data) => <div key={data.id}>{data.task}</div>)}
      {todoContent}
      <Button handleOnClick={handleDeleteTodo} title='Delete' />
      <hr></hr>
      <Link to='/'>Back to totos</Link>
    </>
  );
};
