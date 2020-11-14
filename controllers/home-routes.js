const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Ingredients, MyCookbook, MyCookbook_Recipes, Recipes, Directions } = require('../models');
const { use } = require('./api');
const { Op } = require("sequelize");

router.get('/', (req, res) => {
    console.log(req.session);
    Recipes.findAll({
        where: {
            featured: 1
        },
        order: sequelize.literal('rand()'),
        limit: 1
    })
        .then(dbPostData => {
            const recipe = dbPostData.map(post => post.get({ plain: true }));
            res.render('landingpage', {
                recipe,
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
                loggedIn: req.session.loggedIn,
                isAdmin: req.session.isAdmin
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.get('/featured', (req, res) => {
    console.log(req.session);
    Recipes.findAll({
        where: {
            featured: 1
        },
        order: sequelize.literal('rand()'),
        limit: 1
    })
        .then(dbPostData => {
            const recipe = dbPostData.map(post => post.get({ plain: true }));
            res.render('featured-recipe', {
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

router.get('/modfeatured', (req, res) => {
    console.log(req.session);
    if (!req.session.isAdmin) {
        res.redirect('/homepage');
        return;
    }
    Recipes.findAll({
        where: {
            featured: 1
        }
    })
        .then(dbPostData => {
            const recipe = dbPostData.map(post => post.get({ plain: true }));
            res.render('admin-featureModding', {
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

router.get('/newrecipe', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('newrecipe', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/search-results/:searchTerm', async (req, res) => {
    // input
    var searchTerm = req.params.searchTerm;
    var searchString = "%" + searchTerm + "%";
    var searchVal = null;
    var featured = null;

    // regex test to check if it is a number
    var reg = new RegExp('^\\d+$');
    let isnum = reg.test(req.params.searchTerm);

    // if the user searches for "featured" it will find all featured items
    if (searchTerm === "featured" || req.body.featured === 1) {
        featured = 1
    } else if (searchTerm === "not featured" || req.body.featured === 0) {
        featured = 0
    }

    if (isnum != "") {
        searchVal = parseInt(searchTerm)
    }

    Recipes.findAll({
        where: {
            [Op.or]: [
                { title: { [Op.like]: searchString } },
                { featured: featured },
                { yield: { [Op.like]: searchString } },
                { cook_time: searchVal },
                { cuisine: { [Op.like]: searchString } },
                { description: { [Op.like]: searchString } },
                { direction_list: { [Op.like]: searchString } },
                { ingredient_list: { [Op.like]: searchString } }
            ]
        },
        include: [
            {
                model: User,
                attributes: ["id", "username"]
            },
            { model: Ingredients },
            { model: Directions }
        ]
    })
        .then(dbGetData => {
            const recipe = dbGetData.map(recipes => recipes.get({ plain: true }));

            res.render('search-results', {
                recipe,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
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