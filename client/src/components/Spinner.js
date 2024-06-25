import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const Spinner = ({ path = "/login" }) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((preValue) => --preValue);
        }, 1000);
        count === 0 && navigate(`${path}`, {
            state: location
        })
        return () => clearInterval(interval);
    }, [navigate, count, location, path])



    return (
        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "100vh" }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <h3>{count}</h3>
        </div>

    )
}

export default Spinner;
