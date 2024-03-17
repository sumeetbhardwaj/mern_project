import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react'
import AddProductschema from '../../utils/AddProductValidations';
import { AddProductApi } from './AddProductApi';

const AddProductForm = () => {

  const[message, setMessage] = useState("")

  const formik = useFormik({
    initialValues: {
      name : '',
      description:'',
      price: '',
    },
    validationSchema: AddProductschema,

    onSubmit: async(values) => {

      let response =  await AddProductApi(values)

      if (response?.response?.data?.statusCode === 400) {
        response?.response?.data?.errors.map((data) => {
          const {field, message } = data;
          formik.errors[field] = message;
          return null;
        })

      } else {
        setMessage(response.msg)
        formik.resetForm()
      }
    },
  }); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(''); // Hide the message after 3000 milliseconds (3 seconds)
    }, 3000);

    return () => {
      clearTimeout(timer); // Cleanup the timer when component unmounts or when message changes
    };
  }, [message]);


  return (
    <>
    {message && <span>{message}</span>}
    <form onSubmit={formik.handleSubmit}>
        <input 
              type="text" 
              name="name" 
              placeholder="Please enter product name"
              onChange={formik.handleChange}
              value={formik.values.name }
              />
        {formik.touched.name  && formik.errors.name  && (
            <div className='error'>{formik.errors.name }</div>
        )}
        <input 
              type="text" 
              name="description" 
              placeholder="Please enter product description"
              onChange={formik.handleChange}
              value={formik.values.description } 
              />
        {formik.touched.description  && formik.errors.description  && (
            <div className='error'>{formik.errors.description }</div>
        )}
        <input 
              type="text" 
              name="price" 
              placeholder="Please enter product price" 
              onChange={formik.handleChange}
              value={formik.values.price } 
              />
        {formik.touched.price  && formik.errors.price  && (
            <div className='error'>{formik.errors.price }</div>
        )}
        <input 
            type="submit" 
            value="Add New Product" />
    </form> 
    </>
    
  )
}

export default AddProductForm