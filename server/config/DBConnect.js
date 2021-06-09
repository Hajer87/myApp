const mongoose =require('mongoose');
const dotenv= require('dotenv').config({path:'./.env'});
const uri = process.env.ATLAS_URL;
const DBConnect = () => {
  mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log("database connected");
    }
  );
};

module.exports = DBConnect;