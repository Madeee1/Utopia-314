import axios from 'axios';
import { userEntity } from '~/server/entity/user.entity';
import { UserDto } from '~/server/entity/dto/user.dto';

// Accepts POST data from API at /api/signup
// Does business logic here, and constructs repository object to interact with database
export class signUpController {
    constructor() {}

    async signUp(formData: any) {
        const userRepo = new userEntity()
        return await userRepo.signUp(formData)
    }

}

/*
export const actions = {
    async signUp({ commit }: { commit: any }, formData: any) {
        try {
            const response = await axios.post('/api/signup', formData);
            const user = response.data.user;
            commit('SET_USER', user); // Assuming you have a mutation to set the user in the store
            // Redirect or do something after successful signup
        } catch (error: any) {
            console.error('Error signing up:', error.response.data);
            // Handle error, show error message, etc.
        }
    }
}
*/