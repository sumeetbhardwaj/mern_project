import React from 'react'
import Layout from '../../components/Layout'
import styles from './style.module.css'
import { Link, Navigate } from 'react-router-dom'
import LoginForm from './LoginForm'


const Home = () => {
  return (
    <Layout>
      <div className={`${styles.min_hieght} container`}>
      <div className="row">
      <div className="col-md-4" ></div>
        <div className="col-md-4" >
            <div className={`${styles.login_container}`}>
                <h2>Sign In</h2>
                <LoginForm/>
                <p>If you have not an account, <Link to="/signup">click here</Link> to create one.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home