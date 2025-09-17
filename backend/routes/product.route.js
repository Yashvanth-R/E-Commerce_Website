import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts, getProdcutsByCategory, getRecommendedProducts } from '../controllers/product.controller.js';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProdcutsByCategory);
router.get("/recommendations", getRecommendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.post("/:id", protectRoute, adminRoute, deleteProduct);

export default router;