async function deleteRecipeHandler(event) {
    event.preventDefault();
    if (event.target.classList.contains('delete')) {


        const id = event.target.id;
        console.log(id);

        console.log(id);
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

document.querySelector('.somethingunique').addEventListener('click', deleteRecipeHandler);