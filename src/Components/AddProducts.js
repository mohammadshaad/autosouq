import React, { useState } from "react";
import { storage, db } from "../Config/Config";
import { Link } from "react-router-dom";

export const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState(null);
  const [accidentHistory, setAccidentHistory] = useState("");
  const [contact, setContact] = useState("");
  const [features, setFeatures] = useState("");
  const [productCity, setProductCity] = useState("");
  const [productMake, setProductMake] = useState("");
  const [productMileage, setProductMileage] = useState("");
  const [productType, setProductType] = useState("");
  const [productYear, setProductYear] = useState(0);
  const [regionalSpecs, setRegionalSpecs] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [serviceHistory, setServiceHistory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const types = ["image/png", "image/jpeg"]; // image types

  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setError("");
    } else {
      setProductImg(null);
      setError("Please select a valid image type (jpg or png)");
    }
  };

  const addProduct = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadTask = storage
        .ref(`car_images/${productImg.name}`)
        .put(productImg);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (err) => {
          setLoading(false);
          setError(err.message);
        },
        () => {
          storage
            .ref("car_images")
            .child(productImg.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("Products")
                .add({
                  ProductName: productName,
                  ProductPrice: Number(productPrice),
                  ProductImg: url,
                  AccidentHistory: accidentHistory,
                  Contact: contact,
                  Features: features,
                  ProductCity: productCity,
                  ProductMake: productMake,
                  ProductMileage: productMileage,
                  ProductType: productType,
                  ProductYear: Number(productYear),
                  RegionalSpecs: regionalSpecs,
                  SeatingCapacity: seatingCapacity,
                  ServiceHistory: serviceHistory,
                })
                .then(() => {
                  setLoading(false);
                  setAlert({ type: "success", message: "Upload successful!" });

                  setProductName("");
                  setProductPrice(0);
                  setProductImg("");
                  setAccidentHistory("");
                  setContact("");
                  setFeatures("");
                  setProductCity("");
                  setProductMake("");
                  setProductMileage("");
                  setProductType("");
                  setProductYear(0);
                  setRegionalSpecs("");
                  setSeatingCapacity("");
                  setServiceHistory("");
                  setError("");
                  document.getElementById("file").value = "";
                })
                .catch((err) => {
                  setLoading(false);
                  setError(err.message);
                });
            });
        }
      );
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="container p-10 w-full">
      <br />
      <div className=" return-to-home w-full flex items-center justify-between px-4 py-4">
        <div className="group flex items-center justify-center">
          <Link
            to="/dashboard"
            className="text-[#17191b]/50 group-hover:text-[#17191b] duration-200 transition-all no-underline decoration-white	 underline-offset-4 py-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 inline-block hover:text-[#17191b] duration-200 transition-all"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Dashboard
          </Link>
        </div>
        {/* <div className="group flex items-center justify-center">
          <Link
            to="/addproducts"
            className="text-[#17191b]/50 group-hover:text-[#17191b] duration-200 transition-all no-underline decoration-white	 underline-offset-4 py-3"
          >
            Edit Product
          </Link>
        </div> */}
      </div>
      <h2>ADD PRODUCTS</h2>
      <hr />
      <form autoComplete="off" className="form-group" onSubmit={addProduct}>
        {/* Existing form fields */}
        <label htmlFor="product-name">Product Name</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
        />
        {/* Add input fields for additional fields */}
        <label htmlFor="accident-history">Accident History</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setAccidentHistory(e.target.value)}
          value={accidentHistory}
        />

        <br />
        <label htmlFor="product-img">Product Image</label>
        <input
          type="file"
          className="form-control"
          id="file"
          required
          onChange={productImgHandler}
        />
        <br />
        <label htmlFor="product-price">Product Price</label>
        <input
          type="number"
          className="form-control"
          required
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
        />
        <br />
        <label htmlFor="contact">Contact</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setContact(e.target.value)}
          value={contact}
        />
        <br />
        <label htmlFor="features">Features</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setFeatures(e.target.value)}
          value={features}
        />
        <br />
        <label htmlFor="product-city">Product City</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setProductCity(e.target.value)}
          value={productCity}
        />

        <br />
        <label htmlFor="product-make">Product Make</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setProductMake(e.target.value)}
          value={productMake}
        />
        <br />
        <label htmlFor="product-mileage">Product Mileage</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setProductMileage(e.target.value)}
          value={productMileage}
        />
        <br />
        <label htmlFor="product-type">Product Type</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setProductType(e.target.value)}
          value={productType}
        />
        <br />
        <label htmlFor="product-year">Product Year</label>
        <input
          type="number"
          className="form-control"
          onChange={(e) => setProductYear(e.target.value)}
          value={productYear}
        />
        <br />
        <label htmlFor="regional-specs">Regional Specs</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setRegionalSpecs(e.target.value)}
          value={regionalSpecs}
        />
        <br />
        <label htmlFor="seating-capacity">Seating Capacity</label>

        <input
          type="text"
          className="form-control"
          onChange={(e) => setSeatingCapacity(e.target.value)}
          value={seatingCapacity}
        />
        <br />
        <label htmlFor="service-history">Service History</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setServiceHistory(e.target.value)}
          value={serviceHistory}
        />
        <br />
        <button type="submit" className="login-btn">
          SUBMIT
        </button>
      </form>
      {loading && <div className="loader">Loading...</div>}
      {error && <span className="error-msg">{error}</span>}
      {alert.type === "success" && (
        <div className="alert alert-success" role="alert">
          {alert.message}
        </div>
      )}
    </div>
  );
};
