import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Card } from '../Components/Card/card';

export const Show = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState([]);

  useEffect(
    () =>
      async function () {
        const res = await axios.get(`/todos/${id}`);
        setTodo([res.data]);
      },
    [id]
  );

  return <>{todo.length > 0 && todo.map((data) => <div>{data.task}</div>)}</>;
};
