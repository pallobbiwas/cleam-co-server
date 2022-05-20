const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
var cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;

//middletair

app.use(cors());
app.use(express.json());

//database info
/* *
 *name: clean-car-co
 *pass: LzDCFqWAbixY4DfO
 */

//database connection

const uri =
  "mongodb+srv://clean-car-co:LzDCFqWAbixY4DfO@cluster0.95fm0.mongodb.net/?retryWrites=true&w=majority";

console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const serviceCollection = client.db("clean-co").collection("service");
    console.log("db connected ");

    //get api
    app.get("/service", async (req, res) => {
      const query = {};
      const result = await serviceCollection.find(query).toArray();
      res.send(result);
    });

    //post api

    app.post("/service", async (req, res) => {
      try {
        const data = req.body;
        const result = await serviceCollection.insertOne(data);
        res.send({ status: true, result: result });
      } catch (error) {
        res.send({ status: false, error });
      }
    });

    //update api

    app.put("/service/:id", async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      const filter = { _id: ObjectId(id) };
      const uDoc = {
        $set:data
      }
      const option = {upsert: true};
      const result = await serviceCollection.updateOne(filter, uDoc, option);
      res.send(result); 
    });

    //delete api

    app.delete("/service/:id", async (req, res) => {
      const { id } = req.params;
      const querry = { _id: ObjectId(id) };

      const result = await serviceCollection.deleteOne(querry);
      res.send(result); 
    });


  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`clean co start ${port}`);
});
