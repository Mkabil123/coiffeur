module.exports = (sequelize, Sequelize) => {
    const userdetails = sequelize.define(
        "userdetails",
        {
            userdetails_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            first_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            familymemberscount: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            state: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            district: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            currentlivingspace: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            address: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            phone_number: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            educational_qualification: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            aadhar_number: {
                type: Sequelize.STRING(30),
                allowNull:false
            },
            pan_number: {
                type: Sequelize.STRING(30),
                allowNull: true
            },
            shop_license_number: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            aadhar_document: {
                type: Sequelize.STRING(800),
                allowNull: true
            },
            school_college_name: {
                type: Sequelize.STRING(80),
                allowNull: true,
            },
        },
      
    );

    return userdetails;
};
