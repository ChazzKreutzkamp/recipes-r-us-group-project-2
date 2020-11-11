async function editIngredientHandler(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="ingr-name"]').value;
    const quantity = document.querySelector('input[name="ingr-quantity"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]; // this will need to be edited, as this won't work to obtain the id, which will probably require
    //a get request to accomplish this, a sort of recipe ingredient search.

    const response = await fetch(`/api/recipes/ingredient/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);