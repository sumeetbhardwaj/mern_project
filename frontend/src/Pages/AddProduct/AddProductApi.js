import axios from "axios";
import { API_URL } from "../../config";
import storage from "../../utils/storage";

export const AddProductApi = async (values) => {
    try {    
        const getToken = storage.getToken();
        const response = await axios.post(`${API_URL}/add_product`, values, {
            headers: {
                'Authorization': `Bearer ${getToken}`
            }
        });
        return response.data; 
    } catch (error) {
        return error;
    }
}
