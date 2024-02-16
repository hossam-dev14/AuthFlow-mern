
import User from "../models/user.model.js";


// Controller for user management
export const userController = {

    // Retrive all users
    getUsers: async (req, res) => {
        try {
            const users = await User.find().select('-password');
            if(!users)
            { res.status(500).json({ message:'The users was not found!' }) }
            res.status(200).json({ users })
        } catch (err) {
           console.error(err.message); 
           if (err.kind === 'ObjectId') { res.status(404).send("User not found")}
           else{res.status(500).send(err)}
        }
     },

    // GET user by ID
    userById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).select('-password');
            if(!user) 
            { res.status(500).json({message: 'The user with the given ID was not found!'}) }
            res.status(200).json({ user })
        } catch (err) {
            console.error(err.message);
            if (err.kind === 'ObjectId') { res.status(404).send("User not found")}
            else{res.status(500).send(err)}
        }
    },

    // Update the data of a user
    updateUser: async (req, res, next) => {
        // Check if the user is trying to edit another users role
        if (req.userId!== req.params.id &&!req.isAdmin) {
            return res.status(403).json({ message: "You don't have permission to perform this action" })
        }
        
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json({ updatedUser, message: 'User updated successfully.'});
        } catch (error) {
            console.error(err.message);
            if (err.kind === 'ObjectId') { res.status(404).send("User not found")}
            else{res.status(500).send(err)}
        }
    },

    // Delete a user by ID
    deleteUser: async (req, res) => {
        try{
            await User.findByIdAndDelete({_id : req.params.id});
            res.status(200).json({message:'User deleted successfully.'});
        }catch(err){
            res.status(500).json({message: 'Could not delete user.'});
            console.log(err);
        }
    }

};










/**
 * Middleware to authorize an admin user only. If the logged-in user is not an admin, it will redirect them to the home page.
 * Middleware to authorize an admin only access. If the logged-in user is  not an admin, it will redirect them to home page with error message.
 * Middleware to authorize an admin user only. If the logged-in user is not 
 * an admin, it will send a response with status code of 403 and a JSON object  
 * indicating that the user is unauthorized.
 */

/**
 * Middleware to check whether a user is authorized to perform an action.
 * @param {string[]} roles - The required role(s) for access.
 */
export const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    req.flash("warning", `You do not have permission to view this page.`);
    return res.status(403).send();
  }
  return next();
};


/**
 * Middleware to check whether a user is authenticated or not.
 */
export const requireAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Please log in first.' });
    }
    User.findById(req.userId)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
};




