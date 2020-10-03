import React from "react";
import "./Card.css";

function Card(props: { key:number; date: string; text: string }) {
    return (
        <article className="card">
            <header className="card-header">
                <p>{props.date}</p>
                <h2>{props.text}</h2>
            </header>
        </article>
    );
}

export default Card;
