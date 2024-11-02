import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../modules/api";
import Paginate from "./Paginate";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Skleton from "../Components/Skleton";


interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  images: string[];
}

const Products: React.FC = () => {
  const { data: products, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const productsPerPage = 16;
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="container">
        <div className="products">
          {[...Array(16)].map((_, index) => (
            <div key={index} className="product_card">
              <Skleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !products) {
    return <div>An error occurred or no products were found...</div>;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let currentPageProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  currentPageProducts = [...currentPageProducts].sort((a, b) => {
    switch (sortOption) {
      case "priceLowToHigh":
        return a.price - b.price;
      case "priceHighToLow":
        return b.price - a.price;
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleCardClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <div className="sort-container">
        <label htmlFor="sort">Sort by :</label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="default">All</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="title">Title: A to Z</option>
        </select>
      </div>

      <div className="products">
        {currentPageProducts.map((product:any) => (
          <div
            className="product_card"
            key={product.id}
            onClick={() => handleCardClick(product.id)}
          >
            {product.images && product.images.length > 0 ? (
              <img
                className="products_card_img"
                src={product.images[0]}
                alt={product.title}
              />
            ) : (
              <div>Image not available</div>
            )}
            <p className="products_card_category">{product.category}</p>
            <h3 className="product-title">{product.title}</h3>
            <p className="product_price">Price: {product.price}$</p>
          </div>
        ))}
      </div>

      <Paginate
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Products;
