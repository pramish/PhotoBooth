import React from 'react'
import { SET_LOGGEDIN_USER } from '../types/userTypes'

export default function SetLoggedInUser(user) {
    return {
        type: SET_LOGGEDIN_USER,
        payload: user
    }
}
