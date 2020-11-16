async function defeatureRecipe(event) {
    if (event.target.classList.contains('defeatureBtn')) {
        const featured = 0;
        const id = event.target.id;
        const response = await fetch(`/api/recipes/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                featured
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/modfeatured');

        } else {
            alert(response.statusText);
        }
    }
}
document.querySelector('.defeatureList').addEventListener('click', defeatureRecipe);