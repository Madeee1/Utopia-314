import { Request, Response } from "express";
import { UserDto } from "./dto/user.dto";
import { userSchema } from "../models/user.schema";
import bcrypt from "bcrypt";

// Gets data from controller, and gets data from the database
// Returns the data to the controller
export async function comparePassword(
  password: string,
  hashPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashPassword);
}

// TODO: CHANGE class name to "User"
export class userEntity {
  constructor() {}
  // SIGN IN user is here
  async signIn(event: any, body: UserDto) {
    const { username, password } = body;

    let user: any;
    // Find the user in the database
    try {
      user = await userSchema.findOne({ username });
    } catch (error: any) {
      throw createError({
        statusCode: 400,
        message: error.message,
      });
    }

    // Check the password
    const isPasswordValid = await comparePassword(
      password,
      String(user.hashPassword)
    );

    if (!isPasswordValid) {
      throw createError({
        statusCode: 400,
        message: "Invalid username or password",
      });
    } else {
      return {
        ok: true,
        username: user.username,
        role: user.role,
        email: user.email,
        id: user.id,
      };
    }
  }

  // CREATE user is here
  async signUp(event: any, body: UserDto) {
    // Create user in the database
    // Return the created user
    try {
      const response = await userSchema.create({
        username: body.username,
        email: body.email,
        hashPassword: body.password,
        role: body.role,
      });
      return { ok: true };
    } catch (error: any) {
      throw createError({
        statusCode: 400,
        message: error.message,
      });
    }
  }

  // Update AGENT profile is here
  async updateAgent(event: any, body: any) {
    const { _id, email } = body;

    // Update the user in the database
    // Return the updated user
    try {
      const response = await userSchema.findOneAndUpdate(
        { _id },
        { email },
        { new: true }
      );
      return { ok: true, response };
    } catch (error: any) {
      return { ok: false, message: error.message };
    }
  }

  // update BUYER profile is here
  async updateBuyer(event: any, body: any) {
    const { _id, email } = body;

    // Update the user in the database
    // Return the updated user
    try {
      const response = await userSchema.findOneAndUpdate(
        { _id },
        { email },
        { new: true }
      );
      return { ok: true, response };
    } catch (error: any) {
      return { ok: false, message: error.message };
    }
  }

  // update SELLER profile is here
  async updateSeller(event: any, body: any) {
    const { _id, email } = body;

    // Update the user in the database
    // Return the updated user
    try {
      const response = await userSchema.findOneAndUpdate(
        { _id },
        { email },
        { new: true }
      );
      return { ok: true, response };
    } catch (error: any) {
      return { ok: false, message: error.message };
    }
  }


  async addSellerReview(body: any) {
    const { sellerId, review } = body;

    try {
      const response = await userSchema.findOneAndUpdate(
        { id: sellerId },
        { $push: { reviews: review } }
      );
      return { ok: true, value: response };
    } catch (error: any) {
      return { ok: false, message: error.message };
    }
  }

  // POST to add to seller rating
  async addSellerRating(body: any) {
    const { sellerId, rating } = body;

    try {
      const response = await userSchema.findOneAndUpdate(
        { id: sellerId },
        { $push: { ratings: rating } }
      );
      return { ok: true, value: response };
    } catch (error: any) {
      return { ok: false, message: error.message };
    }
  }



}
