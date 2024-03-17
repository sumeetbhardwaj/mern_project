import { useFormik } from 'formik';
import React from 'react'
import Signupschema from '../../utils/SignupValidations';
import { SignupApi } from './SignupApi';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';



const SignupForm = () => {
 const {isAuthenticated, loginUser} = useAuth();
  const formik = useFormik({
    initialValues: {
      name : '',
      email:'',
      password: '',
    },
    validationSchema: Signupschema,

    onSubmit: async(values) => {


      let response =  await SignupApi(values)

      if(response?.statusCode === 400) {

        formik.errors.email = response.msg

      } else if (response?.response?.data?.statusCode === 400) {

        response?.response?.data?.errors.map((data) => {
          const {field, message } = data;
          formik.errors[field] = message;
          return null;
        })

      } else {
        loginUser(response?.user?.token)
      }
    },
  }); 

  if (isAuthenticated) {
    return <Navigate to="/products" />; // Redirect to dashboard if authenticated
  }

  return (
    <form onSubmit={formik.handleSubmit}>
        <input 
              type="text" 
              name="name" 
              placeholder="Please enter your fullname"
              onChange={formik.handleChange}
              value={formik.values.name }
              />
        {formik.touched.name  && formik.errors.name  && (
            <div className='error'>{formik.errors.name }</div>
        )}
        <input 
              type="email" 
              name="email" 
              placeholder="Please enter your email"
              onChange={formik.handleChange}
              value={formik.values.email } 
              />
        {formik.touched.email  && formik.errors.email  && (
            <div className='error'>{formik.errors.email }</div>
        )}
        <input 
              type="password" 
              name="password" 
              placeholder="Please enter your password" 
              onChange={formik.handleChange}
              value={formik.values.password } 
              />
        {formik.touched.password  && formik.errors.password  && (
            <div className='error'>{formik.errors.password }</div>
        )}
        <input 
            type="submit" 
            value="Sign Up" />
    </form> 
  )
}

export default SignupForm