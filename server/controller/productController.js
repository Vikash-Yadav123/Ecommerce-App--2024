import slugify from "slugify";
import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";
import categoryModel from '../models/categoryModel.js';
import fs from 'fs';
import braintree from "braintree";
import dotenv from 'dotenv';
dotenv.config();

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


export const createProductController = async (req, resp) => {
    try {
        const { name, description, price, quantity, slug, color, brand, size, category, shipping } = req.fields;
        const { photo } = req.files;

        // validation  check
        if (!name) {
            return resp.status(400).send({ error: 'Name is required' });
        }
        if (!description) {
            return resp.status(400).send({ error: 'Description is required' });
        }
        if (!price) {
            return resp.status(400).send({ error: 'Price is required' });
        }
        if (!quantity) {
            return resp.status(400).send({ error: 'quantity is required' });
        }
        if (!color) {
            return resp.status(400).send({ error: 'color is required' });
        }
        if (!brand) {
            return resp.status(400).send({ error: 'brand is required' });
        }
        if (!size) {
            return resp.status(400).send({ error: 'size is required' });
        }

        if (!photo || photo.size >= 1000000) {
            return resp.status(400).send({ error: 'Photo is required and size should be less than 1 MB' });
        }
        const product = await productModel({ ...req.fields, name, slug: slugify(name) });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
        resp.status(200).send({
            success: true,
            message: 'Successfully create Prodcut',
            product,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error while create product controller'
        });
    }
}
// get single product controller
export const getSingleProductController = async (req, resp) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate('category');
        resp.status(200).send({
            success: true,
            message: 'Successfully get single product',
            product,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'While get single product controller',
            error,
        });
    }
}

// get all product controller
export const getAllProductController = async (req, resp) => {
    try {
        const products = await productModel.find({}).select("-photo").populate('category').sort({ createdAt: -1 });
        resp.status(200).send({
            success: true,
            message: 'Successfully get all products',
            NoOfProduct: products.length,
            products,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error while get all controller',
            error,
        });
    }
}

// update product controller
export const updateProductController = async (req, resp) => {
    try {
        const { name, description, price, quantity, color, size, brand, slug, category, shipping } = req.fields;
        const { photo } = req.files;

        // validation check
        if (!name) {
            return resp.status(400).send({ error: 'Name is required' });
        }
        if (!description) {
            return resp.status(400).send({ error: 'Description is required' });
        }
        if (!price) {
            return resp.status(400).send({ error: 'Price is required' });
        }
        if (!quantity) {
            return resp.status(400).send({ error: 'quantity is required' });
        }
        if (!color) {
            return resp.status(400).send({ error: 'color is required' });
        }
        if (!brand) {
            return resp.status(400).send({ error: 'brand is required' });
        }
        if (!size) {
            return resp.status(400).send({ error: 'size is required' });
        }

        if (photo && photo.size > 100000) {
            return resp.status(400).send({ error: 'photo is required && min size ' });
        }
        const updateData = await productModel({ ...req.fields, name, slug: slugify(name) });

        if (photo) {
            updateData.photo.data = fs.readFileSync(photo.path);
            updateData.photo.contentType = photo.type;
        }
        const product = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, name, slug: slugify(name) }, { new: true }).select("-photo").populate("category");

        if (!product) {
            return resp.status(404).send({
                success: false,
                message: 'Product not found',
            });
        }
        resp.status(200).send({
            success: true,
            message: 'Successfully update Prodcut',
            product,
        });

    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: "Error while update controller "
        });
    }
}

// get photo controller
export const getProductPhotoController = async (req, resp) => {
    try {
        const { pid } = req.params;
        const product = await productModel.findOne({ _id: pid });
        if (product && product.photo.data) {
            resp.set('content-Type', 'image/png');
            return resp.send(product.photo.data);
        }




    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error while get phot controller',
            error,
        });
    }
}

//delete product controller
export const deleteProductController = async (req, resp) => {
    try {
        const { pid } = req.params;
        const product = await productModel.findByIdAndDelete(pid).select("-photo");
        resp.status(200).send({
            success: true,
            message: 'Successfully delete product',
        });
    } catch (error) {
        console.log(error);
    }
}

