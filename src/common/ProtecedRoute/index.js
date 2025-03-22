import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("access-token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role; // Assuming role is stored in JWT as `role`

        if (allowedRoles.includes(userRole)) {
            return <Outlet />;
        } else {
            return <Navigate to="/unauthorized" replace />;
        }
    } catch (error) {
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
