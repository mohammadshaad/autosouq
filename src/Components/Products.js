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
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
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
        <div className="flex md:flex-row flex-col items-center md:items-start justify-center md:justify-between w-full">
          <div className="w-full md:w-1/2 ">
            <div className="bg-white ">
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

                          {/* Filters */}
                          <form className="mt-4 border-t border-gray-200">
                            <h3 className="sr-only">Categories</h3>
                            <ul
                              role="list"
                              className="px-2 py-3 font-medium text-gray-900"
                            >
                              {subCategories.map((category) => (
                                <li key={category.name}>
                                  <a
                                    href={category.href}
                                    className="block px-2 py-3"
                                  >
                                    {category.name}
                                  </a>
                                </li>
                              ))}
                            </ul>

                            {filters.map((section) => (
                              <Disclosure
                                as="div"
                                key={section.id}
                                className="border-t border-gray-200 px-4 py-6"
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
                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                name={`${section.id}[]`}
                                                defaultValue={option.value}
                                                type="checkbox"
                                                defaultChecked={option.checked}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                          </form>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </Dialog>
                </Transition.Root>

                <main className="px-4">
                  <div className="flex items-baseline justify-between  pb-6 pt-24 md:pt-0 md:pb-0">
                    {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                      New Arrivals
                    </h1> */}

                    <div className="flex items-center">
                      {/* <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                            Sort
                            <ChevronDownIcon
                              className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              {sortOptions.map((option) => (
                                <Menu.Item key={option.name}>
                                  {({ active }) => (
                                    <a
                                      href={option.href}
                                      className={classNames(
                                        option.current
                                          ? "font-medium text-gray-900"
                                          : "text-gray-500",
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      {option.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu> */}

                      {/* <button
                        type="button"
                        className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                      >
                        <span className="sr-only">View grid</span>
                        <Squares2X2Icon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button> */}
                      <button
                        type="button"
                        className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                        onClick={() => setMobileFiltersOpen(true)}
                      >
                        <span className="sr-only">Filters</span>
                        <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <section
                    aria-labelledby="products-heading"
                    className="pb-24 pt-6"
                  >
                    <h2 id="products-heading" className="sr-only">
                      Products
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2  ">
                      {/* Filters */}
                      <form className="hidden lg:block">
                        {/* <h3 className="sr-only">Categories</h3>
                        <ul
                          role="list"
                          className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                        >
                          {subCategories.map((category) => (
                            <li key={category.name}>
                              <a href={category.href}>{category.name}</a>
                            </li>
                          ))}
                        </ul> */}

                        {filters.map((section) => (
                          <Disclosure
                            as="div"
                            key={section.id}
                            className="border-b border-gray-200 py-6"
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
                                            defaultChecked={option.checked}
                                            className="h-4 w-4 rounded focus:bg-transparent caret-lightOrange border-gray-300 text-lightOrange focus:ring-lightOrange"
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
                      </form>
                    </div>
                  </section>
                </main>
              </div>
            </div>
          </div>
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
          {/* <div className="flex flex-wrap w-full  items-start justify-center md:justify-start gap-4">
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

              <button className="px-2 py-2  login" onClick={resetFilters}>
                Clear Filters
              </button>
            </div>
          </div> */}
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
