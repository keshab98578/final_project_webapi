import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'


const AdminRoutes = () => {

    const user = JSON.parse(localStorage.getItem('user'))
 // get User Information
 //check isAdmin
//Check isAdmin = true
//if true :Access all the route of Admi(Outlet)
//if false : Navigate to Login

        return  user != null && user.isAdmin? <Outlet /> : <Navigate to={'/login'} />
  
}

export default AdminRoutes
