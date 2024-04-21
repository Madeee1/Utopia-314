import { defineMongooseModel } from '#nuxt/mongoose'

export const userSchema = defineMongooseModel({
    name: "User",
    schema: {
        uuid: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        hashPassword: {
            type: String,
            required: true,
        },
    },
})