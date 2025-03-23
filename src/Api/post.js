import axios from "axios";
import { jwtDecode } from 'jwt-decode'
const base_url = process.env.REACT_APP_BASE_URL;
export const ADD_BOX = async (data) => {
    const adminToken = localStorage.getItem("access-token");

    if (!adminToken) {
        return Promise.reject("No token found");
    }

    try {
        // Decode token
        const decodedToken = jwtDecode(adminToken);

        // Check if the role is admin
        if (decodedToken.role !== "admin") {
            return Promise.reject("Unauthorized access. Admins only.");
        }

        return await new Promise((resolve, reject) => {
            axios.post(`${base_url}/api/box/add`, data, {
                headers: {
                    Authorization: `Bearer ${adminToken}`
                }
            }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    } catch (error) {
        return Promise.reject("Invalid token");
    }
}
export const UPDATE_BOX = async (id, data) => {
    const adminToken = localStorage.getItem("access-token");

    if (!adminToken) {
        return Promise.reject("No token found");
    }

    try {
        // Decode token
        const decodedToken = jwtDecode(adminToken);

        // Check if the role is admin
        if (decodedToken.role !== "admin") {
            return Promise.reject("Unauthorized access. Admins only.");
        }
        return await new Promise((resolve, reject) => {
            axios.patch(`${base_url}/api/box/update/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${adminToken}`
                }
            }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    } catch (error) {
        return Promise.reject("Invalid token");
    }
}
export const ADD_BOOKING = async ( data) => {
    const token = localStorage.getItem("access-token");

    return await new Promise((resolve, reject) => {
        axios.post(`${base_url}/api/bookings/addBooking`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const CANCEL_BOOKING = async (id) => {
    const token = localStorage.getItem("access-token");

    return await new Promise((resolve, reject) => {
        axios.patch(`${base_url}/api/bookings/cancel`,{id}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}

// -------------------- Do Not Change ----------------//

export const LOGIN = async (data) => {
    return await new Promise((resolve, reject) => {
        axios.post(`${base_url}/api/user/login`, data).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const REGISTER = async (data) => {
    return await new Promise((resolve, reject) => {
        axios.post(`${base_url}/api/user/register`, data).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}

export const ADD_PAYMENT = async(data)=>{
    return await new Promise((resolve, reject) => {
        axios.post(`${base_url}/api/payment/create-order`, data).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const VERIFY_PAYMENT = async(data)=>{
    return await new Promise((resolve, reject) => {
        axios.post(`${base_url}/api/payment/verify-payment`, data).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const UPDATE_USER = async (id,data) => {
    const token =  localStorage.getItem('access-token')
    return await new Promise((resolve, reject) => {
        axios.patch(`${base_url}/api/user/update/${id}`, data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const ADD_SLOT = async (data) => {
    const token =  localStorage.getItem('access-token')
    return await new Promise((resolve, reject) => {
        axios.post(`${base_url}/api/slots/addSlot`, data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const UPDATE_SLOT = async (id,data) => {
    const token =  localStorage.getItem('access-token')
    return await new Promise((resolve, reject) => {
        axios.patch(`${base_url}/api/slots/update/${id}`, data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const CONTACT_US = async (data) => {
    const token =  localStorage.getItem('access-token')
    return await new Promise((resolve, reject) => {
        axios.post(`${base_url}/api/contact/create`, data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}