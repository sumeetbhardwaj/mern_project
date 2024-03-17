import { useFormik } from 'formik';
import EditProductschema from '../../utils/EditProductValidations'
import { useState, useEffect } from 'react';

const EditProductModal = ({editModalShow, sigleProduct, handleCloseModal, onSubmit}) => {

  const display = editModalShow ? "block" : "none";

    const formik = useFormik({
        initialValues: {
          _id : sigleProduct._id ,
          name : sigleProduct.name ,
          description: sigleProduct.description,
          price: sigleProduct.price
        },
        validationSchema: EditProductschema,
    
        onSubmit: (values) => {
          onSubmit(values)
        },
      }); 

  return (
    <div className={`modal fade ${editModalShow ? 'show' : ''}`} id="exampleModal" style={{display}} >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Product</h1>
        <button type="button" onClick={handleCloseModal} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="col-form-label">Puroduct Name:</label>
            <input type="text" className="form-control" name="name"
             onChange={formik.handleChange}
             value={formik.values.name }
             />
            {formik.touched.name  && formik.errors.name  && (
                <div className='error'>{formik.errors.name }</div>
            )}
          </div>
          <div className="mb-3">
            <label className="col-form-label">Product Descripation:</label>
            <input type="text" className="form-control" name="description"
             onChange={formik.handleChange}
             value={formik.values.description } 
             />
              {formik.touched.description  && formik.errors.description  && (
                  <div className='error'>{formik.errors.description }</div>
              )}
          </div>
          <div className="mb-3">
            <label  className="col-form-label">Product Price:</label>
            <input type="text" className="form-control" name="price" 
             onChange={formik.handleChange}
             value={formik.values.price } 
             />
            {formik.touched.price  && formik.errors.price  && (
                <div className='error'>{formik.errors.price }</div>
            )}
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary">Updat Product</button>
          </div>
        </form>
      </div>

    </div>
  </div>
    </div>
  )
  debugger
}

export default EditProductModal