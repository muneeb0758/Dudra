import './checkout.css'
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { db } from "../../firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { clearCart } from "../../Redux/cart/cart.actions";
import { useNavigate } from "react-router-dom";
import { FaLock, FaMapMarkerAlt, FaShoppingBag, FaCreditCard } from "react-icons/fa";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const [activeStep, setActiveStep] = useState(1); // 1: Address, 2: Payment
  const [email, setEmail] = useState("");

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
        payerEmail: payerDetails?.email_address || email || "unknown",
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
    return <div className="checkout-container"><p className="error-message">PayPal Client ID is missing. Please check .env file.</p></div>;
  }

  const handleContinueToPayment = (e) => {
    e.preventDefault();
    if (validateAddress()) {
      setActiveStep(2);
    } else {
      setError("Please fill in all address fields");
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <div className="progress-steps">
          <div className={`step ${activeStep >= 1 ? 'active' : ''}`}>
            <FaMapMarkerAlt className="step-icon" />
            <span>Shipping</span>
          </div>
          <div className={`step ${activeStep >= 2 ? 'active' : ''}`}>
            <FaCreditCard className="step-icon" />
            <span>Payment</span>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {!userId ? (
        <div className="login-prompt">
          <p>Please log in to proceed with checkout.</p>
        </div>
      ) : (
        <div className="checkout-content">
          <div className="checkout-main">
            {activeStep === 1 ? (
              <div className="shipping-section">
                <h2><FaMapMarkerAlt /> Shipping Address</h2>
                <form className="address-form">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Address Line 1</label>
                    <input
                      type="text"
                      name="line1"
                      placeholder="Street address or P.O. Box"
                      value={address.line1}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={address.city}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>State/Province</label>
                      <input
                        type="text"
                        name="state"
                        placeholder="State/Province"
                        value={address.state}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={address.postalCode}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Country</label>
                      <select
                        name="country"
                        value={address.country}
                        onChange={handleAddressChange}
                        required
                      >
                        <option value="GB">United Kingdom</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                        {/* Add more countries as needed */}
                      </select>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="continue-button"
                    onClick={handleContinueToPayment}
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            ) : (
              <div className="payment-section">
                <h2><FaCreditCard /> Payment Method</h2>
                <div className="order-summary">
                  <h3><FaShoppingBag /> Order Summary</h3>
                  {cartItems.length > 0 ? (
                    <div className="order-items">
                      {cartItems.map((item) => (
                        <div key={item.id || Math.random()} className="order-item">
                          <div className="item-image">
                            {item.image && <img src={item.image} alt={item.name} />}
                          </div>
                          <div className="item-details">
                            <p className="item-name">{item.name || "Unknown Product"}</p>
                            <p className="item-quantity">Quantity: {item.quantity || 1}</p>
                            <p className="item-price">£{(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>Cart is empty.</p>
                  )}
                </div>
                
                <div className="payment-methods">
                  <h3>Select Payment Method</h3>
                  <div className="paypal-container">
                    <PayPalScriptProvider options={initialOptions}>
                      <PayPalButtons
                        style={{ 
                          layout: "vertical",
                          color: "gold",
                          shape: "rect",
                          label: "paypal",
                          height: 48
                        }}
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
                  </div>
                </div>
                
                <button 
                  className="back-button"
                  onClick={() => setActiveStep(1)}
                >
                  Back to Shipping
                </button>
              </div>
            )}
          </div>
          
          <div className="checkout-sidebar">
            <div className="order-summary-box">
              <h3>Order Summary</h3>
              <div className="summary-items">
                {cartItems.map((item) => (
                  <div key={item.id || Math.random()} className="summary-item">
                    <span>{item.name || "Unknown Product"} x {item.quantity || 1}</span>
                    <span>£{(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-total">
                <span>Total:</span>
                <span className="total-amount">£{total}</span>
              </div>
              <div className="secure-checkout">
                <FaLock />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

