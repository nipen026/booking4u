import axios from "axios";
import {jwtDecode} from 'jwt-decode'
const base_url = process.env.REACT_APP_BASE_URL;
export const GET_ALL_BOX = async () => {
    return await new Promise((resolve, reject) => {
        axios.get(`${base_url}/api/box/get`).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const GET_BOX_BY_ID = async (id) => {
    return await new Promise((resolve, reject) => {
        axios.get(`${base_url}/api/box/getBoxById/${id}`).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const GET_SLOTS = async (id,date) => {
    return await new Promise((resolve, reject) => {
        axios.get(`${base_url}/api/slots/getSlots/${id}/${date}`).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const GET_BOX_BY_USER = async () => {
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

        // Proceed with the API call
        return await new Promise((resolve, reject) => {
            axios
                .get(`${base_url}/api/box/getByUser`, {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    } catch (error) {
        return Promise.reject("Invalid token");
    }
};

export const GET_BOOKING_BY_ID = async (id) => {
    const token = localStorage.getItem("access-token");
    return await new Promise((resolve, reject) => {
        axios.get(`${base_url}/api/bookings/bookingId/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const GET_CONFIRM_BOOKING = async (id) => {
    const token = localStorage.getItem("access-token");
    return await new Promise((resolve, reject) => {
        axios.get(`${base_url}/api/bookings/confirmBooking`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const GET_USER = async () => {
    const token =  localStorage.getItem('access-token')
    return await new Promise((resolve, reject) => {
        axios.get(`${base_url}/api/user/profile`,{
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

export const GET_SLOTS_BY_BOX = async (id) => {
    const token =  localStorage.getItem('access-token')
    return await new Promise((resolve, reject) => {
        axios.get(`${base_url}/api/slots/${id}`,{
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
export const GET_BOX_FILTER = async (query) => {
    const token = localStorage.getItem('access-token');

    try {
        const response = await axios.get(`${base_url}/api/box/filter`, {
            params: query, // Correct way to send query parameters
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; // Return only response data
    } catch (error) {
        throw error; // Ensure the error propagates
    }
};
export const GET_ALL_ADMIN_BOOKING = async () => {
    const token = localStorage.getItem('access-token');

    try {
        const response = await axios.get(`${base_url}/api/bookings/getAllBookingsForAdmin`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; // Return only response data
    } catch (error) {
        throw error; // Ensure the error propagates
    }
};
