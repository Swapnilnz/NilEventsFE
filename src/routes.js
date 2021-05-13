import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Event from "@/views/Event";
import NotFound from "@/views/404";
import MyEvents from "@/views/MyEvents";
// import api from "@/api/api"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/events/:eventId",
        name: "Event",
        component: Event
    },
    {
        path: "/user/events",
        name: "My Events",
        component: MyEvents,
        meta: {requiresAuth: true}
    },





    {
        path: "/404",
        name: "notFound",
        component: NotFound
    },
    // If not found redirect to 404
    {
        path: "/:pathMatch(.*)*",
        redirect: { name: 'notFound' }
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// /**
//  * Before each route, check if the route requires authentication, if it does
//  * it will check if the user is logged in, if that fails, redirect to /login
//  */
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('token') !== 'null') {
            next();
        } else {
            next({
                name: 'Home',
                query: {redirect: to.fullPath}
            })
        }
    } else {
        next()
    }
});

export default router;



