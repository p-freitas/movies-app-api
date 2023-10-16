const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 3001;
const { MongoClient, ObjectId } = require("mongodb");

// Connection URL
const url = process.env.MONGODB_URI;

// Database Name
const dbName = process.env.MONGODB_DB_NAME;

// Create a MongoDB client
const client = new MongoClient(url, { useNewUrlParser: true });

// Connect to the server and database
async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

app.use(express.json());
app.use(cors());

// GET movies endpoint
app.get("/movies", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("movies");

  // Find all items in the collection
  const items = await collection.find({}).toArray();

  res.json(items);
});

// POST movies endpoint
app.post("/movies", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("movies");
  const newItem = req.body;

  // Insert the new item into the collection
  const result = await collection.insertOne(newItem);

  res.json(result);
});

// DELETE movies endpoint
app.delete("/movies/:id", async (req, res) => {
  const itemId = req.params.id;
  const db = client.db(dbName);
  const collection = db.collection("movies");

  // Delete the item with the provided ID
  const result = await collection.deleteOne({ _id: new ObjectId(itemId) });

  if (result.deletedCount === 1) {
    res.json({ message: `Item with ID ${itemId} has been deleted.` });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// GET series endpoint
app.get("/series", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("series");

  // Find all items in the collection
  const items = await collection.find({}).toArray();

  res.json(items);
});

// POST series endpoint
app.post("/series", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("series");
  const newItem = req.body;

  // Insert the new item into the collection
  const result = await collection.insertOne(newItem);

  res.json(result);
});

// DELETE series endpoint
app.delete("/series/:id", async (req, res) => {
  const itemId = req.params.id;
  const db = client.db(dbName);
  const collection = db.collection("series");

  // Delete the item with the provided ID
  const result = await collection.deleteOne({ _id: new ObjectId(itemId) });

  if (result.deletedCount === 1) {
    res.json({ message: `Item with ID ${itemId} has been deleted.` });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// GET recomendations endpoint
app.get("/recomendations", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("recomendations");

  // Find all items in the collection
  const items = await collection.find({}).toArray();

  res.json(items);
});

// POST recomendations endpoint
app.post("/recomendations", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("recomendations");
  const newItem = req.body;

  // Insert the new item into the collection
  const result = await collection.insertOne(newItem);

  res.json(result);
});

// DELETE recomendations endpoint
app.delete("/recomendations/:id", async (req, res) => {
  const itemId = req.params.id;
  const db = client.db(dbName);
  const collection = db.collection("recomendations");

  // Delete the item with the provided ID
  const result = await collection.deleteOne({ _id: new ObjectId(itemId) });

  if (result.deletedCount === 1) {
    res.json({ message: `Item with ID ${itemId} has been deleted.` });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

app.listen(port, () => {
  connectToMongo();
  console.log(`Server is listening on port ${port}`);
});
