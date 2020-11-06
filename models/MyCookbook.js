const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class MyCookbook extends Model { }

MyCookbook.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        recipe_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'recipes',
                key: 'id'
            }
        },
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
        modelName: 'mycookbook'
    }
);


module.exports = MyCookbook;