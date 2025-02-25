import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductList from './ProductList';

export default function ProductRelate({ relatedProducts }) {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>

            {
                relatedProducts.map((product, index) =>
                    <ProductList product={product} key={index} />
                )
            }

        </Slider>
    )
}
