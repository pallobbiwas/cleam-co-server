const express = require("express");
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

const { MongoClient, ServerApiVersion } = require("mongodb");
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
    console.log('db connected ');

    //get api
    app.get('/service', async (req, res) => {
      const query = {};
      const result = await serviceCollection.find(query).toArray();
      res.send(result);
    })

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
