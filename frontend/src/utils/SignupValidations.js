import * as Yup from 'yup';


const Signupschema = Yup.object().shape({
    name: Yup.string().required('Please enter fullname').matches(/^[A-Za-z]+$/, 'Name contains only alphabetic characters').max(25),    
    password: Yup.string().required("Password is required field!").min(8),
    email: Yup.string().required('Please enter email').email(), 
  });

export default Signupschema