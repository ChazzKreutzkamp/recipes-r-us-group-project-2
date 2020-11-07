const router = require('express').Router();
const { MyCookbook, MyCookbook_Recipes, Recipes } = require('../../models');

router.get('/', (req, res) => {
    MyCookbook.findAll({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    MyCookbook.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Recipes
                // ,
                // through: MyCookbook_Recipes
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    MyCookbook.create({
        liked: req.body.liked,
        recipe_id: req.body.recipe_id,
        user_id: req.body.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})


module.exports = router;