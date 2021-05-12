/**
 * api.js
 *
 * exports other api files
 */
import events from "./events"
import users from "@/api/users";

export default {
    events: events,
    users: users
}
