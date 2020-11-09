async function postRecipeIngredientHandler(event) {
    event.preventDefault();

    const quantity = document.querySelector('input[name="quantity"]').value;
    const name = document.querySelector('input[name="name"]').value;


    const response = await fetch(`/api/recipes`, {
        method: 'POST',
        body: JSON.stringify({
            quantity,
            name,
            recipe_id: req.params.id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // could there be a directions page?
    if (response.ok) {
        document.location.replace('/ingredients/:id');
    } else {
        alert(response.statusText);
    }
}

async function goToDirections(event) {
    document.location.replace('/directions/:id')
}
//most queries will have to be edited to accept the handlebars.
document.querySelector('.new-post-form').addEventListener('submit', postRecipeIngredientHandler);
document.querySelector('.directionsBTN').addEventListener('click', goToDirections);
