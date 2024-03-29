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

const filters = [
  {
    id: "ProductCity",
    name: "City",
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
    id: "ProductMake",
    name: "Make",
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
      { value: "Kia", label: "Kia", checked: false },
      { value: "Jetour", label: "Jetour", checked: false },
      { value: "Lotus", label: "Lotus", checked: false },
      { value: "Land Rover", label: "Land Rover", checked: false },
      { value: "Lincoln", label: "Lincoln", checked: false },
      { value: "Lexus", label: "Lexus", checked: false },
      { value: "Maxus", label: "Maxus", checked: false },
      { value: "Maserati", label: "Maserati", checked: false },
      { value: "Mazda", label: "Mazda", checked: false },
      { value: "Mclaren", label: "Mclaren", checked: false },
      { value: "Mini", label: "Mini", checked: false },
      { value: "Opel", label: "Opel", checked: false },
      { value: "Dodge", label: "Dodge", checked: false },
      { value: "Devel", label: "Devel", checked: false },
      { value: "Changan", label: "Changan", checked: false },
      { value: "Chrysler", label: "Chrysler", checked: false },
      { value: "Aston Martin", label: "Aston Martin", checked: false },
      { value: "Cadillac", label: "Cadillac", checked: false },
      { value: "Borgward", label: "Borgward", checked: false },
      { value: "BYD", label: "BYD", checked: false },
      { value: "Abarth", label: "Abarth", checked: false },
      { value: "Alfa Romeo", label: "Alfa Romeo", checked: false },
      { value: "GMC", label: "GMC", checked: false },
      { value: "Genesis", label: "Genesis", checked: false },
      { value: "Isuzu", label: "Isuzu", checked: false },
      { value: "Infinti", label: "Infinti", checked: false },
      { value: "Haval", label: "Haval", checked: false },
      { value: "Foton", label: "Foton", checked: false },
      { value: "Peugeot", label: "Peugeot", checked: false },
    ],
  },
  {
    id: "ProductType",
    name: "Type",
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
    id: "RegionalSpecs",
    name: "Regional Specs",
    options: [
      { value: "GCC", label: "GCC", checked: false },
      { value: "American", label: "American", checked: false },
      { value: "Canadian", label: "Canadian", checked: false },
      { value: "European", label: "European", checked: false },
      { value: "Chinese", label: "Chinese", checked: false },
      { value: "Japanese", label: "Japanese", checked: false },
    ],
  },
  {
    id: "SeatingCapacity",
    name: "Seating Capacity",
    options: [
      { value: "2", label: "2", checked: false },
      { value: "4", label: "4", checked: false },
      { value: "5", label: "5", checked: false },
      { value: "6", label: "6", checked: false },
      { value: "7", label: "7", checked: false },
    ],
  },
  {
    id: "AccidentHistory",
    name: "Accident History",
    options: [{ value: "No Accidents", label: "no accidents", checked: false }],
  },
  {
    id: "ServiceHistory",
    name: "Service History",
    options: [
      { value: "Serviced", label: "Yes", checked: false },
      { value: "Not Serviced", label: "No", checked: false },
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

  const handleMileageChange = (minMileage, maxMileage) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      productMileage: {
        min: minMileage,
        max: maxMileage,
      },
    }));
  };

  const removeFilter = (filter) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      delete updatedFilters[filter];
      return updatedFilters;
    });
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
    <div className="products-main-container !z-50">
      <div className="z-50 products-wrapper py-20">
        <div className="z-50 flex md:flex-row flex-col gap-10 md:gap-0 items-start md:items-start justify-center md:justify-between w-full">
          <div className="z-50 w-full px-14 lg:px-0 md:w-1/3 ">
            <div className="z-50 bg-gray-900   shadow-lg rounded-full md:rounded-3xl">
              <div className="z-50">
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-50 md:hidden"
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
                        <Dialog.Panel className="!z-50 relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-gray-900 py-4 pb-12 shadow-xl">
                          <div className="flex items-center justify-between px-4 z-50">
                            <h2 className="text-lg font-medium text-gray-200">
                              Filters
                            </h2>
                            <button
                              type="button"
                              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 focus:ring-0 focus:outline-none outline-none ring-0"
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
                            <div className="p-4">
                              <label htmlFor="search" className="sr-only">
                                Search
                              </label>
                              <div className="relative rounded-full shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4 text-gray-500"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                    />
                                  </svg>
                                </div>
                                <input
                                  type="search"
                                  name="search"
                                  id="search"
                                  className="focus:ring-lightOrange focus:border-lightOrange block w-full pl-10 sm:text-sm border-gray-300 rounded-full"
                                  placeholder="Search"
                                  value={searchTerm}
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            {filters.map((section) => (
                              <Disclosure
                                as="div"
                                key={section.id}
                                className="border-y-[0.1px] border-gray-200 px-4 py-6"
                              >
                                {({ open }) => (
                                  <>
                                    <h3 className="-mx-2 -my-3 flow-root">
                                      <Disclosure.Button className="flex w-full items-center justify-between bg-gray-900 px-2 py-3 text-gray-400 hover:text-gray-500 focus:ring-0 focus:outline-none outline-none ring-0">
                                        <span className="font-medium text-gray-200">
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
                                                className="h-4 w-4 rounded checked:!bg-lightOrange checked:!text-white  border-gray-300 ring-gray-300  focus:ring-0 focus:border-0 focus:outline-none !bg-gray-900 !text-black !focus:ring-lightOrange"
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
                              <label className="font-medium text-3xl text-gray-200">
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
                                className="w-full h-2 accent-lightOrange rounded-md"
                              />
                              <span className="ml-2 text-gray-400">
                                {selectedFilters.productPrice &&
                                  typeof selectedFilters.productPrice ===
                                    "object" && (
                                    <>
                                      {selectedFilters.productPrice.min || 0} -
                                      AED
                                      {selectedFilters.productPrice.max ||
                                        50000}
                                    </>
                                  )}
                              </span>
                            </div>

                            <div className="flex mt-4 flex-col gap-4 items-start justify-center px-4 ">
                              <label className="font-medium text-3xl text-gray-200">
                                Mileage Range
                              </label>
                              <input
                                type="range"
                                min="0"
                                max="50000"
                                step="1000"
                                value={selectedFilters.productMileage?.min || 0}
                                onChange={(e) =>
                                  handleMileageChange(
                                    parseInt(e.target.value),
                                    selectedFilters.productMileage?.max || 50000
                                  )
                                }
                                className="w-full h-2 accent-lightOrange rounded-md"
                              />
                              <span className="ml-2 text-gray-400">
                                {selectedFilters.productMileage &&
                                  typeof selectedFilters.productMileage ===
                                    "object" && (
                                    <>
                                      {selectedFilters.productMileage.min || 0}{" "}
                                      -{" "}
                                      {selectedFilters.productMileage.max ||
                                        300000}
                                    </>
                                  )}
                              </span>
                            </div>
                          </form>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </Dialog>
                </Transition.Root>

                <main className="px-4 w-full">
                  <div className="lg:hidden flex items-center justify-start w-full px-6 py-3">
                    <div className="flex items-center ">
                      <button
                        type="button"
                        className=" text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden flex items-center justify-center gap-4 focus:ring-0 focus:outline-none outline-none ring-0"
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
                        <div>
                          <label htmlFor="search" className="sr-only">
                            Search
                          </label>
                          <div className="relative rounded-full shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 text-gray-500"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                              </svg>
                            </div>
                            <input
                              type="search"
                              name="search"
                              id="search"
                              className="focus:ring-lightOrange focus:text-gray-400 focus:border-lightOrange block w-full pl-10 sm:text-sm border-gray-300 rounded-full"
                              placeholder="Search"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                        </div>

                        {filters.map((section) => (
                          <Disclosure
                            as="div"
                            key={section.id}
                            className="border-b-[0.2px] focus:ring-0 focus:outline-none outline-none ring-0 border-gray-200 py-6 "
                          >
                            {({ open }) => (
                              <>
                                <h3 className="-my-3 flow-root">
                                  <Disclosure.Button className="flex w-full items-center justify-between bg-transparent py-3 text-sm text-gray-400 hover:text-gray-500 focus:ring-0 focus:outline-none outline-none ring-0">
                                    <span className="font-medium text-gray-200">
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
                                            className="ml-3 text-sm text-gray-400"
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
                          <label className="font-medium text-sm text-gray-200">
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
                            className="w-full h-2 accent-lightOrange rounded-md  "
                          />
                          <span className="ml-2 text-gray-400">
                            {selectedFilters.productPrice &&
                              typeof selectedFilters.productPrice ===
                                "object" && (
                                <>
                                  {selectedFilters.productPrice.min || 0} - AED
                                  {selectedFilters.productPrice.max || 50000}
                                </>
                              )}
                          </span>
                        </div>

                        <div className="flex mt-4 flex-col gap-4 items-start justify-center">
                          <label className="font-medium text-sm text-gray-200">
                            Mileage Range
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="50000"
                            step="1000"
                            value={selectedFilters.productMileage?.min || 0}
                            onChange={(e) =>
                              handleMileageChange(
                                parseInt(e.target.value),
                                selectedFilters.productMileage?.max || 50000
                              )
                            }
                            className="w-full h-2 accent-lightOrange rounded-md"
                          />
                          <span className="ml-2 text-gray-400">
                            {selectedFilters.productMileage &&
                              typeof selectedFilters.productMileage ===
                                "object" && (
                                <>
                                  {selectedFilters.productMileage.min || 0} -{" "}
                                  {selectedFilters.productMileage.max || 300000}
                                </>
                              )}
                          </span>
                        </div>
                      </form>
                    </div>
                  </section>
                </main>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center gap-4 w-full">
            <div className="applied-filters-container px-5 lg:px-10">
              {Object.keys(selectedFilters).length > 0 && (
                <div className="applied-filters">
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(selectedFilters).map(([filter, value]) => (
                      <div key={filter} className="flex items-center">
                        <span className="bg-lightOrange text-black px-3 py-1 font-medium rounded-full">
                          {Array.isArray(value) ? value.join(", ") : value}
                        </span>
                        <button
                          className="ml-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                          onClick={() => removeFilter(filter)}
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    className="clear-filters-btn text-sm mt-4 text-gray-400 hover:text-gray-500 focus:outline-none flex items-center justify-center gap-1"
                    onClick={resetFilters}
                  >
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

            <div className="products-container w-full">
              {filteredProducts.length === 0 ? (
                <div className="text-gray-400 font-light text-2xl flex-col flex items-center justify-center">
                  <img src={ProductNotFound} alt="" className="w-96 mx-auto" />
                  Loading...
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
                      <div className="product-img flex-shrink-0 flex-grow-0 ">
                        <img
                          src={product.ProductImg}
                          alt="not found"
                          className="flex flex-shrink-0 flex-grow-0"
                        />
                      </div>
                      <div className="flex flex-col gap-4 px-2 items-start justify-center w-full py-4">
                        <div className="flex flex-col items-start justify-center ">
                          <div className="product-name flex items-center justify-start w-full text-2xl font-bold flex-shrink-0">
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
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="font-medium">
                              {product.ProductCity}
                            </div>
                          </div>

                          <div className="flex items-center justify-center gap-1">
                            <div>
                              <Squares2X2Icon
                                className="w-4 text-black"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="font-medium">
                              {product.RegionalSpecs.length ? (
                                product.RegionalSpecs
                              ) : (
                                <span className="text-gray-400 italic">
                                  No Specs Found
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center justify-start gap-1">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                                <path
                                  fillRule="evenodd"
                                  d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="font-medium">
                              {product.ProductYear}
                            </div>
                          </div>

                          <div className="flex items-center justify-start gap-1">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="font-medium">{product.Contact}</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between w-full">
                          <div className="flex flex-col items-start justify-center gap-1">
                            <span className="text-gray-400 text-xs">
                              Mileage
                            </span>{" "}
                            <div className="flex items-center justify-start gap-1">
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-4 h-4 text-lightOrange"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
                                    clipRule="evenodd"
                                  />
                                  <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.414-1.36a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.97 17.03a.75.75 0 010-1.06z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <div className="font-medium">
                                {product.ProductMileage} KM
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center w-full md:flex-row flex-col">
                        <div className="w-full text-[16px]">
                          {product.ProductPrice}.00 AED
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
              <div className="w-full flex items-center justify-center">
                <button
                  className="login flex items-center justify-center gap-4"
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
