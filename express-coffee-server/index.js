const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { connectToDatabase, client } = require("./dataBase");
const { ObjectId } = require("mongodb");

// middleawre
app.use(cors());
app.use(express.json());

// basic route
app.get("/", (req, res) => {
  res.send("Express Coffee App is Running");
});

//
async function run() {
  try {
    await connectToDatabase();
    // create a dataBase collections
    const database = client.db("coffeeDB");
    const expressCoffee = database.collection("expressCoffee");
    // get all coffees
    app.get("/coffee", async (req, res) => {
      const allCoffees = expressCoffee.find();
      const result = await allCoffees.toArray();
      if (result) {
        res.send(result);
      } else {
        res.status(404);
      }
    });
    //post  route
    app.post("/coffee", async (req, res) => {
      const newCoffee = req.body;
      const result = await expressCoffee.insertOne(newCoffee);
      if (result) {
        res.send(result);
      } else {
        res.status(404);
      }
    });

    // delete operation
    app.delete("/coffee/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await expressCoffee.deleteOne(query);
      res.send(result);
      if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.");
      } else {
        console.log("No documents matched the query. Deleted 0 documents.");
      }
    });

    // get single coffee
    app.get("/coffee/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await expressCoffee.findOne(query);
      res.send(result);
    });

    // update
    app.put("/coffee/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateCoffee = req.body;
      const updateDoc = {
        $set: {
          name: updateCoffee.name,
          chefname: updateCoffee.chefname,
          category: updateCoffee.category,
          photo: updateCoffee.photo,
          taste: updateCoffee.taste,
          details: updateCoffee.details,
          supplier: updateCoffee.supplier,
        },
      };
      const result = await expressCoffee.updateOne(query, updateDoc, options);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

// listen app
app.listen(port, () => {
  console.log(`Coffe express is running port :${port}`);
});
