import React, { useEffect, useState } from "react";

import useHorizontalScroll from "../../helpers/HScroll";

import Card from "./Card";

import "./Slider.css";

function Slider() {
    const [scrollRef] = useHorizontalScroll();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
      fetch("http://127.0.0.1:4000/api/v0/db/test")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result.object);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, []) 

    if (!isLoaded) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {(error as any).message}</div>;
    }

    const cards = items.map((number:number) => (
        <Card key={number} id={number} date={`May ${number}th 2020`} text="Card tricks are fun."></Card>
    ));
    return (
      <section ref={scrollRef} className="slider">
          {cards}
      </section>
    );
  }

export default Slider;
