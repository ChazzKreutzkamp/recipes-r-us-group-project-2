const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Ingredients, MyCookbook, MyCookbook_Recipes, Recipes, Directions } = require('../models');
const { use } = require('./api');

router.get('/', (req, res) => {
    console.log(req.session);
    Recipes.findAll({
        where: {
            featured: 1
        }
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.get('/dashboard', (req, res) => {
    User.findOne({
        where: {
            id: req.session.id
        },
        include: [
            {
                model: MyCookbook,
                include: {
                    model: Recipes
                }
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No User found with this id' });
                return;
            }

            const user = dbPostData.get({ plain: true });

            res.render('dashboard', {
                user,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('signup');
});

router.get('/herestherecipe/:id', (req, res) => {
    Recipes.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Ingredients
            },
            {
                model: Directions
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No recipe found with this id' });
                return;
            }

            const recipe = dbPostData.get({ plain: true });

            res.render('recipe', {
                recipe
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.get('/edit-recipe/:id', (req, res) => {
    Recipes.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Ingredients
            },
            {
                model: Directions
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No recipe found with this id' });
                return;
            }

            const recipe = dbPostData.get({ plain: true });

            res.render('editRecipe', {
                recipe,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})