const express = require('express');
const Product = require('../models/Product');
const { Storage } = require('@google-cloud/storage');

// Initialize Google Cloud Storage
const storage = new Storage({
    projectId: "petal-pink",
    keyFilename: "util/petal-pink-a21a8129bce9.json",
});

const bucketName = "rapid_application_development_coursework";

const multer = require('multer');

const storages = multer.memoryStorage();
const upload = multer({
    storage: storages,
}).fields([{ name: "image", maxCount: 1 }]);

// Helper function to upload file to GCP
async function uploadFileToGCP(fileBuffer, destination) {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(destination);

    await file.save(fileBuffer, {
        metadata: {
            contentType: 'image/jpeg', // Adjust content type if needed
        },
    });

    return `https://storage.googleapis.com/${bucketName}/${destination}`;
}

const router = express.Router();

// Create a new product
router.post('/create-product', express.json(), express.urlencoded({ extended: true }), upload, async (req, res) => {

    try {
        console.log("Received Form Data:", req.body);
        console.log("Received Files:", req.files);

        const { displayName, type, price, description } = req.body;

        let imageUrl = null;

        if (req.files && req.files["image"]) {
            imageUrl = await uploadFileToGCP(
                req.files["image"][0].buffer,
                `product/${Date.now()}-image.jpg`
            );
        }

        const product = new Product({
            displayName,
            type,
            price: parseFloat(price), // Convert price to number
            description,
            image: imageUrl,
        });

        await product.save();

        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create product" });
    }
});

router.get('/products', async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();

        // Respond with the list of products
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

// Get products where type is "hot"
router.get('/products/hot', async (req, res) => {
    try {
        const hotProducts = await Product.find({ type: "hot" });
        res.status(200).json(hotProducts);
    } catch (error) {
        console.error("Error fetching hot products:", error);
        res.status(500).json({ error: "Failed to fetch hot products" });
    }
});

// Get products where type is "cold"
router.get('/products/cold', async (req, res) => {
    try {
        const coldProducts = await Product.find({ type: "cold" });
        res.status(200).json(coldProducts);
    } catch (error) {
        console.error("Error fetching cold products:", error);
        res.status(500).json({ error: "Failed to fetch cold products" });
    }
});

module.exports = router;
