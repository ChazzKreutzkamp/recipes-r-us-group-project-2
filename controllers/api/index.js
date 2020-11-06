const router = require('express').Router();

const userRoutes = require('./user-routes');
const recipesRoutes = require('./recipes-routes');


router.use('/users', userRoutes);
router.use('/recipes', recipesRoutes);


module.exports = router;