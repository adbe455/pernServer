module.exports = function(sequelize, DataTypes) {
    return sequelize.define('review', {
        ownerid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gameid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title:  {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
};