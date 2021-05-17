/**
 * api.js
 *
 * exports other api files
 */
import events from "./events"
import users from "@/api/users";
import attendance from "@/api/attendance";

export default {
    events: events,
    users: users,
    attendance
}
