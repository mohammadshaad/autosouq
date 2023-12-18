import React, { useState } from "react";
import { storage, db } from "../Config/Config";

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
      (err) => setError(err.message),
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
              .catch((err) => setError(err.message));
          });
      }
    );
  };

  return (
    <div className="container p-10">
      <br />
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
      {error && <span className="error-msg">{error}</span>}
    </div>
  );
};
