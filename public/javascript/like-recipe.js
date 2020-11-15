async function likeRecipeHandler(event) {
    event.preventDefault();

    const user_id = $('#userid').text().trim();
    const recipe_id = $('#recipeid').text().trim();
    const liked = 1;

    const response = await fetch('/api/cookbook', {
        method: 'post',
        body: JSON.stringify({
            user_id,
            recipe_id,
            liked
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        document.location.replace('/homepage')
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#like').addEventListener('click', likeRecipeHandler);