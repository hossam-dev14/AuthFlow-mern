// import mongoose from 'mongoose';
import Permissions from '../models/permission.model.js';
// import User from '../models/user.model.js';
// import Role from '../models/role.model.js';

// Create permissions
export const createPermission = async (req, res) => {
  try {
    const permission = await Permissions.create(req.body);
    res.status(201).send(permission);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permissions.find();
    res.status(200).send(permissions);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all permissions
// export const getAllPermissions = async (req, res) => {
//     // console.log(Permission);
//     try {
//         // Retrieve all permissions from the database
//         let permissions = await Permissions.find();

//         // If no permissions are found, return a 401 status with a message
//         if (!permissions) {
//             return res.status(401).json({ msg: 'No permissions found' });
//         } else {
//             // If permissions are found, return a 200 status with the permissions
//             return res.status(200).json(permissions);
//         }
//     } catch (err) {
//         // If an error occurs during the process, log the error and return a 500 status with a message
//         return res.status(500).json({ msg: "Error while processing the request" });
//     }
// }
    
// // Assign a role to a user
// assignUserRole: async (userId, roleId) => {
//     // Find the user in the database by their id
//     const user = await User.findById(userId);
    
//     // Check if the user was not found
//     if(!user){
//         throw new Error('This user does not exist');
//     }

//     // Add the role to the users roles array
//     user.roles.push(roleId);

//     // Save the changes to the database
//     await user.save();
// },

// Function to add a new permission
// addPermission: async (req, res) => {
//     // Extract data from the request (permission name, associated role ID)
//     const { name } = req.body;
//     try {
//         // Create a new permission in the database
//         const permission = await Permission.create({ name });
//         // return permission;

//         // // Add the permission to a role
//         // const roleId = '...'; // Specify the role ID
//         // const role = await addPermissionToRole(roleId, permission._id);
        
//         // const role = await Role.findById(roleId);
//         // if (!role) {
//         //     throw new Error('Role not found');
//         // }
//         // role.permissions.push(permissionId);
//         // await role.save();
//         // return role;

//         // Add the permission to a role
//         const roleId = '65cc87f68167a39c56e3913c'; // Specify the role ID

//         // If a role ID is provided, associate the new permission with the corresponding role
//         if (roleId) {
//             console.log(roleId);
//             // Update the role by adding the ID of the new permission to the permissions list
//             await Role.findOneAndUpdate(
//                 { _id: roleId },
//                 {
//                     $push: {
//                         permissions: newPermission._id,
//                     },
//                 }
//             );
//         }

//         // Return a response with a status 201 in case of success
//         res.status(201).json({ message: 'Permission created successfully' });
//     } catch (err) {
//         // In case of error, return an error response with a status 500
//         res.status(500).json({ message: 'Error creating permission' });
//     }
// },




// Function to save a new permission
// savePermission: (req, res) => {
//     // Create a new permission object with data from the request body
//     const permission = new Permission({
//         name: req.body.name,
//         description: req.body.description
//     });

//     // Save the permission to the database
//     permission.save((err, permissionStored) => {
//         // Check for errors during the saving process
//         if (err) {
//             // If an error occurs, return a 500 status with an error message
//             return res.status(500).send({ message: `Error saving the permission to the database: ${err}` });
//         } else {
//             // If the permission is successfully saved, return a 200 status with the saved permission object
//             return res.status(200).send({ permission: permissionStored });
//         }
//     });
// },

// Function to delete a permission
// deletePermission: (req, res) => {
//     // Extract permission ID from the request parameters
//     let permissionId = req.params.id;

//     // Delete the permission from the system
//     Permissions.deletePermission(permissionId, (err, permissionRemoved) => {
//         // Check for errors during the deletion process
//         if (err) {
//             // If an error occurs, return a 500 status with an error message
//             return res.status(500).send({ message: `Error deleting the permission from the system` });
//         }
        
//         // If the permission to be deleted does not exist, return a 404 status with a message
//         if (!permissionRemoved) {
//             return res.status(404).send({ message: 'The permission does not exist' });
//         }
        
//         // Remove roles associated with this permission
//         Roles.removePermission(permissionRemoved.name.toString(), (err, rsp) => {
//             if (err) console.log(err);
//         });

//         // Return a 200 status with a success message
//         res.status(200).send({ message: `The permission ${permissionRemoved.name} has been successfully deleted` });
//     });
// },

// assignPermissionToRole: async (req, res) => {
//     try {
//       const { roleId, permissionId } = req.body;
  
//       // If a role ID is provided, associate the new permission with the corresponding role
//       if (roleId || permissionId) {
//         console.log(roleId);
//         // Update the role by adding the ID of the new permission to the permissions list
//         const updatedRole = await Role.findOneAndUpdate(
//           { _id: roleId },
//           {
//             $push: {
//               permissions: permissionId,
//             },
//           }
//         );
//       }
  
//       // Return a response with a status 201 in case of success
//       res.status(201).json({ message: 'Permission assigned successfully' });
//     } catch (err) {
//       // In case of error, return an error response with a status 501
//       res.status(501).json({ message: 'Error assigning permission' });
//     }
// },

// Function to update a permission
// updatePermission: async (req, res) => {
//     try {
//     // Extract the ID from the request parameters
//     const { id } = req.params;

//     // Check if the ID is missing
//     if (!id) {
//         return res.status(404).json({ message: "id not found, can't update" });
//     }

//     // Update the permission in the database
//     await Permission.findByIdAndUpdate(id, req.body);

//     // Return a success message
//     return res.status(200).json({ message: 'Permission updated successfully' });
//     } catch (err) {
//     // Return an error message if an error occurs
//     return res.status(500).json({ message: 'Error updating permission' });
//     }
// },  




// // Function to retrieve permissions of a user
// getUserPermissions: (req, res) => {
//     // Extract user ID from the query parameters
//     let userId = req.query.userId;

//     // Find the user by ID in the database
//     User.findById(userId, (err, user) => {
//         // Check for errors during the search process
//         if (err) {
//             // If an error occurs, return a 500 status with an error message
//             return res.status(500).send({ message: `Error while processing the request: ${err}` });
//         } else if (!user) {
//             // If the user is not found, return a 404 status with a message
//             return res.status(404).send({ message: `User with id ${userId} not found` });
//         }

//         // Extract permissions from the user's roles and flatten them into a single array
//         let userPermissions = user.roles.map(role => role.permissions).reduce((a, b) => a.concat(b), []);

//         // Return a 200 status with an object containing an array of permission names
//         res.status(200).send({ permissions: userPermissions });
//     });
// }



