import React from "react"
import { Carousel } from 'antd';
import carouselMovie from "../resources/img/carouselMovie.jpg";
import carouselGame from "../resources/img/carouselGame.jpg";

const Home = () => {
    return (
        <>
            <Carousel autoplay>
            <div>
                <img alt="carouselMovie" src={carouselMovie} width="1000px" height="460px" />
            </div>
            <div>
                <img alt="carouselMovie" src={carouselGame} width="1000px" height="460px" />
            </div>
        </Carousel>
        </>
    )
}

export default Home