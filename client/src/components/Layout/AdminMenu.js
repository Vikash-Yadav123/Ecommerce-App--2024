import React from 'react'
import { Link, NavLink } from 'react-router-dom'
const AdminMenu = () => {
    return (
        <>
            <div className="list-group text-center border-radious-2">
                <h3>Admin</h3>
                <NavLink to="/dashboard/admin/product" className="list-group-item list-group-item-action " aria-current="true" >
                    Product
                </NavLink>
                <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action  " >
                    Create Category
                </NavLink>
                <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Craete Product</NavLink>
                <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">Orders</NavLink>
                <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
            </div>




        </>
    )
}

export default AdminMenu
