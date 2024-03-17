import { useFormik } from 'formik';
import useAuth from '../../hooks/useAuth';
import { LoginApi } from './LoginApi';
import Loginschema from '../../utils/LoginValidations';
import { Navigate } from 'react-router-dom';


const LoginForm = () => {

  const {isAuthenticated, loginUser} = useAuth();

  const formik = useFormik({
    initialValues: {
      email:'',
      password: '',
    },
    validationSchema: Loginschema,

    onSubmit: async(values) => {

      let response =  await LoginApi(values)

      if(response.statusCode === 400) {

        formik.errors.email = response.msg

      } else if (response?.response?.data?.statusCode === 400) {

        response?.response?.data?.errors.map((data) => {
          const {field, message } = data;
          formik.errors[field] = message;
          return null;
        })

      } else {
        loginUser(response.user.token)
      }
    },
  }); 

  if (isAuthenticated) {
    return <Navigate to="/products" />; // Redirect to dashboard if authenticated
  }

  return (
    <form onSubmit={formik.handleSubmit}>
        <input 
              type="email" 
              name="email" 
              placeholder="Please enter your valid email" 
              onChange={formik.handleChange}
              value={formik.values.email }
              />
        {formik.touched.email  && formik.errors.email  && (
            <div className='error'>{formik.errors.email }</div>
        )}
        <input 
              type="password" 
              name="password" 
              placeholder="Please enter your vaild password"
              onChange={formik.handleChange}
              value={formik.values.password } 
              />
        {formik.touched.password  && formik.errors.password  && (
            <div className='error'>{formik.errors.password }</div>
        )}
        <input type="submit" value="Sign In" />
    </form>
  )
}

export default LoginForm