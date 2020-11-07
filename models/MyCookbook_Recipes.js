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
        liked: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: -1,
                max: 1
            }
        },
        mycookbook_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'mycookbook',
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
        modelName: 'vote'
    }
);

module.exports = MyCookbook_Recipes;