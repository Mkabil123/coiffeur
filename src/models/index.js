const Sequelize = require("sequelize");
const sequelize = require("../config/dbconfig");
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.admin = require("./admin.model")(sequelize, Sequelize)



module.exports=db