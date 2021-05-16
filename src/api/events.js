/**
 * events.js
 *
 * API for handling events
 */
import axiosInstance from './axios-instance';
let qs = require('qs');

const getAllCategories = function () {
    return axiosInstance.get(`/events/categories`)
        .then(res => res);
};

const getEventsQueryOnly = function (query) {
    return axiosInstance.get(`/events`, { params: {q: (query.length > 0) ? query : null, sortBy: "DATE_ASC"}})
        .then(res => res);
};

const getQueryAndFilteredEvents = function (query, categoryIds) {
    return axiosInstance.get(`/events`, {
        params: {
            q: query,
            categoryIds: categoryIds,
            sortBy: "DATE_ASC"
        },
        paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        }
    })
        .then(res => res);
};

const getFilteredEventsOnly = function (categoryIds) {
    return axiosInstance.get(`/events`, {
        params: {
            categoryIds: categoryIds,
            sortBy: "DATE_ASC"
        },
        paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        }
    })
        .then(res => res);
};

const getImage = function (id) {

    return axiosInstance
        .get(`/events/${id}/image`, {
            responseType: 'blob',
            validateStatus:  function(status){
                return(status === 404 || (status >= 200 && status < 300))
            }
        })
        .then(res => res);

}

const getOneEvent = function (id) {
    return axiosInstance.get(`/events/${id}`)
        .then(res => res);
}

const getEventAttendees = function (id) {
    return axiosInstance.get(`/events/${id}/attendees`)
        .then(res => res);
}

const postEvent = function (payload) {
    return axiosInstance.post(`/events`, payload,{
        headers: {'X-Authorization': localStorage.getItem('token')}
    }).then(res => res);
}

const putEventImage = function (id, body) {
    return axiosInstance
        .put(`events/${id}/image`, body, {
            headers: {'Content-Type': body.type}
        })
}

const deleteEvent = function(id) {
    return axiosInstance
        .delete(`events/${id}`)
        .then(res => res)
}

export default {
    getEventsQueryOnly,
    getAllCategories,
    getQueryAndFilteredEvents,
    getFilteredEventsOnly,
    getImage,
    getOneEvent,
    getEventAttendees,
    postEvent,
    putEventImage,
    deleteEvent
}