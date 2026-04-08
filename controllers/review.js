const Listing=require("../models/listing");
const Review=require("../models/review");

module.exports.post=async(req,res)=>{
  try{
    let {id} =req.params;
  let listing= await Listing.findById(id);

if(!listing){
  return res.send("listing is not found")
}
  let newReview =new Review(req.body.review);
 listing.reviews.push(newReview);

await newReview.save();
  await listing.save();

   req.flash("success","New review created!");
   res.redirect(`/listings/${id}`);
}
catch(err) {
  console.log("ERROR",err);
  res.send(err.message);
}
  };
  module.exports.delete=async(req,res)=>{
    let { id,reviewId} = req.params;
   await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
   await Review.findByIdAndDelete(reviewId);
   req.flash("success","review deleted!");
   res.redirect(`/listings/${id}`);
  };