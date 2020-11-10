// Note to self once the api's are tested to replace some of the params to session
const router = require('express').Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Recipes, Ingredients, Directions, MyCookbook, MyCookbook_Recipes, User } = require('../../models');


// get routes

// if I can figure this out I will turn this on to search everything. Until then the search must be very specific.
// router.get('/', (req, res) => {
//     if (req.body.name)
//         Ingredients.findAll({
//             where: {
//                 name: req.body.name
//             },
//             include: [
//                 {
//                     model: Recipes,
//                     include: {
//                         model: User,
//                         attributes: ['username']
//                     }
//                 }
//             ]
//         })
//             .then(dbUserData => {
//                 if (dbUserData.length == 0) {
//                     res.status(404).json({ message: 'No result found.' });
//                     return;
//                 }
//                 res.json(req);
//             })
//             .catch(err => {
//                 console.log(err);
//                 res.json(dbUserData);
//                 res.status(500).json(err);
//             });
// });



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