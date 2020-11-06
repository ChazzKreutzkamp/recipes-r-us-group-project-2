const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class MyCookbook_Recipes extends Model { }

MyCookbook_Recipes.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mycookbook_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        recipe_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'recipes',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'mycookbook_recipes'
    }
);

module.exports = MyCookbook_Recipes;