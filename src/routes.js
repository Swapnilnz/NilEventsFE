import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Event from "@/views/Event";
import NotFound from "@/views/404";
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
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         // A get request is sent to the server to check if the user's JSESSIONID is legitimate
//         api.loginRegister
//             .isAuthorised()
//             .then(() => {
//                 next();
//             })
//             .catch(err => {
//                 console.info("Must be logged in", err);
//                 next({
//                     name: 'login',
//                     query: {redirect: to.fullPath}
//                 });
//             });
//     } else {
//         next();
//     }
// });

export default router;



