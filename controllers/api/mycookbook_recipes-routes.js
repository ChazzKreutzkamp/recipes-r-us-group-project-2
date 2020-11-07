const router = require('express').Router();
const { MyCookbook, MyCookbook_Recipes, Recipes } = require('../../models');




router.post('/', (req, res) => {
    // make sure the session exists first
    // if (req.session) {
    // pass session id along with all destructured properties on req.body
    MyCookbook_Recipes.create({
        liked: req.body.liked,
        mycookbook_id: req.body.mycookbook_id,
        recipe_id: req.body.recipe_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    // }
});

router.get('/', (req, res) => {
    MyCookbook_Recipes.findAll({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;