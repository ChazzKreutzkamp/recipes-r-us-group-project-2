// Note to self once the api's are tested to replace some of the params to session
const router = require('express').Router();
const { Recipes, Ingredients, Directions } = require('../../models');



router.get('/', (req, res) => {
    Recipes.findAll({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
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

router.get('/ingredient', (req, res) => {
    Ingredients.findAll({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('ingredient/:id', (req, res) => {
    Ingredients.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No ingredient found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('direction/:id', (req, res) => {
    Directions.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No direction found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

// Post routes

router.post('/', (req, res) => {
    Recipes.create({
        title: req.body.title,
        featured: req.body.featured,
        yield: req.body.yield,
        cook_time: req.body.cook_time,
        cuisine: req.body.cuisine,
        description: req.body.description,
        image_filename: req.body.image_filename,
        user_id: req.body.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/ingredient', (req, res) => {
    Ingredients.create({
        quantity: req.body.quantity,
        name: req.body.name,
        recipe_id: req.body.recipe_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/direction', (req, res) => {
    Directions.create({
        step: req.body.step,
        direction: req.body.direction,
        recipe_id: req.params.recipe_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

//Recipe Put routes

router.put('/complete/:id', (req, res) => {
    Recipes.update(
        {
            title: req.body.title,
            featured: req.body.featured,
            yield: req.body.yield,
            cook_time: req.body.cook_time,
            cuisine: req.body.cuisine,
            description: req.body.description,
            image_filename: req.body.image_filename
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No recipe found with this is' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/image/:id', (req, res) => {
    Recipes.update(
        {
            image_filename: req.body.image_filename
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No recipe found with this is' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.put('/featured/:id', (req, res) => {
    Recipes.update(
        {
            featured: req.body.featured
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No recipe found with this is' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.put('/title/:id', (req, res) => {
    Recipes.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No recipe found with this is' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/description/:id', (req, res) => {
    Recipes.update(
        {
            description: req.id.description
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No recipe found with this is' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/cuisine/:id', (req, res) => {
    Recipes.update(
        {
            cuisine: req.body.cuisine
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No recipe found with this is' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/yield/:id', (req, res) => {
    Recipes.update(
        {
            yield: req.body.yield
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No recipe found with this is' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/cook_time/:id', (req, res) => {
    Recipes.update(
        {
            cook_time: req.body.cook_time
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No recipe found with this is' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//directions put routes

router.put('/direction/:id', (req, res) => {
    Directions.update(
        {
            direction: req.id.direction,
            step: req.id.step
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No direction found with this is' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

//Ingredients put routes

router.put('/ingredient/:id', (req, res) => {
    Ingredients.update(
        {
            name: req.body.name,
            quantity: req.body.quantity
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No ingredient found with this is' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//delete routes

router.delete('/recipe-delete/:id', (req, res) => {
    Recipes.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No recipe found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/ingredient-delete/:id', (req, res) => {
    Ingredients.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No ingredient found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/direction-delete/:id', (req, res) => {
    Directions.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No direction found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})


// search get routes



// router.get('/:id', (req, res) => {
//     Recipes.findOne({
//         where: {
//             id: req.params.id
//         },
//         include: [
//             {
//                 model: Ingredients
//             },
//             {
//                 model: Directions
//             }
//         ]
//     })
//         .then(dbUserData => {
//             if (!dbUserData) {
//                 res.status(404).json({ message: 'No recipe found with this id' });
//                 return;
//             }
//             res.json(dbUserData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });




module.exports = router;