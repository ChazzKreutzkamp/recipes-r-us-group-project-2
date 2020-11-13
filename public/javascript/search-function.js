async function searchHandler(event) {
    event.preventDefault();

    const searchTerm = document.querySelector('#input_search').value.trim();
    // const password = document.querySelector('#password-login').value.trim();

    // if (email && password) {
    //     const response = await fetch('/api/users/login', {
    //         method: 'post',
    //         body: JSON.stringify({
    //             email,
    //             password
    //         }),
    //         headers: { 'Content-Type': 'application/json' }
    //     });

    //     if (response.ok) {

// alert('/search-results/' + searchTerm)

            document.location.replace('/search-results/' + searchTerm);

    //     } else {
    //         alert(response.statusText);
    //     }
    // }
}


document.querySelector('#search-btn').addEventListener('click', searchHandler);