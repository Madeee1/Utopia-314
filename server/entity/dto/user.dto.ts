import { Types } from 'mongoose'

export class UserDto {
    username!: string;
    hashPassword!: string;
    email!: string;
    password!: string;
    role!: string;
}