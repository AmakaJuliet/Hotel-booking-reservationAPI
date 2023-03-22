import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js'
import jwt from 'jsonwebtoken';


export const register = async (req,res,next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            ...req.body,
            pasword: hash,
        });

        const user = await newUser.save();

        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
};
export const login = async (req,res,next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if(!user) return next(createError(404, "User Not Found"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.pasword);

        if(!isPasswordCorrect)
          return next(createError((400, "Wrong Password or username"))) 
        
        const token = jwt.sign({
          id: user._id, isAdmin: user.isAdmin
        },
         process.env.JWT
        )

    const { pasword, isAdmin, ...otherDetails } = user._doc;

    res.cookie("access_token", token, {
        httpOnly: true,
    })
    .status(200)
    .json({ details: { ...otherDetails }, isAdmin, access_token: token })

    } catch (error) {
        next(error)
    }
};