import React from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function ProductSlider({ product }) {
    // Nhiều hình ảnh của sản phẩm đó
    const images = [
        {
            original: product.featured_image,
            thumbnail: product.featured_image,
        }
    ];

    const moreImages = product.image_items.map((image_item) =>
    (
        {
            original: image_item.name,
            thumbnail: image_item.name,
        })
    );

    // Gộp lại
    const allImages = [...images, ...moreImages];

    return <ImageGallery items={allImages} />;
}
