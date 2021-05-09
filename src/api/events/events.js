/**
 * events.js
 *
 * API for handling events
 */
import axiosInstance from '../axios-instance';
let qs = require('qs');

const getEventsQueryOnly = function (query) {
    return axiosInstance.get(`/events`, { params: {q: query}})
        .then(res => res);
};

const getAllCategories = function () {
    return axiosInstance.get(`/events/categories`)
        .then(res => res);
};

const getQueryAndFilteredEvents = function (query, categoryIds) {
    return axiosInstance.get(`/events`, {
        params: {
            q: query,
            categoryIds: categoryIds
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
            categoryIds: categoryIds
        },
        paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        }
    })
        .then(res => res);
};


export default {
    getEventsQueryOnly,
    getAllCategories,
    getQueryAndFilteredEvents,
    getFilteredEventsOnly
}