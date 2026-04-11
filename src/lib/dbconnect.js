const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Mealmaster:95BFxfrsb8M11o5j@cluster0.jc6c5mw.mongodb.net/?appName=Cluster0";

const dbname="Mealmaster";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



export const dbconnect=(cname)=>{
    return client.db(dbname).collection(cname);
}
