import React from 'react'
import { Link, NavLink } from 'react-router-dom'
const UserMenu = () => {
    return (
        <>
            <div className="list-group text-center">
                <h3>User</h3>
                <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action" aria-current="true">
                    Profile
                </NavLink>
                <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>
            </div>

        </>
    )
}

export default UserMenu
