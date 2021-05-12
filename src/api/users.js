import axiosInstance from './axios-instance';

const getUserImage = function (id) {
    return axiosInstance
        .get(`/users/${id}/image`, {
            responseType: 'blob',
            validateStatus:  function(status){
                return(status === 404 || (status >= 200 && status < 300))
            }
        })
        .then(res => res);
};

export default {
    getUserImage
}