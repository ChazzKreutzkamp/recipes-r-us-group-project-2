const User = require('./User');
const Recipes = require('./Recipes');
const MyCookbook = require('./MyCookbook');
const Directions = require('./MyCookbook');
const Ingredients = require('./MyCookbook');
const MyCookbook_Recipes = require('./MyCookbook');

// associations will go here
User.hasMany(Recipes, {
    foreignKey: 'user_id'
});

Recipes.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    onUpdate: 'cascade',
    hooks: true
});

User.hasOne(MyCookbook, {
    foreignKey: 'user_id'
});

MyCookbook.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    onUpdate: 'cascade',
    hooks: true
});

User.hasMany(Recipes, {
    foreignKey: 'user_id'
});

Recipes.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    onUpdate: 'cascade',
    hooks: true
});


MyCookbook.belongsToMany(Recipes, {
    through: MyCookbook_Recipes,
    foreignKey: 'mycookbook_id'
});

Recipes.belongsToMany(MyCookbook, {
    through: MyCookbook_Recipes,
    foreignKey: 'recipe_id'
});


Recipes.hasMany(Directions, {
    foreignKey: 'recipe_id'
});

Directions.belongsTo(Recipes, {
    foreignKey: 'recipe_id',
    onDelete: 'cascade',
    onUpdate: 'cascade',
    hooks: true
});

Recipes.hasMany(Ingredients, {
    foreignKey: 'recipe_id'
});

Ingredients.belongsTo(Recipes, {
    foreignKey: 'recipe_id',
    onDelete: 'cascade',
    onUpdate: 'cascade',
    hooks: true
});


module.exports = { User, Recipes, MyCookbook, Directions, Ingredients, MyCookbook_Recipes };