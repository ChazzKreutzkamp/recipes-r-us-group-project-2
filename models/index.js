const User = require('./User');
const Recipes = require('./Recipes');
const MyCookbook_Recipes = require('./MyCookbook_Recipes');

// associations will go here
User.hasMany(Recipes, {
    foreignKey: 'user_id'
});

Recipes.belongsTo(User, {
    foreignKey: 'user_id',
    hooks: true
});

User.belongsToMany(Recipes, {
    through: MyCookbook_Recipes,
    as: 'liked_recipe',
    foreignKey: 'user_id'
})

Recipes.belongsToMany(User, {
    through: MyCookbook_Recipes,
    as: 'liked_recipe',
    foreignKey: 'recipe_id'
});

MyCookbook_Recipes.belongsTo(User, {
    foreignKey: 'user_id'
});

MyCookbook_Recipes.belongsTo(Recipes, {
    foreignKey: 'recipe_id'
});

User.hasMany(MyCookbook_Recipes, {
    foreignKey: 'user_id'
})

Recipes.hasMany(MyCookbook_Recipes, {
    foreignKey: 'recipe_id'
})


module.exports = { User, Recipes, MyCookbook_Recipes };