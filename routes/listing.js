const express = require("express");
const router =express.Router();
const Listing = require("../models/listing.js");
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError= require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const {isLoggedIn} =require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const {storage} =require("../cloudconfig.js");
const upload = multer({storage});

const validateListing =(req,res,next)=>{
let {error}=listingSchema.validate(req.body);
//   console.log(result);
  if(error) {
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }else{
    next();
  }
};


//New Route
router.get("/new", isLoggedIn,listingController.renderNewForm,(req, res) => {
  res.render("listings/new.ejs");
});

router.route("/")
.get( wrapAsync(listingController.index))
 .post(
upload.single("listing[image][url]"),
validateListing,
  wrapAsync(listingController.create))


router.route("/:id")
.get( wrapAsync(listingController.show))
.put(validateListing,upload.single("listing[image][url]"),
   wrapAsync(listingController.update))
  .delete( wrapAsync(listingController.delete));

//Edit Route
router.get("/:id/edit", wrapAsync(listingController.edit));
module.exports=router;