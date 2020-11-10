const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipes extends Model { }


Recipes.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        featured: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 1
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        yield: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cook_time: {
            type: DataTypes.INTEGER,
            allowNull: false
            // in minutes
        },
        cuisine: {
            type: DataTypes.STRING,
            allowNull: false,
            // add validation for the excepted list 
            // validate: {}
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: { len: [1] }
        },
        // directions many to many
        image_filename: {
            type: DataTypes.STRING,
            allowNull: false,
            // default value should point at "no image found" image
            // defaultValue: 0,
            validate: { len: [1] }
        },
        // recipes many to many
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);


module.exports = Recipes;