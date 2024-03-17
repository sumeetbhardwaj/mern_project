import axios from "axios";
import { API_URL } from "../../config";

export const SignupApi = async(values) => {
    try {    
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`,values);
        return await response.json().data; 
      } catch (error) {
        return error;
      }
}