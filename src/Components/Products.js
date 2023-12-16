import React, { Fragment, useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ProductsContext } from "../Global/ProductsContext";
import { CartContext } from "../Global/CartContext";
import { Loader } from "./Loader";
import { useAuth } from "../Global/AuthContext";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProductNotFound from "../images/productnotfound.png";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];
const filters = [
  {
    id: "productCity",
    name: "Product City",
    options: [
      { value: "Abu Dhabi", label: "Abu Dhabi", checked: false },
      { value: "Sharjah", label: "Sharjah", checked: false },
      { value: "Dubai", label: "Dubai", checked: false },
      { value: "Ajman", label: "Ajman", checked: false },
      { value: "Al Ain", label: "Al Ain", checked: false },
      { value: "Riyadh", label: "Riyadh", checked: false },
      { value: "Jeddah", label: "Jeddah", checked: false },
      { value: "Doha", label: "Doha", checked: false },
    ],
  },
  {
    id: "productMake",
    name: "Product Make",
    options: [
      { value: "Toyota", label: "Toyota", checked: false },
      { value: "Mitsubishi", label: "Mitsubishi", checked: false },
      { value: "Nissan", label: "Nissan", checked: false },
      { value: "Hyundai", label: "Hyundai", checked: false },
      { value: "Ford", label: "Ford", checked: false },
      { value: "Honda", label: "Honda", checked: false },
      { value: "Chevrolet", label: "Chevrolet", checked: false },
      { value: "Volkswagen", label: "Volkswagen", checked: false },
      { value: "Jeep", label: "Jeep", checked: false },
    ],
  },
  {
    id: "productType",
    name: "Product Type",
    options: [
      { value: "SUV", label: "SUV", checked: false },
      { value: "Sedan", label: "Sedan", checked: false },
      { value: "Hatchback", label: "Hatchback", checked: false },
      { value: "Truck", label: "Truck", checked: false },
      { value: "Coupe", label: "Coupe", checked: false },
      { value: "Convertible", label: "Convertible", checked: false },
      { value: "Luxury", label: "Luxury", checked: false },
    ],
  },
  {
    id: "productRating",
    name: "Product Rating",
    options: [
      { value: "1", label: "1", checked: false },
      { value: "2", label: "2", checked: false },
      { value: "3", label: "3", checked: false },
      { value: "4", label: "4", checked: false },
      { value: "5", label: "5", checked: false },
    ],
  },
  // {
  //   id: "productPrice",
  //   name: "Product Price",
  //   options: [
  //     { value: "10000", label: "10000", checked: false },
  //     { value: "20000", label: "20000", checked: false },
  //     { value: "30000", label: "30000", checked: false },
  //     { value: "40000", label: "40000", checked: false },
  //     { value: "50000", label: "50000", checked: false },
  //   ],
  // },
  // {
  //   id: "color",
  //   name: "Color",
  //   options: [
  //     { value: "white", label: "White", checked: false },
  //     { value: "beige", label: "Beige", checked: false },
  //     { value: "blue", label: "Blue", checked: true },
  //     { value: "brown", label: "Brown", checked: false },
  //     { value: "green", label: "Green", checked: false },
  //     { value: "purple", label: "Purple", checked: false },
  //   ],
  // },
  // {
  //   id: "category",
  //   name: "Category",
  //   options: [
  //     { value: "new-arrivals", label: "New Arrivals", checked: false },
  //     { value: "sale", label: "Sale", checked: false },
  //     { value: "travel", label: "Travel", checked: true },
  //     { value: "organization", label: "Organization", checked: false },
  //     { value: "accessories", label: "Accessories", checked: false },
  //   ],
  // },
  // {
  //   id: "size",
  //   name: "Size",
  //   options: [
  //     { value: "2l", label: "2L", checked: false },
  //     { value: "6l", label: "6L", checked: false },
  //     { value: "12l", label: "12L", checked: false },
  //     { value: "18l", label: "18L", checked: false },
  //     { value: "20l", label: "20L", checked: false },
  //     { value: "40l", label: "40L", checked: true },
  //   ],
  // },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Products = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { products } = useContext(ProductsContext);
  const { dispatch } = useContext(CartContext);
  const { currentUser, login } = useAuth();
  const history = useHistory();
  const [selectedFilters, setSelectedFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedProductCount, setDisplayedProductCount] = useState(4);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleFilterChange = (filter, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: value,
    }));
  };

  const handlePriceChange = (minPrice, maxPrice) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      productPrice: {
        min: minPrice,
        max: maxPrice,
      },
    }));
  };

  const resetFilters = () => {
    setSelectedFilters({});
    setSearchTerm("");
  };

  const filteredProducts = products.filter((product) => {
    const productNameLower = product.ProductName.toLowerCase();
    const filterMatches =
      Object.keys(selectedFilters).length === 0 ||
      Object.entries(selectedFilters).every(([filter, value]) => {
        if (Array.isArray(value)) {
          return value.length === 0 || value.includes(product[filter]);
        } else {
          return product[filter] === value;
        }
      });

    return filterMatches && productNameLower.includes(searchTerm.toLowerCase());
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
      <div className="products-wrapper py-20">
        <div className="flex md:flex-row flex-col gap-10 md:gap-0 items-center md:items-start justify-center md:justify-between w-full">
          <div className=" md:w-1/3 ">
            <div className="bg-white shadow-lg rounded-full md:rounded-3xl">
              <div className="">
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-40 md:hidden"
                    onClose={setMobileFiltersOpen}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="transition-opacity ease-linear duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity ease-linear duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                      <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                      >
                        <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                          <div className="flex items-center justify-between px-4">
                            <h2 className="text-lg font-medium text-gray-900">
                              Filters
                            </h2>
                            <button
                              type="button"
                              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                              onClick={() => setMobileFiltersOpen(false)}
                            >
                              <span className="sr-only">Close menu</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>

                          <form className="mt-4 border-t  border-gray-200">
                            {filters.map((section) => (
                              <Disclosure
                                as="div"
                                key={section.id}
                                className="border-y border-gray-200 px-4 py-6"
                              >
                                {({ open }) => (
                                  <>
                                    <h3 className="-mx-2 -my-3 flow-root">
                                      <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                        <span className="font-medium text-gray-900">
                                          {section.name}
                                        </span>
                                        <span className="ml-6 flex items-center">
                                          {open ? (
                                            <MinusIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          ) : (
                                            <PlusIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          )}
                                        </span>
                                      </Disclosure.Button>
                                    </h3>
                                    <Disclosure.Panel className="pt-6">
                                      <div className="space-y-6">
                                        {section.options.map(
                                          (option, optionIdx) => (
                                            <div
                                              key={option.value}
                                              className="flex items-center"
                                            >
                                              <input
                                                id={`filter-${section.id}-${optionIdx}`}
                                                name={`${section.id}[]`}
                                                defaultValue={option.value}
                                                type="checkbox"
                                                checked={selectedFilters[
                                                  section.id
                                                ]?.includes(option.value)}
                                                onChange={() =>
                                                  handleFilterChange(
                                                    section.id,
                                                    option.value
                                                  )
                                                }
                                                className="h-4 w-4 rounded checked:!bg-lightOrange checked:!text-white  border-gray-300 ring-gray-300  focus:ring-0 focus:border-0 focus:outline-none !bg-transparent !text-black !focus:ring-lightOrange"
                                              />
                                              <label
                                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                className="ml-3 min-w-0 flex-1 text-gray-500"
                                              >
                                                {option.label}
                                              </label>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </Disclosure.Panel>
                                  </>
                                )}
                              </Disclosure>
                            ))}

                            <div className="flex mt-4 flex-col gap-4 items-start justify-center px-4 ">
                              <label className="font-medium text-3xl text-gray-900">
                                Price Range
                              </label>
                              <input
                                type="range"
                                min="0"
                                max="50000"
                                step="1000"
                                value={selectedFilters.productPrice?.min || 0}
                                onChange={(e) =>
                                  handlePriceChange(
                                    parseInt(e.target.value),
                                    selectedFilters.productPrice?.max || 50000
                                  )
                                }
                                className="w-full "
                              />
                              <span className="ml-2 text-gray-600">
                                ${selectedFilters.productPrice?.min || 0} - $
                                {selectedFilters.productPrice?.max || 50000}
                              </span>
                            </div>
                          </form>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </Dialog>
                </Transition.Root>

                <main className="px-4">
                  <div className="lg:hidden flex items-center justify-start px-6 py-3">
                    <div className="flex items-center">
                      <button
                        type="button"
                        className=" text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden flex items-center justify-center gap-4"
                        onClick={() => setMobileFiltersOpen(true)}
                      >
                        <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="text-gray-400">Filters</span>
                      </button>
                    </div>
                  </div>

                  <section
                    aria-labelledby="products-heading"
                    className="py-10  hidden lg:block"
                  >
                    <div className="">
                      <form className="">
                        {filters.map((section) => (
                          <Disclosure
                            as="div"
                            key={section.id}
                            className="border-b border-gray-200 py-6 "
                          >
                            {({ open }) => (
                              <>
                                <h3 className="-my-3 flow-root">
                                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-gray-900">
                                      {section.name}
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <MinusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <PlusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                  <div className="space-y-4">
                                    {section.options.map(
                                      (option, optionIdx) => (
                                        <div
                                          key={option.value}
                                          className="flex items-center"
                                        >
                                          <input
                                            id={`filter-${section.id}-${optionIdx}`}
                                            name={`${section.id}[]`}
                                            defaultValue={option.value}
                                            type="checkbox"
                                            checked={selectedFilters[
                                              section.id
                                            ]?.includes(option.value)}
                                            onChange={() =>
                                              handleFilterChange(
                                                section.id,
                                                option.value
                                              )
                                            }
                                            className="h-4 w-4 rounded checked:!bg-lightOrange checked:!text-white  border-gray-300 ring-gray-300  focus:ring-0 focus:border-0 focus:outline-none !bg-transparent !text-black !focus:ring-lightOrange"
                                          />

                                          <label
                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                            className="ml-3 text-sm text-gray-600"
                                          >
                                            {option.label}
                                          </label>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}

                        <div className="flex mt-4 flex-col gap-4 items-start justify-center">
                          <label className="font-medium text-sm text-gray-900">
                            Price Range
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="50000"
                            step="1000"
                            value={selectedFilters.productPrice?.min || 0}
                            onChange={(e) =>
                              handlePriceChange(
                                parseInt(e.target.value),
                                selectedFilters.productPrice?.max || 50000
                              )
                            }
                            className="w-full "
                          />
                          <span className="ml-2 text-gray-600">
                            ${selectedFilters.productPrice?.min || 0} - $
                            {selectedFilters.productPrice?.max || 50000}
                          </span>
                        </div>
                      </form>
                    </div>
                  </section>
                </main>
              </div>
            </div>
          </div>

          <div className="products-container w-full">
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
                          <div className="font-medium">
                            {product.ProductCity}
                          </div>
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

                    <div className="flex items-center justify-center w-full md:flex-row flex-col">
                      <div className="w-full text-lg">
                        $ {product.ProductPrice}.00
                      </div>
                      <button
                        className="login-btn !p-3 !font-light !text-sm flex items-center justify-center gap-2"
                        onClick={() => addToCart(product)}
                      >
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                          </svg>
                        </div>
                        <div>Add to wishlist</div>
                      </button>
                    </div>
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
    </div>
  );
};
