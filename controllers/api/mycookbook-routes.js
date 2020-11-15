// Note to self once the api's are tested to replace some of the params to session
const router = require('express').Router();
const { MyCookbook_Recipes, Recipes } = require('../../models');

router.get('/', (req, res) => {
    MyCookbook_Recipes.findAll({
        include: [
            {
                model: Recipes
            }
        ]
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    MyCookbook_Recipes.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Recipes
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No recipe found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    MyCookbook_Recipes.create({
        liked: req.body.liked,
        user_id: req.body.user_id,
        recipe_id: req.body.recipe_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/liked/:id', (req, res) => {
    MyCookbook_Recipes.update(
        {
            liked: req.body.liked
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No cookbook found with this is' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//deletes? or just depend on cascade? they are here just in case, and perhaps to also test the cascade.
router.delete('/:id', (req, res) => {
    MyCookbook_Recipes.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No cookbook found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;