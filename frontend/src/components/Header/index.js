import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Link, NavLink } from 'react-router-dom'


const Header = () => {
  const {isAuthenticated} = useAuth();
  return (

    <div className="container">
      <header className="d-flex justify-content-center py-3">
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <span className="fs-4">Demo Project</span>
      </Link>
        <ul className={`nav nav-pills ${isAuthenticated ? 'mb-3 mb-md-0 me-md-auto' : 'text-end'}`}>
          {isAuthenticated ? 
            <>
              <li className="nav-item"><NavLink to="/products" className="nav-link" >Products</NavLink></li>
              <li className="nav-item"><NavLink to="/add_product" className="nav-link">Add New Product</NavLink></li>
            </>
            :
            <>
              <li className="nav-item">
                <NavLink to="/" className="nav-link">Sign-in</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/signup" className="nav-link">Sign-up</NavLink>
              </li>              
            </>
          }
        </ul>
        {isAuthenticated && 
            <ul className="nav nav-pills text-end" >
              <li className="nav-item" ><NavLink to="/logout" className="nav-link" >Sign out</NavLink></li>
            </ul>
        }
      </header>
    </div>
  )
}

export default Header