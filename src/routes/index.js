const express = require("express");
const loginroute = require("./v1/admin/admin.route")
const userrroute=require("./v1/userdetails/user.route")


const router = express.Router();
const defaultRoutes = [
    {
        path: "/v1/auth",
        route: loginroute,
    },
    {
        path: "/v1/user",
        route: userrroute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
