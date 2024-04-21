import axios from 'axios';

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
  