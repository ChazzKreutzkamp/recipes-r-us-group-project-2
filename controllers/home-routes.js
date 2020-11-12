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
            res.render('landingpage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.get('/homepage', (req, res) => {
    Recipes.findAll({
        where: {
            user_id: req.session.user_id
        }
    })
        .then(dbPostData => {
            const recipe = dbPostData.map(recipes => recipes.get({ plain: true }));

            res.render('homepage', {
                recipe,
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
        res.redirect('/homepage');
        return;
    }

    res.render('signup-page');
});

router.get('/signup/ifyouknowthisyouaretrusted/admin', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/homepage');
        return;
    }

    res.render('admin-signup');
});

router.get('/search-results', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('search-results');
});

router.get('/newrecipe', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('newrecipe');
});

router.get('/account_info', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('account_info');
});

router.get('/search-results', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('search-results');
});




router.get('/recipepage/:id', (req, res) => {
    Recipes.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No recipe found with this id' });
                return;
            }

            const recipe = dbPostData.get({ plain: true });

            res.render('recipe-page', {
                recipe,
                loggedIn: req.session.loggedIn,
                user_email: req.session.user_email,
                isAdmin: req.session.isAdmin
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
                loggedIn: req.session.loggedIn,
                isAdmin: req.session.isAdmin
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

module.exports = router;