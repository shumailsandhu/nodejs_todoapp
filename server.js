const app = require("./app.js");

//DataBase Connection
require("./database/db");


app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port No# ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
  })