import express from 'express';
import Formidable from 'express-formidable';
import { requireSign, isAdmin } from "../middilware/authMiddilware.js"
import { braintreePaymentController, categoryProductController, createProductController, deleteProductController, filterProductController, getAllProductController, getProductPhotoController, getSingleProductController, getTokenBraintreeController, pageCountProductController, relatedProductContorller, searchProductController, totalProductController, updateProductController } from '../controller/productController.js';
const router = express.Router();

// CREATE PRODUCT || METHOD POST
router.post('/create-product', requireSign, isAdmin, Formidable(), createProductController);

// GET PRODUCT || METHOD GET
router.get('/get-product/:slug', getSingleProductController);

//GET ALL PRODUCT || METHOD GET
router.get('/get-products', getAllProductController);

// UPDATE PRODUCT || METHOD PUT
router.put('/update-product/:pid', requireSign, isAdmin, Formidable(), updateProductController);

// GET PRODUCT PHOTO || METHOD GET
router.get('/get-photo/:pid', getProductPhotoController);

//DELETE PRODUCT || METHOD DELETE
router.delete('/delete-product/:pid', requireSign, isAdmin, deleteProductController);

// FILTER PRODUCT BY PRICES AND CATEGORY || METHOD GET
router.post('/filter-product', filterProductController);

// COUNT PRODUCT || METHOD GET
router.get('/count-product', totalProductController);

// PAGE COUNT || METHOD GET
router.get('/page-count/:page', pageCountProductController);

// SEARCH PRODUCT || METHOD POST
router.post('/search-product', searchProductController);

// RELATED PRODUCT SEARCH || METHOD POST
router.get('/related-product/:pid', relatedProductContorller);

// GET PRODUCT BASED ON CATEGORY || METHOD GET
router.get('/get-categoryproduct/:slug', categoryProductController);

//BRAINTREE PAYMENT METHOD

// BRAINTREE TOKEN || METHOD GET
router.get('/braintree-token', getTokenBraintreeController);

// BRAINTREE PAYMENT || METHOD POST
router.post('/braintree/payment', requireSign, braintreePaymentController);



export default router;