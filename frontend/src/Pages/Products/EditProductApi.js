import axios from "axios";
import { API_URL } from "../../config";
import storage from "../../utils/storage";

const EditProductApi = async(values) => {

    try {    
        const getToken = storage.getToken();
        const response = await axios.put(`${API_URL}/update_product/${values._id}`,values,
            {
                headers: {
                    'Authorization': `Bearer ${getToken}`
                }
            }
        );
       return await response.data; 
      } catch (error) {
        return error;
      }
}

export default EditProductApi