import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';

const useCategory = () => {
    const [categorys, setCategorys] = useState([]);
    const getCategoryes = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-categorys`);
            if (data?.success) {
                setCategorys(data.categorys);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error');
        }
    }

    useEffect(() => {
        getCategoryes();
    }, [])

    return categorys;
}

export default useCategory;
