import React, { useState, useEffect } from "react";
import { realtimeDb } from "../Config/Config";
import { Card, Typography } from "@material-tailwind/react";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await realtimeDb.ref("orders").once("value");
        const data = response.val();

        if (data) {
          const ordersArray = Object.keys(data).map((orderId) => ({
            orderId,
            ...data[orderId],
          }));
          setOrders(ordersArray);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8 flex items-center justify-items-center flex-col">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Order List</h2>

        {orders.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 shadow-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Payment ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Mobile</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-10 border-b">Products</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td className="py-2 px-4 border-b">{order.orderId}</td>
                  <td className="py-2 px-4 border-b">{order.paymentId}</td>
                  <td className="py-2 px-4 border-b">
                    {order.name.currentUserName}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {order.mobile.currentUserMobile}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {order.email.currentUserEmail}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {order.address.currentUserAddress}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <ul>
                      {order.products?.map((product) => (
                        <li key={product.id}>
                          {product.name} - {product.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
