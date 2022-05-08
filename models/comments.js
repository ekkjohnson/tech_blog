const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model {}

Comments.init (
    {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        contents: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 150],
            },
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            references: {
                model: 'user',
                key: 'id'
            },
        },

        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            references: {
                model: 'post',
                key: 'id'
            },
        },
    },

    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comments',
    }
);




module.exports = Comments;