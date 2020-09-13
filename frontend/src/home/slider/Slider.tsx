import React from "react";
import Card from "./Card";
import "./Slider.css";
import useHorizontalScroll from "../../helpers/HScroll";

function Slider() {
    const scrollRef = useHorizontalScroll();
    const cardHolder = Array.from(
        { length: 25 },
        (v, k) => k + 1
    ).map((number) => (
        <Card date={`May ${number}th 2020`} text="Card tricks are fun."></Card>
    ));
    return (
        <section ref={scrollRef} className="slider">
            {cardHolder}
        </section>
    );
}

export default Slider;
