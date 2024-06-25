import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSearch } from '../../context/search'
import { useNavigate } from 'react-router-dom'


const SearchForm = () => {
    const [value, setValue] = useSearch();
    const navigate = useNavigate();

    // SEARCH PRODUCT
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/search-product`, { keyword: value.keyword });
            setValue({ ...value, result: data.product });
            navigate('/search');
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error');
        }
    }

    return (
        <>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={value.keyword} onChange={(e) => setValue({ ...value, keyword: e.target.value })} />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>


        </>
    )
}

export default SearchForm
