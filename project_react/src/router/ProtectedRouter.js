import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

export default function ProtectedRouter({ children }) {

    const isLogin = useSelector(state => state.AuthReducer.isLogin);

    if(isLogin) {
        return <Navigate to="/admin" />
    }

    return children;
}
