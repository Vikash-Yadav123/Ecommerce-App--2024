import express from 'express';
import { forgetPasswordController, getAllOrderController, getAllUserController, getOrderController, loginController, profileUpdateController, registerController, textController, updateOrderStatusController } from '../controller/authController.js';
import { isAdmin, requireSign } from '../middilware/authMiddilware.js';

const router = express.Router();

// USER REGISTER || METHOD POST
router.post('/register', registerController);

// LOGIN USER || METHOD GET
router.post('/login', loginController);

// PROTECT USER ROUTES || METHOD GET
router.get('/user-route', requireSign, (req, resp) => {
    resp.status(200).send({ ok: true });
})

// PROTECT ADMIN ROUTES || METHOD GET
router.get('/admin-route', requireSign, isAdmin, (req, resp) => {
    resp.status(200).send({ ok: true });
})

// FORGET PASSWORD || METHOD POST
router.put('/forget-password', forgetPasswordController);

// ORDER GET || METHOD GET
router.get('/get-order', requireSign, getOrderController);

// ALL ORDER GET || METHOD GET
router.get('/get-allorders', requireSign, isAdmin, getAllOrderController);


//ORDER STATUS UPDATE || METHOD PUT
router.put('/update-status/:oid', requireSign, isAdmin, updateOrderStatusController);

// UPDATE PROFILE || METHOD PUT
router.put('/update-profile/:id', requireSign, profileUpdateController);

// GET ALL USER || METHOD GET
router.get('/get-allusers', requireSign, isAdmin, getAllUserController);


router.get('/test', requireSign, isAdmin, textController);

export default router;