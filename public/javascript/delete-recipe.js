async function deleteRecipeHandler(event) {
    console.log(event.target.classList);
    if (event.target.classList.contains('delete')) {

        const id = event.target.id;

        const response = await fetch(`/api/recipes/recipe-delete/` + id, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            alert(response.statusText);
        }
    }

}

document.querySelector('.somethingunique').addEventListener('click', deleteRecipeHandler, { capture: true });