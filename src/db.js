const mongoose = require("mongoose");

const db = mongoose.connection;
db.on("error", console.error);
db.once("open", function() {
  console.log("Connected to mongod server");
});
mongoose.connect(
  `mongodb+srv://bugem:bugem3@cluster0.cgeyw.mongodb.net/test?retryWrites=true&w=majority`,
  { useUnifiedTopology: true, useNewUrlParser: true }
);

module.exports = db;