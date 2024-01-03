import React, { useState, useEffect } from "react";
import { auth, db } from "../Config/Config";
import { Link } from "react-router-dom";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [isDealer, setIsDealer] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Check the user role from the database
        db.collection("SignedUpUsersData")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            const userData = snapshot.data();
            if (userData && userData.Role === "dealer") {
              setIsDealer(true);
            }
          });

        // Fetch all products
        db.collection("Products")
          .get()
          .then((querySnapshot) => {
            const productsData = [];
            querySnapshot.forEach((doc) => {
              productsData.push({ id: doc.id, ...doc.data() });
            });
            setProducts(productsData);
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
          });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {isDealer && (
          <div className="flex justify-between mb-4">
            <Link
              to="/add-product"
              className="px-4 py-2 bg-green-500 text-white rounded focus:outline-none focus:shadow-outline"
            >
              Add Product
            </Link>
            <Link
              to="/edit-products"
              className="px-4 py-2 bg-blue-500 text-white rounded focus:outline-none focus:shadow-outline"
            >
              Edit Products
            </Link>
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-800 mb-4">All Products</h2>

        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id} className="mb-2">
                <strong>{product.name}</strong> - ${product.price}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="return-to-home w-full flex items-center justify-center mt-10">
        <Link
          to="/"
          className="text-[#17191b]/50 hover:text-[#17191b] duration-200 transition-all no-underline decoration-white	 underline-offset-4 py-3"
        >
          Return to Home page
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
