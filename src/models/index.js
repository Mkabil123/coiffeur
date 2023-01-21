const Sequelize = require("sequelize");
const sequelize = require("../config/dbconfig");
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.admin = require("./admin.model")(sequelize, Sequelize)
db.user = require('./user.model')(sequelize, Sequelize)
db.userDetails=require("./userFamilyDetails")(sequelize,Sequelize)


db.user.hasMany(db.userDetails, {
    foreignKey: "parentdetails_id"
});

sequelize.sync({ alter: true })
module.exports=db