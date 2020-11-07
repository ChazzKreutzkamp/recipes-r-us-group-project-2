const router = require('express').Router();

const userRoutes = require('./user-routes');
const recipeRoutes = require('./recipes-routes');
const mycookbookRoutes = require('./mycookbook-routes');
const mycookbook_recipeRoutes = require('./mycookbook_recipes-routes');


router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/mycookbook', mycookbookRoutes);
router.use('/addrecipe', mycookbook_recipeRoutes);


module.exports = router;