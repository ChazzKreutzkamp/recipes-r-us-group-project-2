const User = require('./User');
const Recipes = require('./Recipes');
const MyCookbook_Recipes = require('./MyCookbook_Recipes');

// associations will go here
User.hasMany(Recipes, {
    foreignKey: 'user_id'
});

Recipes.belongsTo(User, {
    as: 'my_recipes',
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


Recipes.belongsToMany(User, {
    through: MyCookbook_Recipes,
    as: 'recipe_creator',
    foreignKey: 'recipe_id'
});

Recipes.belongsToMany(User, {
    through: MyCookbook_Recipes,
    as: 'liked_recipe',
    foreignKey: 'recipe_id'
});

module.exports = { User, Recipes, MyCookbook_Recipes };