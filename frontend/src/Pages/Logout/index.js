import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import storage from '../../utils/storage';
import { API_URL } from "../../config";

const Logout = () => {
  const { isAuthenticated, logout } = useAuth();

 

  useEffect(() => {

    const logoutApi = async() => {
      try {    
          const getToken = storage.getToken();
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/logout`,
              {
                  headers: {
                      'Authorization': `Bearer ${getToken}`
                  }
              }
          );
         return await response?.data; 
        } catch (error) {
          return error;
        }
    }
      logoutApi() 
      logout();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect to dashboard if authenticated
  } else {
    return <Navigate to="/products" />;
  }
};

export default Logout;
