import React from 'react';
import './Card.css';

function Card(props: { key: number; id: number; date: string; text: string }) {
  return (
    <article className="card">
      <header className="card-header">
        <p>{props.date}</p>
        <h2>{props.text}</h2>
      </header>
      <button onClick={() => getInfo(props.id)}>Get Notification</button>
    </article>
  );
}

function getInfo(id: number): any {
  fetch(`http://127.0.0.1:4000/api/v0/getOne/${id}`, {
    method: 'get',
    headers: {
      'content-type': 'application/json'
    }
  });
}

export default Card;
