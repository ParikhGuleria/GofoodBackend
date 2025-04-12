const { response } = require('express');
const mongoose = require('mongoose');
const MONGO_URI = "mongodb+srv://atlas-sample-dataset-load-67fa4856e5c1cb783171cb37:parikh09@gofoodcluster.wxtreuj.mongodb.net/?retryWrites=true&w=majority&appName=gofoodCluster";

const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Connected to Database...");
    const fetchallData = await mongoose.connection.db.collection("foodData");
    const data = await fetchallData.find().toArray();
    const fetchCategory = await mongoose.connection.db.collection("foodCategory");
    const catData = await fetchCategory.find().toArray();
    global.foodData = data;
    global.foodCategory = catData;
  }
  catch (error) {
    console.error("Error Occuring while connecting to database", error)
  }
}

module.exports = connectToMongo;

