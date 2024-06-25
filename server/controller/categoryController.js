import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, resp) => {
    try {
        const { name, slug } = req.body;

        // check validation
        if (!name) {
            return resp.status(400).send({ error: "Name is required" });
        }

        // exiting category
        const exitincategory = await categoryModel.findOne({ name });
        if (exitincategory) {
            return resp.status(202).send({
                success: false,
                message: 'Already Create Category',
            });
        }

        // save
        const category = await categoryModel({ name, slug: slugify(name) }).save();
        resp.status(200).send({
            success: true,
            message: 'Successfully Create Category',
            category,
        });


    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error while category controller',
            error,
        });
    }
}

// get single category
export const getSingleCategoryCategory = async (req, resp) => {
    try {
        const { slug } = req.params;
        const category = await categoryModel.findOne({ slug });
        resp.status(200).send({
            success: true,
            message: 'Successfully get category',
            category,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            error: 'while get single category controller',
            error,
        });
    }
}

// get all categorys
export const getAllCategoryController = async (req, resp) => {
    try {
        const categorys = await categoryModel.find({}).sort({ createdAt: -1 });
        resp.status(200).send({
            success: true,
            message: 'Succesfully get all category',
            NoOfCategory: categorys.length,
            categorys,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error while get all category',
            error,
        });
    }
}

// update category controller
export const updateCategoryController = async (req, resp) => {
    try {
        const { name, slug } = req.body;
        const { id } = req.params;

        // check validation
        if (!name) {
            return resp.status(400).send({ error: "Name is required" });
        }

        // exiting category
        const exitincategory = await categoryModel.findOne({ name });
        if (exitincategory) {
            return resp.status(202).send({
                success: false,
                message: 'Already Exiting Category',
            });
        }

        // update
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        resp.status(200).send({
            success: true,
            message: 'Successfully update category',
            category,
        });


    } catch (error) {
        console.log(error);
        req.status(500).send({
            success: false,
            message: 'Error while update category controller',
            error,
        });
    }
}

// delete category controller
export const deletCtaegoryController = async (req, resp) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findByIdAndDelete(id);
        resp.status(200).send({
            success: true,
            message: 'Successfully delete category',
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error while delete category controller',
            error,
        });
    }
}