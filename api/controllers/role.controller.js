import User from '../models/user.model.js';
import Role from '../models/role.model.js';


// Controller for role management
export const roleController = {
  // Function to update an existing role
  updateRole: async (req, res) => {
    // Extract the role ID from the request
    const { id } = req.params;
    // Extract the new role name from the request
    const { name } = req.body;

    try {
      // Update the role in the database using the ID
      const updatedRole = await Role.findByIdAndUpdate(id, { name });

      // Check if the role was found and updated successfully
      if (!updatedRole) {
        res.status(400).json({ message: 'Can not find role' });
      }

      // Return a response with a status 200 in case of success
      res.status(200).json({ message: 'Role updated successfully' });
    } catch (error) {
      // In case of error, return an error response with a status 400
      res.status(400).json({ message: 'Failed to update role' });
    }
  },

  // Function to add a new role
  addRole: async (req, res) => {
    // Extract the name of the new role from the request
    const { name } = req.body;

    try {
      // Create a new role in the database
      await Role.create({ name });

      // Return a response with a status 200 in case of success
      res.status(200).json({ message: 'Role created successfully' });
    } catch (err) {
      // In case of error, return an error response with a status 501
      res.status(501).json({ message: 'Error creating role' });
    }
  },

  // Function to get all roles
  getRoles: async (req, res) => {
    try {
      // Get all roles from the database
      const roles = await Role.find();

      // Return a response with a status 200 and the roles data
      res.status(200).json({ data: roles });
    } catch (err) {
      // In case of error, return an error response with a status 501
      res.status(501).json({ message: 'Error getting role' });
    }
  },

  // Function to delete a role
  deleteRole: async (req, res) => {
    try {
      await Role.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Role deleted successfully' });
    } catch (err) {
      console.error({ message: 'Error deleting role' }, err);
    }
  },

  // Function to assign a role to a user
  assignRoleUser: async (req, res) => {
    // Extract the user ID and role ID from the request
    const { userId, roleId } = req.body;

    try {
      // Find the user in the database
      const user = await User.findById(userId);
      // Check if the user exists
      if (!user) res.status(404).json({ message: 'User Not Found' });

      // Find the role in the database
      const role = await Role.findById(roleId);
      // Check if the role exists
      if (!role) res.status(404).json({ message: 'Role Not Found' });

      // Assign the role to the user
      user.role = role._id;
      // Save the user's modifications to the database
      await user.save();

      // Return a response with a status 200 in case of success
      res.status(200).json({ message: 'Role assigned to the user successfully' });
    } catch (err) {
      console.log(err);
      // In case of error, return an error response with a status 501
      res.status(501).json({ message: 'Error Role Assigned' });
    }
  },
};


