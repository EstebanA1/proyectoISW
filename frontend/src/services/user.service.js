import axios from './root.service';

export async function createUser(user) {
  try {
    const response = await axios.post('/users', user);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default createUser;