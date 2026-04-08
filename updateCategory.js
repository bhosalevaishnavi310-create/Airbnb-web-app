const mongoose = require("mongoose");
const Listing = require("./models/listing.js"); // Double-check this path to your model

// 1. Connect to your Database
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust'); 
}

main()
    .then(() => console.log("Connected to DB successfully!"))
    .catch(err => console.log(err));

// 2. Logic to update existing documents without deleting them
const updateCategories = async () => {
    const categories = ["Trending", "Rooms", "Iconic cities", "Mountains", "Amazing pools", "Castles", "Camping", "Farms", "Artic", "Boats"];
    
    // Find all existing listings
    let allListings = await Listing.find({});
    
    console.log("Updating categories...");

    for (let i = 0; i < allListings.length; i++) {
        // Assign a category from the list using index to ensure variety
        let selectedCat = categories[i % categories.length];
        
        // Use findByIdAndUpdate to keep images/data safe
        await Listing.findByIdAndUpdate(allListings[i]._id, { category: selectedCat });
    }

    console.log("Done! All listings updated with categories. Your images are safe.");
    mongoose.connection.close(); 
};

updateCategories();