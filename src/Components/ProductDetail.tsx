import React, { useState } from "react"; 
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getProductById } from "../modules/api";
import Skleton from "../Components/Skleton"; 
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
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery<Product, Error>(
    ["product", productId],
    () => getProductById(productId!),
    { enabled: !!productId }
  );


  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };


  if (isLoading) {
    return (
      <div className="product-container">
        <div className="product-image">
          <Skleton /> 
        </div>
      </div>
    );
  }

  if (isError) return <div className="error">Error: {error.message}</div>;
  if (!product) return <div className="not-found">Product not found</div>;

  const discountedPrice: number =
    product.price - (product.price * (product.discount / 100));

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
        <p className="category">Kategoriya: {product.category}</p>
        <h3>Description: {product.description}</h3>
          <p className="price">Price:   {product.price}$</p>

        <div className="action-container">
          <div className="Buy">
            <p>Add to Basket</p>
          <SlBasket className="nav_svg" />
            </div>
            <div
          className={`favorite-icon ${isFavorite ? "active" : ""}`}
          onClick={toggleFavorite}
               >
       <MdFavoriteBorder className="nav_svg" />
        </div>
          </div>
    </div>
      </div>
  );
};

export default ProductDetail;
