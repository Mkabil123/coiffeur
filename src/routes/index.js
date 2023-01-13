const express = require("express");
const adminroute=require("./v1/admin/admin.route")


const router = express.Router();
const defaultRoutes = [
    {
        path: "/v1/auth",
        route: adminroute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
