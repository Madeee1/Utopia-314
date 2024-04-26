import { Request, Response } from 'express';
import { UserDto } from './dto/user.dto';
import { userSchema } from '../models/user.schema';
import bcrypt from 'bcrypt';

// Gets data from controller, and gets data from the database
// Returns the data to the controller

export class userEntity {
    constructor() {}
    // SIGN IN user is here
    async signIn(event: any, body: UserDto) {
        // Find user in the database based on email
        // Check if password matches
        // Return the user if successful
        try {
            const user = await userSchema.findOne({ email: body.email });
            if (!user) {
                throw createError({
                    statusCode: 404,
                    message: "User not found",
                });
            }
            const isPasswordValid = this.comparePassword(body.password);
            if (!isPasswordValid) {
                throw createError({
                    statusCode: 401,
                    message: "Invalid password",
                });
            }
            return user;
        } catch (error: any) {
            throw createError({
                statusCode: 400,
                message: error.message,
            });
        }
    }
    // CREATE user is here
    async signUp(event: any, body: UserDto) {
        // Create user in the database
        // Return the created user
        try {
            console.log(body)
            const response = await userSchema.create({
                username: body.username,
                email: body.email,
                hashPassword: body.password,
                role: body.role
            });
            return "User created successfully!"
        }
        catch (error: any) {
            throw createError({
                statusCode: 400,
                message: error.message,
            })
        }
    }

    comparePassword(candidatePassword: string) {
          const user: any = this;
          return bcrypt.compare(candidatePassword, user.hashPassword);
        }
}

/*
// pages/api/signup.js
export default function (req: Request, res: Response) {
        if (req.method === 'POST') {
            // Handle sign up logic based on the role
            const { username, email, password, role } = req.body;
            // Perform validation, create user, etc.
            // For brevity, assuming user creation is successful
            const newUser = { username, email, role };
            res.status(201).json({ user: newUser });
        } else {
            res.status(405).end(); // Method Not Allowed
        }
    }
*/ 
