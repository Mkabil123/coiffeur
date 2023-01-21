module.exports = (sequelize, Sequelize) => {
    const userfamilydetails = sequelize.define(
        "familydetails",
        {
            familydetails_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            parentdetails_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
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
            school_college_name: {
                type: Sequelize.STRING(80),
                allowNull: true,
            },
            aadhar_number: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            pan_number: {
                type: Sequelize.STRING(30),
                allowNull: true
            },
            aadhar_document: {
                type: Sequelize.STRING(800),
                allowNull:true
            }
        }
    )
    return userfamilydetails
}