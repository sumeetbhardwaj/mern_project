import axios from "axios";
import { API_URL } from "../../config";

export const SignupApi = async(values) => {
    try {    
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`,JSON.parse(values));
        return await response.data; 
      } catch (error) {
        return error;
      }
}