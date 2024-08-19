import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../auth/context/AuthContext'
import { Navigate } from 'react-router-dom';
import { PrivateRoutes } from './PrivateRoutes';

export const PublicRoutes = ({ children }) => {
    const { logged } = useContext(AuthContext);

    return logged
    ? <Navigate to={"/marvel"}/>
    : children;
}