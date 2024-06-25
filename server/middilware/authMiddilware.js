import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const requireSign = async (req, resp, next) => {
    try {
        const decode = jwt.verify(
            req.headers.authorization,
            process.env.SECRECT_KEY
        );
        req.user = decode;
        next();

    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error while require sign  controller',
            error,
        });
    }
}

export const isAdmin = async (req, resp, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return resp.send({
                success: false,
                message: 'Unauthorize Access',
            });
        } else {
            next();

        }

    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error while admin controller',
            error,
        });
    }
}
