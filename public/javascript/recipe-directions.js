//final product
async function postRecipeIngredientHandler(event) {
    event.preventDefault();

    const step = document.querySelector('input[name="quantity"]').value;
    const direction = document.querySelector('input[name="name"]').value;


    const response = await fetch(`/api/recipes`, {
        method: 'POST',
        body: JSON.stringify({
            step,
            direction,
            recipe_id: req.params.id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // could there be a directions page?
    if (response.ok) {
        document.location.replace('/directions/:id');
    } else {
        alert(response.statusText);
    }
}

async function goToDirections(event) {
    document.location.replace('/dashboard')
}

//most queries will have to be edited to accept the handlebars.
document.querySelector('.new-post-form').addEventListener('submit', postRecipeIngredientHandler);
document.querySelector('.directionsBTN').addEventListener('click', goToDirections);