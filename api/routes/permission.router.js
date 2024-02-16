import express from 'express';
import {getAllPermissions} from '../controllers/permission.controller.js'

const router = express.Router();


// router.post('/', addPermission)
router.get('/', getAllPermissions);
// router.patch('/assign', permissionController.assignPermissionToRole)
// router.put('/:id',permissionController.updatePermission);
// router.delete('/:id',permissionController.deletePermission);


export default router;