// FILTER PRODUCT CONTROLLER
export const filterProductController = async (req, resp) => {
    try {
        const { checked, radio, color, size } = req.body;
        let all = {};
        if (checked && checked.length > 0) all.category = { $in: checked };
        if (color && color.length > 0) all.color = { $in: color };
        if (size && size.length > 0) all.size = { $in: size };
        if (radio && radio.length > 0) all.price = { $gte: radio[0], $lte: radio[1] };
        const product = await productModel.find(all).select("-photo").sort({ createdAt: -1 });
        resp.status(200).send({
            success: true,
            message: 'Successfully Filter Product',
            product,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error while filter product controller',
            error,
        });

    }
}

// COUNT ALL PRODUCT
export const totalProductController = async (req, resp) => {
    try {
        const total = await productModel.find({}).select('-photo').sort({ created: -1 }).estimatedDocumentCount();
        resp.status(200).send({
            success: true,
            message: 'Successfully count all products',
            total,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error while total product controller',
            error,
        });
    }
}

// PER PAGE COUNT CONTROLLER
export const pageCountProductController = async (req, resp) => {
    try {
        let perPage = 3;
        let page = req.params.page ? req.params.page : 1;
        const products = await productModel.find({})
            .skip((page - 1) * perPage)
            .limit(perPage)
            .select("-photo")
            .sort({ createdAt: 1 })
            .populate('category')
        resp.status(200).send({
            success: true,
            message: 'Successfully page count product',
            products,
        });

    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error while page count controller',
            error,
        });
    }
}

// SEARCH PRODUCT CONTROLLER
export const searchProductController = async (req, resp) => {
    try {
        const { keyword } = req.body;
        const product = await productModel.find({
            $or: [
                { description: { $regex: keyword, $options: "i" } },
                { name: { $regex: keyword, $options: "i" } }
            ]
        }).select('-photo').sort({ createdAt: -1 });
        resp.status(200).send({
            success: true,
            message: 'Successfully Search prodcut',
            product,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error while search product controller',
            error,
        });
    }
}

// RELATED PRODUCT CONTROLLER
export const relatedProductContorller = async (req, resp) => {
    try {
        const { pid } = req.params;
        const currentProduct = await productModel.findById(pid);
        if (!currentProduct) {
            return resp.status(404).send({
                success: false,
                message: 'Product do not get ',
            });
        }
        const product = await productModel.find(
            {
                category: currentProduct.category,
                _id: { $ne: pid }
            }
        ).select("-photo").sort({ createdAt: -1 }).limit(3);
        resp.status(200).send({
            success: true,
            message: 'Successfully get related product',
            product,
        });

    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error while relate product controller',
            error,
        });
    }
}

// CATEGORY PRODUCT CONTROLLER
export const categoryProductController = async (req, resp) => {
    try {

        const category = await categoryModel.findOne({ slug: req.params.slug });
        const product = await productModel.find({ category }).populate('category').select('-photo').sort({ created: -1 });
        resp.status(200).send({
            success: true,
            message: 'Successfully get category product',
            product,
        });

    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error while category product controller',
            error,
        });
    }
}

// BRAINTREE PAYMENT METHOD 

// BRAINTREE TOKEN CONTROLLER
export const getTokenBraintreeController = async (req, res) => {
    try {
        console.log('Generating Braintree token...');

        gateway.clientToken.generate({}, function (err, result) {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Failed to generate client token',
                    err,
                });
            } else {
                return res.send({
                    success: true,
                    clientToken: result.clientToken,
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting token from controller',
            error,
        });
    }
};


// BRAINTREE PAYMENT CONTROLLER
export const braintreePaymentController = async (req, resp) => {
    try {
        const { nonce, cart } = req.body;
        console.log(cart)
        // Ensure req.user is populated
        if (!req.user || !req.user._id) {
            return resp.status(401).send({ error: 'User not authenticated' });
        }

        let total = 0;
        cart.map((item) => {
            total += item.price
        })
        gateway.transaction.sale(

            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },

            function (error, result) {
                if (error) {
                    console.log(error);
                    return resp.status(500).send(error);
                }

                if (result.success) {
                    try {
                        const order = new orderModel({
                            product: cart,
                            payment: result,
                            buyer: req.user._id,
                        });
                        order.save();
                        resp.status(200).send({ success: true, order });
                    } catch (saveError) {
                        console.log(saveError);
                        resp.status(500).send(saveError);

                    }
                } else {
                    resp.status(500).send({ error: result.message });
                }
            }

        );


    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error while Payment Controller',
            error,
        });
    }
}