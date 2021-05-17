import axiosInstance from './axios-instance';

const getUserImage = function (id) {
    return axiosInstance
        .get(`/users/${id}/image`, {
            responseType: 'blob',
        })
        .then(res => res);
};

const registerUser = function (body) {
    return axiosInstance
        .post(`/users/register`, body)
        .then(res => res);
}

const loginUser = function (body) {
    return axiosInstance
        .post(`users/login`, body)
        .then(res => res);
};

const getUser = function (id) {
    return axiosInstance
        .get(`/users/${id}`)
        .then(res => res);
};

const putUserImage = function (id, body) {
    return axiosInstance
        .put(`users/${id}/image`, body, {
            headers: {'Content-Type': body.type}
        })
}

const deleteUserImage = function (id) {
    return axiosInstance
        .delete(`/users/${id}/image`)
        .then(res => res)
}

const updateUser = function (id, payload) {
    return axiosInstance
        .patch(`/users/${id}`, payload)
        .then(res => res);
}

const logoutUser = function() {
    return axiosInstance
        .post(`/users/logout`)
        .then(res => res);
}

export default {
    getUserImage,
    registerUser,
    loginUser,
    getUser,
    putUserImage,
    deleteUserImage,
    updateUser,
    logoutUser
}