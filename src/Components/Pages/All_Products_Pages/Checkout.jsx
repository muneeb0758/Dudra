import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { db } from "../../firebase"; // Removed unused imports for clarity
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { clearCart } from "../../Redux/cart/cart.actions";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Corrected access to cartItems and userId based on Redux state structure
  const cartItems = useSelector((state) => state.cartManager.products) || [];
  const userId = useSelector((state) => state.authManager.userdata?.uid);
  const [address, setAddress] = useState({
    line1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "GB",
  });
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    try {
      const calculatedTotal = cartItems.reduce(
        (sum, item) => sum + (parseFloat(item.price || 0) * (item.quantity || 1)),
        0
      );
      setTotal(calculatedTotal.toFixed(2));
    } catch (err) {
      setError("Error calculating total: " + err.message);
      console.error("Total calculation error:", err);
    }
  }, [cartItems]);

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const validateAddress = () => {
    return (
      address.line1 &&
      address.city &&
      address.state &&
      address.postalCode &&
      address.country
    );
  };

  const saveOrder = async (paymentId, payerDetails) => {
    try {
      if (!userId) throw new Error("User not authenticated");
      if (cartItems.length === 0) throw new Error("Cart is empty");

      // Validate cart items
      const validatedItems = cartItems.map((item) => ({
        id: item.id || `unknown-${Math.random().toString(36).substring(2)}`,
        name: item.name || "Unknown Product",
        quantity: item.quantity || 1,
        price: parseFloat(item.price || 0),
      }));

      const orderId = doc(collection(db, "orders")).id;
      const orderData = {
        userId,
        items: validatedItems,
        total: parseFloat(total) || 0,
        status: "completed",
        createdAt: serverTimestamp(),
        address,
        paymentId,
        payerEmail: payerDetails?.email_address || "unknown",
        payerId: payerDetails?.payer_id || "unknown",
      };

      await setDoc(doc(db, "orders", orderId), orderData);
      await setDoc(doc(db, "users", userId, "addresses", "default"), address);
      dispatch(clearCart());
      navigate(`/order-confirmation/${orderId}`);
    } catch (err) {
      setError("Failed to save order: " + err.message);
      console.error("Order save error:", err);
    }
  };

  const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID || "",
    currency: "GBP",
    intent: "capture",
  };

  if (!process.env.REACT_APP_PAYPAL_CLIENT_ID) {
    return <p style={{ color: "red" }}>PayPal Client ID is missing. Please check .env file.</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Checkout</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!userId ? (
        <p>Please log in to proceed with checkout.</p>
      ) : (
        <>
          <h3>Shipping Address</h3>
          <form>
            <input
              type="text"
              name="line1"
              placeholder="Address Line 1"
              value={address.line1}
              onChange={handleAddressChange}
              required
              style={{ width: "100%", margin: "10px 0", padding: "8px" }}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleAddressChange}
              required
              style={{ width: "100%", margin: "10px 0", padding: "8px" }}
            />
            <input
              type="text"
              name="state"
              placeholder="State/Province"
              value={address.state}
              onChange={handleAddressChange}
              required
              style={{ width: "100%", margin: "10px 0", padding: "8px" }}
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={address.postalCode}
              onChange={handleAddressChange}
              required
              style={{ width: "100%", margin: "10px 0", padding: "8px" }}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={address.country}
              onChange={handleAddressChange}
              required
              style={{ width: "100%", margin: "10px 0", padding: "8px" }}
            />
          </form>

          <h3>Order Summary</h3>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id || Math.random()}>
                <p>
                  {item.name || "Unknown Product"} x {item.quantity || 1} - £
                  {(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2)}
                </p>
              </div>
            ))
          ) : (
            <p>Cart is empty.</p>
          )}
          <h4>Total: £{total}</h4>

          <h3>Pay with PayPal</h3>
          {validateAddress() && cartItems.length > 0 && parseFloat(total) > 0 ? (
            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: total,
                          currency_code: "GBP",
                          breakdown: {
                            item_total: {
                              value: total,
                              currency_code: "GBP",
                            },
                          },
                        },
                        items: cartItems.map((item) => ({
                          name: item.name || "Unknown Product",
                          quantity: (item.quantity || 1).toString(),
                          unit_amount: {
                            value: parseFloat(item.price || 0).toFixed(2),
                            currency_code: "GBP",
                          },
                        })),
                        shipping: {
                          address: {
                            address_line_1: address.line1,
                            admin_area_2: address.city,
                            admin_area_1: address.state,
                            postal_code: address.postalCode,
                            country_code: address.country,
                          },
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  try {
                    const details = await actions.order.capture();
                    await saveOrder(details.id, details.payer);
                  } catch (err) {
                    setError("Payment processing failed: " + err.message);
                    console.error("Payment error:", err);
                  }
                }}
                onError={(err) => {
                  setError("PayPal error: " + err.message);
                  console.error("PayPal error:", err);
                }}
                onCancel={() => {
                  setError("Payment was cancelled");
                }}
              />
            </PayPalScriptProvider>
          ) : (
            <p>Please fill in all address fields, ensure the cart has items, and the total is valid.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Checkout;