async function featureRecipe(event) {
    const featured = 1;
    const id = $('#recipeid').text().trim();
    const response = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            featured
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        alert("This recipe has been featured!");

    } else {
        alert(response.statusText);
    }
}
document.querySelector('#feature').addEventListener('click', featureRecipe);