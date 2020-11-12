// Note to self once the api's are tested to replace some of the params to session
const router = require('express').Router();
const { Op } = require("sequelize");

const { Recipes, Ingredients, Directions, MyCookbook, MyCookbook_Recipes, User } = require('../../models');


// get routes

// if I can figure this out I will turn this on to search everything. Until then the search must be very specific.
router.get('/', (req, res) => {

    var reg = new RegExp('^\\d+$');

    let isnum = reg.test(req.body.searchTerm);

    var searchVal = null
    var featured = null

    // if the user searches for "featured" it will find all featured items
    if (req.body.searchTerm === "featured" || req.body.featured === 1) {
        featured = 1
    } else if (req.body.searchTerm === "not featured" || req.body.featured === 0) {
        featured = 0
    }

    if (isnum != "") {
        searchVal = parseInt(req.body.searchTerm)
    }

    var searchString = "%" + req.body.searchTerm + "%"

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
        .then(dbUserData => {
            if (dbUserData.length == 0) {
                res.status(404).json({ message: 'No result found.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});





router.get('/recipes', (req, res) => {
    Recipes.findAll({
        where: {
            ...req.body
        }
    })
        .then(dbUserData => {
            if (dbUserData.length == 0) {
                res.status(404).json({ message: 'No result found.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/users', (req, res) => {
    User.findAll({
        where: {
            username: req.body.username
        },
        include: [
            {
                model: Recipes
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No result found.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/ingredients', (req, res) => {
    Ingredients.findAll({
        where: {
            name: req.body.name
        },
        include: [
            {
                model: Recipes,
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No result found.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



module.exports = router;