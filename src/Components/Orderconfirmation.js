import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderDoc = await getDoc(doc(db, "orders", orderId));
        if (orderDoc.exists()) {
          setOrder(orderDoc.data());
        } else {
          setError("Order not found.");
        }
      } catch (err) {
        setError("Failed to load order: " + err.message);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Order Confirmation</h2>
      <p>Thank you for your purchase!</p>
      <h3>Order ID: {orderId}</h3>
      <h4>Order Details:</h4>
      {order.items.map((item, index) => (
        <div key={index}>
          <p>
            {item.name} x {item.quantity} - £{item.price.toFixed(2)}
          </p>
        </div>
      ))}
      <h4>Total: £{order.total.toFixed(2)}</h4>
      <h4>Shipping Address:</h4>
      <p>{order.address.line1}</p>
      <p>{order.address.city}, {order.address.state} {order.address.postalCode}</p>
      <p>{order.address.country}</p>
    </div>
  );
};

export default OrderConfirmation;