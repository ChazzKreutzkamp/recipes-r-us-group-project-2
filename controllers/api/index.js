const router = require('express').Router();

const userRoutes = require('./user-routes');
const recipeRoutes = require('./recipes-routes');
const mycookbookRoutes = require('./mycookbook-routes')


router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/cookbook', mycookbookRoutes)


module.exports = router;