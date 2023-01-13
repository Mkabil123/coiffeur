const sequelize = require("./config/dbconfig")
const app = require("./app")

sequelize.sync().then(() => {
    console.log("Connected to mysql");
})

// app.get('/', (req, res) => {
//     res.status(200).send("api running \u{1F973}")
// })

app.listen(5000,() => {
    console.log("Connected to mysql",5000);
})