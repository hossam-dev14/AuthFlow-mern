import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

// Loading environment variables from .env file
dotenv.config();

const secret = process.env.ACCESS_TOKEN_SERCET;

// Function to register a new user
export const signup = async (req, res) => {
    const { username, email, password, role } = req.body;
    
    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    if(!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide all fields"
        });
    }

    const defaultRole = await Role.findOne({name: "user"})
    // const userRole = await Role.findOne({name: "user"});
    // if (!defaultRole) {
    //   return res.status(500).json({ message: 'Default role not found' });
    // }

    try{
        // create and save new user in the database
        let user = new User({
            username,
            email,
            password: hashedPassword,
            role: defaultRole
        });
        
        // Save the new user to the database
        await user.save();
        // const newUser = await User.create({ username, email, password: hashedPassword });

        // Generate a JWT and return the user with the token
        const accessToken = jwt.sign({ 
            sub: user._id, // stands for "subject", which is a unique identifier for the user in the database. 
            username: user.username, 
            email: user.email,
            role: user.role 
        },
            process.env.ACCESS_TOKEN_SERCET, {
            expiresIn: "1h",
        });
        res.status(201).json({
            message: `Welcome ${username}! Your account has been successfully created.`,
            user,
            accessToken
        })
    }
    catch(error){
        return res.status(400).json({
             message: 'error.message'
        });
    }
   
};
  
// Function to log in a user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // const hashedPassword = bcrypt.hashSync(password, 10);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found!');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send('wrong credentials');
        }

        // create JWT
        // access token
        const accessToken = jwt.sign({ sub: user._id,username: user.username, email: user.email, role: user.role},  
            // secret key
            secret, 
            { expiresIn: '7d'}
        );

        res.status(200).send({ 
            accessToken,
            user
        });

    } catch (err) {
        console.log('Error:', err.message);
    };
};


// Function to log out a user
export const logout = async (req, res) => {
try {
    // Remove the token from the request
    req.token = null;

    // Return a response with the token and user information
    return res.status(200).json({
    message: 'Successfully logged out'
    });
} catch (err) {
    // Return an error response in case of an error
    return res.status(501).json({ message: 'Error logging out' });
}
};


// export const signup = async (req, res) => {
//     const { username, email, password } = req.body;
    
//     // encrypt the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = bcrypt.hashSync(password, salt);

//     if(!username || !email || !password) {
//         return res.status(400).json({
//             message: "Please provide all fields"
//         });
//     }

//     try{
//         // create and save new user in the database
//         let newUser = new User({
//             username,
//             email,
//             password: hashedPassword,
//         });
        
//         // Save the new user to the database
//         await newUser.save();
//         // const newUser = await User.create({ username, email, password: hashedPassword });

//         // Generate a JWT and return the user with the token
//         const accessToken = jwt.sign({ 
//             sub: user._id, 
//             username: user.username, 
//             email: user.email, 
//             role: user.role 
//         },
//             process.env.ACCESS_TOKEN_SERCET, {
//             expiresIn: "1h",
//         });
//         res.status(201).json({
//             message: `Welcome ${username}! Your account has been successfully created.`,
//             newUser,
//             accessToken
//         })
//     }
//     catch(error){
//         return res.status(400).json({
//             message: error.message
//         });
//     }
   
// };

// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         // const hashedPassword = bcrypt.hashSync(password, 10);

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).send('User not found!');
//         }

//         const validPassword = await bcrypt.compare(password, user.password);
//         if (!validPassword) {
//             return res.status(401).send('wrong credentials');
//         }

//         // create JWT
//         // access token
//         const accessToken = jwt.sign({ sub: user._id,username: user.username, email: user.email, role: user.role},  
//             // secret key
//             secret, 
//             { expiresIn: '7d'}
//         );

//         res.status(200).send({ 
//             accessToken,
//             user
//         });

//     } catch (err) {
//         console.log('Error:', err.message);
//     };
// };


// middleware for checking JWT validity

export const isAuthenticated = (req, res, next) => {
    const token = req.headers['x-auth'];
    if (!token) {
        return next(createError.Unauthorized('No Token Provided'));
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SERCET, (err, decoded) => {
        if (err) {
            return next(createError.Unauthorized('Token Invalid'));
        }
        req.userId = decoded._id;
        next();
    })
}

// checks if a user has admin rights
export const isAdmin = (req, res, next) => {
    User.findById(req.userId)
        .then((user) => {
            if (user && user.admin === true) {
                next();
            } else {
                throw new Error("Not Authorized");
            }
        }).catch(next);
};


