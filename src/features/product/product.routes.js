import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/file-upload.middleware.js";

const router = express.Router();

const productController = new ProductController();

//now the request is /api/products

router.get('/', productController.getAllProducts)
router.post('/', upload.single('imageUrl'),  productController.addProduct)
router.post('/rate', productController.rateProduct)
router.get('/filter', productController.filterProduct)
router.get('/:id', productController.getOneProduct)



export default router;