const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Directions extends Model { }

Directions.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        step: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        direction: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        recipe_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'recipes',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'directions'
    }
);


module.exports = Directions;