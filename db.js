// db.js or your MongoDB connection file
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://divyanshshivhare001:Divyansh123@cluster0.ja3ks.mongodb.net/Foodzymern?retryWrites=true&w=majority&appName=Cluster0';

// Function to connect to MongoDB
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);

    console.log('Connected to MongoDB');

    // Access the collection "food_items" from the database
    const fetched_data = mongoose.connection.db.collection('food_items');

    // Use async/await or Promise to fetch data from the collection
    const data = await fetched_data.find({}).toArray();

    const fetched_category = mongoose.connection.db.collection('food_category');
    const categoryData = await fetched_category.find({}).toArray();
    
    global.food_items = data;
    global.foodCategory = categoryData;

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = mongoDB;
