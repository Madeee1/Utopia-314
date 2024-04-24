import { Request, Response } from 'express';
import { UserDto } from '~/server/entity/dto/user.dto';
import { userSchema } from '~/server/models/user.schema';

// Gets data from controller, and gets data from the database
// Returns the data to the controller

export class userEntity {
    constructor() {}

    // CREATE user is here
    async signUp(formData: UserDto) {
        // Create user in the database
        // Return the created user
        try {
            const response = await userSchema.create({
                username: formData.username,
                email: formData.email,
                hashPassword: formData.password,
                role: formData.role
            });
            return {statusCode: 201, message: 'User created successfully', data: response}
        }
        catch (error: any) {
            return {statusCode: 400, message: 'Error creating user', data: error}
        }
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
