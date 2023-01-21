const Sequelize = require("sequelize");
const sequelize = require("../config/dbconfig");
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.admin = require("./admin.model")(sequelize, Sequelize)
db.user = require('./user.model')(sequelize, Sequelize)
// db.userDevice=require('./userDevice.model')(sequelize,Sequelize)
db.userDetails=require("./userFamilyDetails")(sequelize,Sequelize)


// sequelize.sync({ alter: true })
module.exports=db