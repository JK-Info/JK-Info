import axios from "axios";

const api_url = 'http://172.16.2.146:3000';

const fetchUsers = async () => {
    try{
        const response = axios.get(api_url);
        console.log((await response).data);
    }catch (error){
        console.error('Error fetching users:', error);
    }
};

const createUSer = async (name, age) => {
    try {
        const response = await axios.post(API_URL, { name, age });
        console.log('User created:', response.data);
      } catch (error) {
        console.error('Error creating user:', error);
      }
}