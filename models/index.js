const User = require('./User');
const Recipes = require('./Recipes');
const MyCookbook = require('./MyCookbook');
const Directions = require('./Directions');
const Ingredients = require('./Ingredients');
const MyCookbook_Recipes = require('./MyCookbook_Recipes');

// associations will go here
User.hasMany(Recipes, {
    foreignKey: 'user_id'
});

Recipes.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasOne(MyCookbook, {
    foreignKey: 'user_id'
});

MyCookbook.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Recipes, {
    foreignKey: 'user_id'
});

Recipes.belongsTo(User, {
    foreignKey: 'user_id',
});


Recipes.belongsToMany(MyCookbook, {
    through: MyCookbook_Recipes,
    // as: 'my_recipe',
    foreignKey: 'recipe_id'
});

MyCookbook.belongsToMany(Recipes, {
    through: MyCookbook_Recipes,
    // as: 'my_recipe',
    foreignKey: 'mycookbook_id'
});


Recipes.hasMany(Directions, {
    foreignKey: 'recipe_id'
});

Directions.belongsTo(Recipes, {
    foreignKey: 'recipe_id',
});

Recipes.hasMany(Ingredients, {
    foreignKey: 'recipe_id'
});

Ingredients.belongsTo(Recipes, {
    foreignKey: 'recipe_id',
});


module.exports = { User, Recipes, MyCookbook, Directions, Ingredients, MyCookbook_Recipes };