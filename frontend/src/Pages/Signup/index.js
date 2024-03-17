import React from 'react'
import Layout from '../../components/Layout'
import styles from './style.module.css'
import { Link } from 'react-router-dom'
import SignupForm from './SignupForm'


const Signup = () => {
  return (
    <Layout>
      <div className={`${styles.min_hieght} container`}>
      <div className="row">
      <div className="col-md-4" ></div>
        <div className="col-md-4" >
            <div className={`${styles.login_container}`}>
                <h2>Sign Up</h2>
                <SignupForm />
                <p>If you have an account, <Link to="/">click here</Link> to sign-up.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Signup