async function unlikeHandler(event) {

    if (event.target.classList.contains('unlike')) {

        const id = event.target.id;

        const response = await fetch(`/api/cookbook/` + id, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.btnhelper').addEventListener('click', unlikeHandler, { capture: true });