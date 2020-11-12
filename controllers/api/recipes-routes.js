// Note to self once the api's are tested to replace some of the params to session
const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Recipes, Ingredients, Directions } = require('../../models');
const helpers = require('../../utils/helpers');

// This is used for uploading images.
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


router.get('/', (req, res) => {
    Recipes.findAll({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/random', (req, res) => {
    Recipes.findAll({
        order: sequelize.literal('rand()'),
        limit: 1
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'error' });
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

router.get('/ingredient/:id', (req, res) => {
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

router.get('/direction/:id', (req, res) => {
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
        direction_list: req.body.direction_list,
        ingredient_list: req.body.ingredient_list,
        user_id: req.body.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});








// dev of image upload

router.post('/uploadImage', (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
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

// this used to be /complete/:id
// however it can be used for all of the put that are needed. 
// Simply return only what you need to change. 
// This replaces the need for all of the other put routes.
router.put('/:id', (req, res) => {
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


module.exports = router;