import { defineMongooseModel } from '#nuxt/mongoose'
import bcrypt from 'bcrypt';

export const userSchema = defineMongooseModel({
    name: "User",
    schema: {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        hashPassword: {
            type: String,
            required: true,
        },
    },
    hooks(schema) {
        // Add a pre-save hook to hash the password
        schema.pre('save', async function (next) {
            const user: any = this
            if (!user.isModified('hashPassword')) return next()
            // Hash the password
            user.hashPassword = await bcrypt.hash(user.hashPassword, 10)
            return next()
        })
    },
})