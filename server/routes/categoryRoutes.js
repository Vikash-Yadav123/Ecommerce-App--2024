import express from 'express';
import { isAdmin } from '../middilware/authMiddilware.js';
import { requireSign } from '../middilware/authMiddilware.js';
import { createCategoryController, deletCtaegoryController, getAllCategoryController, getSingleCategoryCategory, updateCategoryController } from '../controller/categoryController.js';
const router = express.Router();

// CREATE CATEGORY || METHOD POST
router.post('/create-category', requireSign, isAdmin, createCategoryController);

// GET SINGLE CATEGORY || METHOD GET
router.get('/get-category/:slug', getSingleCategoryCategory);

// GET ALL CATEGORY || METHOD GET
router.get('/get-categorys', getAllCategoryController);

// UPDATE CATEGORY || METHOD PUT
router.put('/update-category/:id', requireSign, isAdmin, updateCategoryController);

// DELETE CATEGORY || METHOD DELETE
router.delete('/delete-category/:id', requireSign, isAdmin, deletCtaegoryController)

export default router;