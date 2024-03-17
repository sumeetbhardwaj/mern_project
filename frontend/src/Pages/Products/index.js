import React,{useEffect, useState} from 'react'
import Layout from '../../components/Layout'
import TableRow from './TableRow';
import ProductApi from './ProductApi';
import { API_URL } from '../../config';
import storage from '../../utils/storage';
import axios from 'axios';
import EditProductModal from './EditProductModal';
import EditProductApi from './EditProductApi';



const Products = () => {

 const [products, setProducts] = useState("")
 const [sigleProduct, setSingleProduct] = useState("")
 const [message, setMessage] = useState("")
 const [editModalShow, setEditModalShow] = useState(false)
 const [isLoaging, setLoading] = useState(false)

 // get all products
  useEffect(() => {
    const getproductsData = async() =>{
      const response = await ProductApi();
      if(response.statusCode === 200){
        setLoading(true)
        setProducts(response)
      } else if(response?.response?.data?.statusCode === 400){
        setProducts(response?.response?.data);
      }
    }
    getproductsData()
  }, []);

  //disable message
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(''); // Hide the message after 3000 milliseconds (3 seconds)
    }, 3000);

    return () => {
      clearTimeout(timer); // Cleanup the timer when component unmounts or when message changes
    };
  }, [message]);


 
    // Assuming you have functions to handle delete 
    const handleDelete = async(productId) => {
      try {    
        const getToken = storage.getToken();
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/delete_product/${productId}`,
            {
                headers: {
                    'Authorization': `Bearer ${getToken}`
                }
            }
        );
        const result = await response;
        if( result?.data?.statusCode === 200){
          setMessage(response?.data?.msg);
          // Filter out the deleted product from the products state
          const updatedProducts = products.products.filter(product =>
            product._id !== productId
          );
          // Set the state with the updated products
          setProducts({ ...products, products: updatedProducts });
        }else{
          console.log(result?.data.statusCode)
        }

      } catch (error) {
        return error; 
      }
    };

    //close update proctuct modal
    const handleCloseModal = () =>{
      setEditModalShow(false)
    }

  // Assuming you have functions to handle delete 
  const handleEdit = async (productId) => {
      
    try {    
   
        setSingleProduct( products.products.filter(product =>
          product._id === productId
        )[0])
        setEditModalShow(true)
      
      
    } catch (error) {
      return error; 
    }
  };

  //update product
  const onSubmit = async(values) => {
    setEditModalShow(false)
    const result = await EditProductApi(values)
    if(result?.statusCode === 200 ){
      
      // Find the index of the object to be updated
      const updatedPro = products.products.findIndex(proData => proData._id === result?.product._id);

      // If the object exists, update its price
      if (updatedPro !== -1) {
        products.products[updatedPro] = result?.product;
      } 
      // Set the state with the updated products
      setProducts(products);
      setMessage(result?.msg);
    } if (result?.response?.data?.statusCode === 400) {
      result?.response?.data?.errors.map((data) => {
        const {field, message } = data;
        return null;
      })

    } 
  }
if(!isLoaging){
  return (
    <Layout>
      <div>Loading...</div>
    </Layout>)
}

  return (
    <Layout>
         <div className='container min_hieght'>
          <div className="bd-example">
            {message && <span>{message}</span>}
            <table className="table table-striped table-hover">
                <thead>
              <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Discriptions</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.products ? products.products
              .map((product, index) => (
                <TableRow key={index+1} product={product} handleDelete={handleDelete} handleEdit={handleEdit}/>
              )) : <tr>
                    <td colSpan="5" style={{"textAlign": "center"}}>{products?.msg}</td>
                </tr>
            }
            </tbody>

            </table>
          </div>
         </div>
         {sigleProduct && <EditProductModal editModalShow={editModalShow} sigleProduct={sigleProduct} handleCloseModal={handleCloseModal} onSubmit={onSubmit}/>}
         
    </Layout>   
  )
}

export default Products