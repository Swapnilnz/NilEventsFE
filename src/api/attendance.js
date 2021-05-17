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

export default  {
    updateAttendance
}