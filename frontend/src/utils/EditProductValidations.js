import * as Yup from 'yup';


const EditProductschema = Yup.object().shape({
    name: Yup.string().required('Please enter product name').matches(/^[A-Za-z]+$/, 'Product contains only alphabetic characters'),    
    description: Yup.string().required("Description is required field!"),
    price: Yup.string().required('Please enter price') 
  });

export default EditProductschema