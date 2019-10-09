import axios from "axios";
import React from 'react'

export default function auth(token) {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}
