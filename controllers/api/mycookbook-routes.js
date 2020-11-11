// Note to self once the api's are tested to replace some of the params to session
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
            }
        ]
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

router.post('/', (req, res) => {
    MyCookbook.create({
        user_id: req.body.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/myrecipes', (req, res) => {
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
    MyCookbook.destroy({
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
router.delete('/cookbookrecipesdelete/:id', (req, res) => {
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




// anythin below this is for testing and will likely be removed
router.get('/test/MC-R', (req, res) => {
    MyCookbook_Recipes.findAll({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});







module.exports = router;