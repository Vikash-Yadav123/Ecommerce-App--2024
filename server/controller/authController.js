import { ComparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from '../models/orderModel.js'
import jwt from 'jsonwebtoken';
export const registerController = async (req, resp) => {
    try {
        const { name, email, phone, password, address, answer } = req.body;
        if (!name) {
            return resp.status(400).send({ error: 'Name is required' });
        }
        if (!email) {
            return resp.status(400).send({ error: 'Email is required' });
        }
        if (!password) {
            return resp.status(400).send({ error: 'Password is required' });
        }
        if (!phone) {
            return resp.status(400).send({ error: 'Phone is required' });
        }
        if (!answer) {
            return resp.status(400).send({ error: 'Answer is required' });
        }
        if (!address) {
            return resp.status(400).send({ error: 'Address is required' });
        }

        // exiting user
        const user = await userModel.findOne({ email });
        if (user) {
            return resp.status(202).send({
                success: false,
                message: 'Already Register',
            })
        }

        // password hassed
        const hashedpassword = await hashPassword(password);

        // user save
        const users = userModel({ name, email, address, phone, answer, password: hashedpassword });
        await users.save();
        resp.status(200).send({
            success: true,
            message: 'Successfully registeration ',
            users,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: true,
            message: 'Error while registercontroller',
            error,
        });
    }
}
export const loginController = async (req, resp) => {
    try {
        const { email, password } = req.body;

        // validation check
        if (!email || !password) {
            return resp.status(404).send({ error: 'Required email and pasword' });
        }

        // check exiting user
        const user = await userModel.findOne({ email });
        if (!user) {
            return resp.status(202).send({
                success: false,
                message: 'Invalid Email',
            });
        }

        // compare password
        const comparepassword = await ComparePassword(password, user.password);
        if (!comparepassword) {
            return resp.status(202).send({
                success: false,
                message: 'Password do not match'
            });
        }

        // token generate
        const token = jwt.sign({ _id: user._id }, process.env.SECRECT_KEY, { expiresIn: '7d' });
        resp.status(200).send({
            success: true,
            message: 'Successfully Login',
            user: {

                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                address: user.address,
                phone: user.phone,
                answer: user.answer,
                role: user.role,
            },
            token,

        });
    } catch (error) {
        resp.status(500).send({
            success: false,
            messaeg: 'Error while login controller',
            error,
        });
    }
}
// text controller
export const textController = async (req, resp) => {
    try {
        resp.status(200).send({
            message: 'Succesfully access',
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}


// forget password controller
export const forgetPasswordController = async (req, resp) => {
    try {
        const { email, answer, newpassword } = req.body;

        // validation check
        if (!email) {
            return resp.status(400).send({ error: 'Email is required' });
        }
        if (!answer) {
            return resp.status(400).send({ error: 'Answer is required' });
        }
        if (!newpassword) {
            return resp.status(400).send({ error: 'NewPassword is required' });
        }

        // exiting user
        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return resp.send({
                success: false,
                message: 'Invali User',

            });
        }

        // hassed password
        const hasspassword = await hashPassword(newpassword);

        // update  password
        const data = await userModel.findByIdAndUpdate(user._id, { password: hasspassword });
        resp.status(200).send({
            success: true,
            messaege: 'Successfully forget password',
        })

    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            messaeg: 'Error while password controller',
            error,
        });
    }
}


// GET ORDER CONTROLLLER
export const getOrderController = async (req, resp) => {
    try {
        const order = await orderModel.find({ buyer: req.user._id }).populate('product', '-photo').populate('buyer', 'name').sort({ createdAt: -1 });
        resp.status(200).send({
            success: true,
            messaege: 'Successfully get Order',
            order,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error while get order controller',
            error,
        });
    }
}


// GET ALL ORDER CONTROLLER
export const getAllOrderController = async (req, resp) => {
    try {
        const orders = await orderModel.find({}).populate('product', '-photo').populate('buyer', 'name').sort({ createdAt: -1 });
        resp.status(200).send({
            success: true,
            message: 'Successfully get all orders',
            orders,
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

// UPDATE ORDER STATUS CONTROLLER
export const updateOrderStatusController = async (req, resp) => {
    try {
        const { status } = req.body;
        const { oid } = req.params;


        const product = await orderModel.findByIdAndUpdate(oid, { status }, { new: true });
        resp.status(200).send({
            success: true,
            message: 'Successfully update order status',
            product,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error while order update status',
            error,
        });
    }
}

// UPDATE PROFILE CONTROLLER
export const profileUpdateController = async (req, resp) => {
    try {
        const { id } = req.params;
        const { name, email, phone, password, address, answer } = req.body;
        if (!name) {
            return resp.status(400).send({ error: 'Name is required' });
        }
        if (!email) {
            return resp.status(400).send({ error: 'Email is required' });
        }

        if (!phone) {
            return resp.status(400).send({ error: 'Phone is required' });
        }

        if (!address) {
            return resp.status(400).send({ error: 'Address is required' });
        }



        // password hassed
        const hashedpassword = password ? await hashPassword(password) : undefined;


        // user save

        const user = await userModel.findByIdAndUpdate(id, {
            name: req.user.name || name,
            email: req.user.email || email,
            password: req.user.password || hashedpassword,
            phone: req.user.phone || phone,
            address: req.user.address || address,
        }, { new: true });
        resp.status(200).send({
            success: true,
            message: 'Successfully Update Profile ',
            user,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: true,
            message: 'Error while update profile controller',
            error,
        });
    }
}


// GET ALL USER CONTROLLER
export const getAllUserController = async (req, resp) => {
    try {
        const users = await userModel.find({}).select('-password').select('-answer').select('-role').sort({ createdAt: -1 });
        resp.status(200).send({
            success: true,
            message: 'Successfully get all Users',
            UsersLength: users.length,
            users,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error while get all user controller',
            error,
        });
    }
}

