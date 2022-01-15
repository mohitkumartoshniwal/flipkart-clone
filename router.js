import express from  'express';
import { getProductById, getProducts } from './controller/product.js';
import { userSignUp, userLogIn, userLogout } from './controller/user.js';
import { addPaymentGateway, paymentResponse } from './controller/paytm.js';
import passport from 'passport';

const router = express.Router();

//login & signup
router.post('/signup', userSignUp);
router.post('/login',passport.authenticate('local'), userLogIn);
router.get('/logout', userLogout)

router.get('/products', getProducts);
router.get('/product/:id', getProductById);

router.post('/payment', addPaymentGateway);
router.post('/callback', paymentResponse);

export default router;