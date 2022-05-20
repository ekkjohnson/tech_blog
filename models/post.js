const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init (
    {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50],
            },
        },
        contents: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 250],
            },
        },
        // created: {
        //     type: DataTypes.DATEONLY,
        //     defaultValue: new Date(),
        //     allowNull: false
        // },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key:'id'
            },
        },  
    },

    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    },
);




module.exports = Post;