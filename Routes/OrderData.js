const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

// Endpoint to send food data
router.post('/foodData', async (req, res) => {
  try {
    res.send([global.food_items, global.foodCategory]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint to handle order data
router.post('/orderData', async (req, res) => {
  let data = req.body.order_data;
  data.splice(0, 0, { Order_date: req.body.order_date }); // Add the order date at the start
  console.log("Email:", req.body.email);

  try {
    // Check if the email already exists in the database
    let eId = await Order.findOne({ email: req.body.email });
    console.log("Order Exists:", eId);

    if (eId === null) {
      // If email does not exist, create a new order entry
      console.log("Creating new order:", data);
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });
      res.json({ success: true });
    } else {
      // If email exists, update the existing order data
      console.log("Updating existing order:", data);
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
      res.json({ success: true });
    }
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).send("Server Error: " + error.message);
  }
});


// Inside your backend route that handles order data
router.post('/myOrderData', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const orders = await Order.find({ email: email });
    
    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }
    
    console.log('Orders data:', orders); // Ensure image URLs are in the response

    res.json({ orderData: orders });
  } catch (error) {
    console.error('Server Error:', error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


module.exports = router;
