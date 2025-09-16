import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js"
import cloudinary from "../lib/cloudinary.js";

export const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.json({ products });
    }
    catch(error){
        console.error("Error fetching products:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get("featured_products")
        if (featuredProducts) {
            return res.json(JSON.parse(featuredProducts));
        }

        featuredProducts = await Product.find({ isFeatured: true }).lean();

        if(!featuredProducts) {
            return res.status(404).json({ message: "No featured products found" });
        }

        await redis.set("featured_products", JSON.stringify(featuredProducts));
        res.json(featuredProducts); 
    } catch (error) {
        console.error("Error fetching featured products:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        const {name, description, price, image, category} = req.body;

        let cloudinaryResponse = null

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, {folder: "products"})
        }

        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category
        })
        res.status(201).json(product);
    } catch (error) {
        console.log("Error creating product:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}