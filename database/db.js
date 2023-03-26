const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "backend-api",
  })
  .then(() => {
    console.log("Connection to DataBase SuccessFull");
  })
  .catch((error) => console.log(`Error Connecting to Database : ${error}`));
