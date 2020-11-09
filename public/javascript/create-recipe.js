async function postRecipeHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const yield = document.querySelector('input[name="yield"]').value;
    const cook_time = document.querySelector('input[name="cook_time"]').value;
    const cuisine = document.querySelector('input[name="cuisine"]').value;
    const description = document.querySelector('input[name="description"]').value;
    const image_filename = document.querySelector('input[name="image_filename"]').value;
    const title = document.querySelector('input[name="post-title"]').value;


    const response = await fetch(`/api/recipes`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            yield,
            cook_time,
            description,
            cuisine,
            image_filename,
            user_id: req.session.user_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // could there be a directions page?
    //With the way the api and models are set up this is one solution
    if (response.ok) {
        document.location.replace('/directions/:id');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', postRecipeHandler);