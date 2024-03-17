import * as Yup from 'yup';


const Loginschema = Yup.object().shape({
    email: Yup.string().email().required('Please enter a username, email, or phone number'),
    password: Yup.string().required("Password is required field!").min(8)
  });

export default Loginschema