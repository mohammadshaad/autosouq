import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ProductsContext } from "../Global/ProductsContext";
import { CartContext } from "../Global/CartContext";
import { Loader } from "./Loader";
import { useAuth } from "../Global/AuthContext";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProductNotFound from "../images/productnotfound.png";

export const Products = () => {
  const { products } = useContext(ProductsContext);
  const { dispatch } = useContext(CartContext);
  const { currentUser, login } = useAuth();

  const history = useHistory();

  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedProductCount, setDisplayedProductCount] = useState(4);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const filteredProducts = products.filter((product) => {
    const productNameLower = product.ProductName.toLowerCase();
    return (
      (selectedFilter === "" || product.ProductType === selectedFilter) &&
      productNameLower.includes(searchTerm.toLowerCase())
    );
  });

  const loadMoreProducts = () => {
    setDisplayedProductCount(displayedProductCount + 4);
    if (displayedProductCount + 4 > filteredProducts.length) {
      history.push("/products");
    }
  };

  const addToCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      id: product.ProductID,
      product,
    });
  };

  return (
    <div className="products-main-container">
      <div className="products-wrapper">
        <h1>Products</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-box"
          />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Inara">Inara</option>
            <option value="Naari">Naari</option>
            <option value="Malar">Malar</option>
            <option value="Pooranya">Pooranya</option>
          </select>
        </div>
        <div className="products-container">
          {filteredProducts.length === 0 ? (
            <div className="text-gray-400 font-light text-2xl flex-col flex items-center justify-center">
              <img src={ProductNotFound} alt="" className="w-96 mx-auto" />
              No products to display.
            </div>
          ) : (
            filteredProducts
              .slice(0, displayedProductCount)
              .map((product, index) => (
                <motion.div
                  className="product-card"
                  key={product.ProductID}
                  ref={index === 0 ? ref : null}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="product-img">
                    <img src={product.ProductImg} alt="not found" />
                  </div>
                  <div className="product-name">{product.ProductName}</div>
                  <div className="product-price">
                    Rs {product.ProductPrice}.00
                  </div>

                  <button
                    className="addcart-btn"
                    onClick={() => addToCart(product)}
                  >
                    ADD TO CART
                  </button>
                </motion.div>
              ))
          )}
        </div>
        {displayedProductCount < filteredProducts.length && (
          <button
            className="see-more-btn flex items-center justify-center gap-4"
            onClick={loadMoreProducts}
          >
            See More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
