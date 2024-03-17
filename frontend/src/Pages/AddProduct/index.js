import React from 'react'
import Layout from '../../components/Layout'
import AddProductForm from './AddProductForm'
import styles from './style.module.css'


const AddProduct = () => {
  return (
    <Layout>
    <div className={`${styles.min_hieght} container`}>
        <div className="row">
            <div className="col-md-4" ></div>
                <div className="col-md-4" >
                    <div className={`${styles.login_container}`}>
                        <h2>Add New Product</h2>
                        <AddProductForm />
                </div>
            </div>
        </div>
    </div>
    </Layout>
  )
}

export default AddProduct