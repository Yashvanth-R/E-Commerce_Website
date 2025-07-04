import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";

const genereateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });

    return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
    await redis.set(`refresh_token:${userId}`, refreshToken, 'EX', 60 * 60 * 24 * 7); // Store for 7 days
}

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};

export const signup = async (req, res) => {
    const {email, password, name} = req.body;
    try {
        const userExists = await User.findOne({ email });

    if(userExists) {
        return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
        email,
        password,
        name
    });

    const {accessToken, refreshToken} = genereateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
    }, message: "User created successfully"});
} catch (error) {
    res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    res.send("Login Route Called");
}

export const logout = async (req, res) => {
    res.send("Logout Route Called");
}