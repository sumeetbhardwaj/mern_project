import axios from "axios";
import { API_URL } from "../../config";
import storage from "../../utils/storage";


const ProductApi = async() => {
    try {    
        const getToken = storage.getToken();
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get_products`,
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



export default ProductApi