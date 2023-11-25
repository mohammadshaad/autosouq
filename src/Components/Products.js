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

  const resetFilters = () => {
    setSelectedFilter("");
    setSearchTerm("");
  };

  return (
    <div className="products-main-container">
      <div className="products-wrapper">
        <h1>Products</h1>
        {/* <div className="filters">
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
        </div> */}
        <div className="flex flex-wrap w-full  items-start justify-center md:justify-start gap-4">
          <div className="w-full">
            <input
              type="text"
              placeholder="Search products"
              onChange={(e) => setSearchTerm(e.target.value)}
              className=" md:pr-40 pl-4 text-black focus:text-black py-2 border  border-gray-300 rounded-full w-full focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center text-xs md:text-sm justify-start gap-4 ">
            <select
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-2 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-lightOrange bg-transparent"
            >
              <option value="">Make</option>
              <option value="Toyota">Toyota</option>
              <option value="Mitsubishi">Mitsubishi</option>
              <option value="Nissan">Nissan</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Ford">Ford</option>
              <option value="Honda">Honda</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="Volkswagen">Volkswagen</option>
              <option value="Jeep">Jeep</option>
              <option value="Toyota">Toyota</option>
              <option value="Land Rover">Land Rover</option>
              <option value="Audi">Audi</option>
              <option value="Ferrari">Ferrari</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
            </select>
            <select
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-2 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-lightOrange bg-transparent"
            >
              <option value="">Type</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Truck">Truck</option>
              <option value="Coupe">Coupe</option>
              <option value="Convertible">Convertible</option>
              <option value="Luxury">Luxury</option>
            </select>
            <select
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-2 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-lightOrange bg-transparent"
            >
              <option value="">City</option>
              <option value="Abu Dhabi">Abu Dhabi</option>
              <option value="Sharjah">Sharjah</option>
              <option value="Dubai">Dubai</option>
              <option value="Ajman">Ajman</option>
              <option value="Al Ain">Al Ain</option>
              <option value="Riyadh">Riyadh</option>
              <option value="Jeddah">Jeddah</option>
              <option value="Doha">Doha</option>
              <option value="Muscat">Muscat</option>
              <option value="Kuwait City">Kuwait City</option>
              <option value="Manama">Manama</option>
            </select>

            <button
              className="px-2 py-2  login"
              onClick={resetFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>
        <div className="products-container mt-8">
          {filteredProducts.length === 0 ? (
            <div className="text-gray-400 font-light text-2xl flex-col flex items-center justify-center">
              <img src={ProductNotFound} alt="" className="w-96 mx-auto" />
              No cars to display.
            </div>
          ) : (
            filteredProducts
              .slice(0, displayedProductCount)
              .map((product, index) => (
                <motion.div
                  className="product-card "
                  key={product.ProductID}
                  ref={index === 0 ? ref : null}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="product-img">
                    <img src={product.ProductImg} alt="not found" />
                  </div>
                  <div className="flex flex-col gap-4 px-2 items-start justify-center w-full py-4">
                    <div className="flex flex-col items-start justify-center ">
                      <div className="product-name flex items-center justify-start w-full text-3xl font-bold">
                        {product.ProductName}
                      </div>
                      <div className="font-medium text-lg text-gray-500">
                        {product.ProductType}
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center justify-center">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 text-black"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                            />
                          </svg>
                        </div>
                        <div className="font-medium">{product.ProductCity}</div>
                      </div>

                      <div className="flex items-center justify-center gap-1">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 text-black"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                        </div>

                        <div>
                          {product.ProductRating === 0 ? (
                            <div className="flex items-center justify-center gap-1">
                              <div className="font-medium">No</div>
                              <div className="font-medium">Ratings</div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-1">
                              <div className="font-medium">
                                {product.ProductRating}
                              </div>
                              <div className="font-medium">Ratings</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="product-price">
                    Rs {product.ProductPrice}.00
                  </div> */}

                  <button
                    className="login-btn !text-lg"
                    onClick={() => addToCart(product)}
                  >
                    $ {product.ProductPrice}.00
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
