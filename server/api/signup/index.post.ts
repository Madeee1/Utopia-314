import { signUpController } from '~/server/controller/user/signUp.controller'

export default defineEventHandler(async (event) => {
    const controller = new signUpController()
    
    return await controller.signUp(event)
})