import axios from "axios";
import { API_URL } from "../../config";

export const SignupApi = async(values) => {
    try {    
        const response = await axios.post(`${API_URL}/signup`,values);
        return await response.data; 
      } catch (error) {
        return error;
      }
}