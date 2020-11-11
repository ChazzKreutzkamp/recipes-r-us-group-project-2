async function editRecipeHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="title"]').value;
    const yield = document.querySelector('input[name="yield"]').value;
    const cook_time = document.querySelector('input[name="cook_time"]').value;
    const cuisine = document.querySelector('input[name="cuisine"]').value;
    const description = document.querySelector('input[name="description"]').value;
    const image_filename = document.querySelector('input[name="image_filename"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            yield,
            cook_time,
            cuisine,
            description,
            image_filename
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

document.querySelector('.edit-post-form').addEventListener('submit', editRecipeHandler); //this will need to be edited, as well as the query selections.