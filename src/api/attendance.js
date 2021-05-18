/**
 * attendance.js
 *
 * API for handling event attendace
 */
import axiosInstance from './axios-instance';

const updateAttendance = function (eventId, attendeeId, newVal) {
    return axiosInstance
        .patch(`/events/${eventId}/attendees/${attendeeId}`, {status: newVal})
        .then(res => res)
}

const requestAttendance = function (eventId) {
    return axiosInstance
        .post(`/events/${eventId}/attendees`)
        .then(res => res);
}

const deleteAttendance = function(eventId) {
    return axiosInstance
        .delete(`/events/${eventId}/attendees`)
        .then(res => res);
}

export default  {
    updateAttendance,
    requestAttendance,
    deleteAttendance
}