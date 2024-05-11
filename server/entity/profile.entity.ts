import { Request, Response } from "express";
import { profileDto } from "./dto/profile.dto";
import { profileSchema } from "../models/profile.schema";

// Gets data from controller, and gets data from the database
// Returns the data to the controller

export class profileEntity {
  constructor() {}
  // CREATE profile is here
  async createP(event: any, body: profileDto) {
    // Create profile in the database
    // Return the created profile
    try {
      const response = await profileSchema.create({
        profile: body.profile,
      });
      return "Profile created successfully!";
    } catch (error: any) {
      throw createError({
        statusCode: 400,
        message: error.message,
      });
    }
  }

  async viewP(event:any, body: profileDto) {
      const profiles = await profileSchema.find({}, {profile:1, _id:0});
      
      return {
        profiles: profiles,
      };
    }

    async deleteP(event: any, body: profileDto) {
      // Create profile in the database
      // Return the created profile
      try {
        const response = await profileSchema.deleteMany({
          profile: body.profile,
        });
        return "Profile deleted successfully!";
      } catch (error: any) {
        throw createError({
          statusCode: 400,
          message: error.message,
        });
      }
    }
  }

