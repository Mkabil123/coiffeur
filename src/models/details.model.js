module.exports = (sequelize, Sequelize) => {
    const details = sequelize.define(
        "details",
        {
            details_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            detailscontent: {
                type: Sequelize.STRING(1500),
                allowNull: false,
            },
            image: {
                type: Sequelize.STRING(500),
                allowNull: true,
            },
            video: {
                type: Sequelize.STRING(500),
                allowNull: true,
            },
        },

    );

    return details;
};
