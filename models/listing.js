const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review= require("./review.js");
const { required } = require("joi");
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
  url:String,
  filename:String, 
 },
  price: Number,
  location: String,
  country: String,
category:{
type:String,
enum:["Trending","Rooms","Iconic cities","Mountains","Amazing pools","Castles","Camping","Farms","Artic"]
},
  reviews :[
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Review",
    },
  ],
  
});

listingSchema.post("findOneAndDelete",async (listing)=>{
  if (listing) {
await Review.deleteMany({_id : {$in : listing.reviews}})

  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;