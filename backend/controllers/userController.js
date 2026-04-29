import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from "mongoose"
import redisClient from "../config/redisClient.js"

export const register = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await userModel.findOne({ username });
        if (user) {

            return res.status(500).json({ message: "An user with this username already exists!" })

        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new userModel({ username, password: hashedPassword })
        await newUser.save();

        return res.status(201).json({ message: "User is created!" })


    } catch (error) {
        return res.status(500).json({ message: "Something went wrong with register" })
    }
}

const login = async (req, res) => {
    try {

        const { username, password } = req.body
        const cacheKey = `user:${username}`;

        // Try to fetch user from Redis cache
        let user;
        const cachedUser = await redisClient.get(cacheKey);

        if (cachedUser) {
            console.log("Cache hit for user:", username);
            user = JSON.parse(cachedUser);
        } else {
            console.log("Cache miss for user:", username);
            // Fetch from MongoDB if not in cache
            user = await userModel.findOne({ username })
            if (!user) {
                return res.status(500).json({ message: "Invalid credentials" })
            }

            // Cache the user data for 1 hour (3600 seconds)
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(user));
        }

        const PasswordMatch = await bcrypt.compare(password, user.password)

        if (!PasswordMatch) {
            return res.status(500).json({ message: "Invalid password" })
        }

        // Set JWT expiry to 1 hour
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.cookie('userToken', token, {
            httpOnly: true,
            maxAge: 3600000 // 1 hour in milliseconds
        })

        return res.status(200).json({ message: "login successful", token, user })



    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Something went wrong with login" })
    }
}


export const searchPeople = async (req, res) => {
    try {

        const { query } = req.query
        if (!query) {
            return res.status(500).json({ message: "No query found" })
        }

        const people = await userModel.find({
            username: { $regex: query, $options: "i" }
        }).select("-password").select("-rooms").select("-notifications").select("-cloudinary_id")

        if (people.length < 1) {
            return res.status(200).json({ message: "no people is found", people: [] })
        }

        // console.log(people);

        return res.status(200).json({ message: "found people", people: people })


    } catch (error) {
        return res.status(500).json({ message: "Something went wrong with searching", error: error.message })
    }
}


export const getMessages = async (req, res) => {
    try {

        const myId = req.user
        return myId


    } catch (error) {
        return res.status(500).json({ message: "Something went wrong with fetching messages", error: error.message })
    }
}
export default login