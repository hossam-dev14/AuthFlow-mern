import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import {userController} from '../controllers/user.controller.js';

const router = express.Router();


router.get('/',  userController.getUsers);
router.get('/:id', verifyToken, userController.userById);
router.put('/:id', verifyToken, userController.updateUser);
router.delete('/:id', verifyToken, userController.deleteUser);


export default router;


