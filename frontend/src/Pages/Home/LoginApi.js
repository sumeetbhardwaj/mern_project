import axios from "axios";
import { API_URL } from "../../config";

export const LoginApi = async(values) => {
    try {    
        const response = await axios.post(`${API_URL}/signin`,values);
        return await response.data; 
      } catch (error) {
        return error;
      }
}