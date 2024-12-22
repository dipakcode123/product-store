import express from 'express';
import { addProduct, deleteProduct, getProducts, updateProduct } from '../controller/product.controller.js';


const router = express.Router();


router.get('/', getProducts);
router.post('/add-product', addProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

export default router;