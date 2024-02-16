
import express from 'express';
import verifyToken from '../middleware/verifyToken.js';

import {roleController} from '../controllers/role.controller.js';

const router = express.Router();


router.post('/', roleController.addRole);
router.get('/', roleController.getRoles);
router.put('/:id', roleController.updateRole);
router.patch('/assign', roleController.assignRoleUser);
router.delete('/:id', roleController.deleteRole);

export default router;



// // router.use(verifyToken)
// /**
//  * @swagger
//  * /roles:
//  *   get:
//  *     tags:
//  *       - Roles
//  *     description: Returns a list of all roles in the database
//  *     produces:    
//  *       - application/json   
//  *     responses:
//  *       200:  
//  *         description: A successful response
//  */
// router.route('/').get(verifyToken, roleController.index);

// /**
//  * @swagger
//  * /roles/{id}:
//  *   parameters:
//  *     id:
//  *       name: id
//  *       in: path
//  *       required: true
//  *       type: string
//  *   get:
//  *     tags:
//  *       - Roles
//  *     description: Return a specific role by its ID
//  *     produces:
//  *       - application/json          
//  *     responses:
//  *       "200":
//  *         description: Successfully returned the specified role
//  *       "401": 
//  *         description: The user is not authorized to view this data    for any reason
//  *       "404":  
//  *         description: No role with that identifier was found          
//  */     
// router.route('/:id').get(verifyToken, roleController.show);
