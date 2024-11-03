import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getProductById } from "../modules/api";
import Skeleton from "../Components/Skleton"; // Corrected spelling
import { SlBasket } from "react-icons/sl";
import "../assets/sass/main.scss";
import { MdFavoriteBorder } from "react-icons/md";

interface Product {
  title: string;
  images: string[];
  category: string;
  price: number;
  discount: number;
  description: string;
}

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBasketClicked, setIsBasketClicked] = useState(false);

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery<Product, Error>(
    ["product", productId],
    () => getProductById(productId as string),
    { enabled: !!productId }
  );

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleBasket = () => {
    setIsBasketClicked(!isBasketClicked);
  };

  if (isLoading) {
    return (
      <div className="product-container">
        <div className="product-image">
          <Skeleton />
        </div>
      </div>
    );
  }

  if (isError) return <div className="error">Error: {error.message}</div>;
  if (!product) return <div className="not-found">Product not found</div>;

  const discountedPrice = product.price - product.price * (product.discount / 100);

  return (
    <div className="product-container">
      <div className="product-image">
        {product.images && product.images.length > 0 ? (
          <img src={product.images[0]} alt={product.title} />
        ) : (
          <div className="no-image">Image not available</div>
        )}
      </div>
      <div className="product-details">
        <h1>{product.title}</h1>
        <p className="category">Category: {product.category}</p>
        <h3>Description: {product.description}</h3>
        
        <p className="price">
          {product.discount > 0 ? (
            <>
              <span className="original-price" style={{ textDecoration: 'line-through', color: 'gray', marginRight: '10px' }}>
                Price:{product.price.toFixed(2)}$
              </span>
              <span className="discounted-price">
                Price:{discountedPrice.toFixed(2)}$
              </span>
            </>
          ) : (
            <span>Price: {product.price.toFixed(2)}$</span>
          )}
        </p>

        <div className="action-container">
          <button className="buy-button" onClick={toggleBasket}>
            Add to Basket{" "}
            <SlBasket className={`nav_svg ${isBasketClicked ? "clicked" : ""}`} />
          </button>
          <div
            className={`favorite-icon ${isFavorite ? "active" : ""}`}
            onClick={toggleFavorite}
            aria-label="Add to favorites"
          >
            <MdFavoriteBorder className={`nav_svg ${isFavorite ? "favorite-active" : ""}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
