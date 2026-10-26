import express from 'express';
import *  as authcontroller from '../controllers/authController.js';

const router = express.Router();

router.post ('/', authcontroller.login);

export default router;