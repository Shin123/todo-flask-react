import React from 'react';
import { Link } from 'react-router-dom';

export const Card = ({ listOfTodos }) => {
  return (
    <>
      {listOfTodos.map((todo) => {
        return (
          <ul key={todo.id}>
            <Link to={`${todo.id}`}>
              <li>{todo.done ? <del>todo.task</del> : todo.task}</li>
            </Link>
          </ul>
        );
      })}
    </>
  );
};
