import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
// import api from "@/api/api"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
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



